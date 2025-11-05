---
title: "Learning MCP"
pubDate: 2025-11-05
tags: [mcp,learning,discussion,llm]
categories: [learning]
published: false
description: "This is a loose collection of notes about MCP. I might circle back to this later and expand it."
---


I am currently attending Professor Reto Wettach's seminar about: "Language as an Interface - Interface Design in times of AI and MCPs/Agentic AI". That is why I am trying to wrap my head around MCPs and all that.


## contents

## How Learning Works Currently for Me

For me the best way to learn a new technology is reading about it and reading a simple implementation for better usage insight. Then write down some notes (in form of this blog more often I hope). Nowadays a LLM comes into the mix. In this case it was pretty nice. I read some parts of [MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18) (enough for grasping the basics) and asked an LLM some questions afterwards.


## Insights

- Security is based on trust.
- In the implementation the distinction between host and client is fuzzy.
- In the spec the host should orchestrate several clients.
- The clients connect to the servers which provide tools, resources and prompts.
- The servers are based on JSON-RPC. Which is an action oriented API.
	- JSON RPC uses only POST requests and does not need HTTP. Can also be over TCP, Websocket or stdio. JSON-RPC is transport agnostic.
	- A problem with stdio is that you are not allowed to log to stdout. :(
- There are Requests that need a response and share an id for mapping and notifications which don't need one.

**MCP is actually an abstraction layer on top of model tool calling capability.**

- Anthropic skills are workflow specifications that is again on top of MCP.
- MCP is meant for discoverability.

### Implementation Flow

Flow: [1](https://platform.openai.com/docs/guides/function-calling)

1. Host spawns MCP server, gets available tools
2. Converts MCP tool schemas to OpenAI function format
3. Sends user query + functions to OpenAI
4. OpenAI returns function call decision
5. Host executes tool via MCP
6. Host sends result back to OpenAI for natural language response

Run: `OPENAI_API_KEY=your_key node host.js`

Here are the three most interesting (code) snippets to understand MCP.

## Code Examples

**TBD: Explanation of how these three files relate to each other and how to run them together.**

### host.js

```js
// host.js - LLM host with OpenAI integration
import { spawn } from "child_process";
import { createInterface } from "readline";
import https from "https";

class LLMHost {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = null;
    this.messageId = 0;
    this.pendingRequests = new Map();
    this.tools = [];
  }

  async start() {
    // Start MCP server
    this.client = spawn("node", ["server.js"]);

    const rl = createInterface({
      input: this.client.stdout,
      crlfDelay: Infinity
    });

    rl.on("line", (line) => {
      const msg = JSON.parse(line);
      if (msg.id && this.pendingRequests.has(msg.id)) {
        const { resolve } = this.pendingRequests.get(msg.id);
        this.pendingRequests.delete(msg.id);
        resolve(msg.result);
      }
    });

    // Initialize MCP connection
    await this.mcpRequest("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "llm-host", version: "1.0.0" }
    });

    // Get available tools from MCP server
    const { tools } = await this.mcpRequest("tools/list");
    this.tools = tools;
    console.log("MCP tools loaded:", tools.map(t => t.name));

    // Process user query
    await this.processUserQuery("What is 15 + 27?");
  }

  async processUserQuery(query) {
    console.log(`\nUser: ${query}`);

    // Convert MCP tools to OpenAI function format
    const functions = this.tools.map(t => ({
      name: t.name,
      description: t.description,
      parameters: t.inputSchema
    }));

    // Call OpenAI with function calling
    const completion = await this.callOpenAI([
      { role: "user", content: query }
    ], functions);

    const message = completion.choices[0].message;

    // Check if LLM wants to call a function
    if (message.function_call) {
      const { name, arguments: argsStr } = message.function_call;
      const args = JSON.parse(argsStr);

      console.log(`LLM calling tool: ${name}(${JSON.stringify(args)})`);

      // Execute tool via MCP
      const result = await this.mcpRequest("tools/call", {
        name,
        arguments: args
      });

      // Send result back to LLM for final response
      const finalCompletion = await this.callOpenAI([
        { role: "user", content: query },
        message,
        {
          role: "function",
          name,
          content: result.content[0].text
        }
      ], functions);

      console.log(`Assistant: ${finalCompletion.choices[0].message.content}`);
    } else {
      console.log(`Assistant: ${message.content}`);
    }
  }

  async callOpenAI(messages, functions) {
    const data = JSON.stringify({
      model: "gpt-4",
      messages,
      functions,
      function_call: "auto"
    });

    return new Promise((resolve, reject) => {
      const req = https.request({
        hostname: "api.openai.com",
        path: "/v1/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Length": data.length
        }
      }, (res) => {
        let body = "";
        res.on("data", chunk => body += chunk);
        res.on("end", () => resolve(JSON.parse(body)));
      });

      req.on("error", reject);
      req.write(data);
      req.end();
    });
  }

  async mcpRequest(method, params) {
    const id = ++this.messageId;
    this.client.stdin.write(JSON.stringify({
      jsonrpc: "2.0",
      id,
      method,
      params
    }) + "\n");

    return new Promise((resolve) => {
      this.pendingRequests.set(id, { resolve });
    });
  }
}

// Usage: node host.js
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Set OPENAI_API_KEY environment variable");
  process.exit(1);
}

await new LLMHost(apiKey).start();

```

### client.js

```js
import { spawn } from "child_process";
import { createInterface } from "readline";

class MCPClient {
  constructor() {
    this.process = null;
    this.messageId = 0;
    this.pendingRequests = new Map();
  }

  connect(serverScript) {
    // Spawn server process
    this.process = spawn("node", [serverScript]);

    // Setup line-by-line reading from stdout
    const rl = createInterface({
      input: this.process.stdout,
      crlfDelay: Infinity
    });

    // Handle incoming messages
    rl.on("line", (line) => {
      const message = JSON.parse(line);

      if (message.id && this.pendingRequests.has(message.id)) {
        const { resolve, reject } = this.pendingRequests.get(message.id);
        this.pendingRequests.delete(message.id);

        if (message.error) {
          reject(message.error);
        } else {
          resolve(message.result);
        }
      }
    });

    this.process.stderr.on("data", (data) => {
      console.error("Server error:", data.toString());
    });

    return this.initialize();
  }

  async request(method, params = {}) {
    const id = ++this.messageId;
    const message = {
      jsonrpc: "2.0",
      id,
      method,
      params
    };

    // Send JSON-RPC request
    this.process.stdin.write(JSON.stringify(message) + "\n");

    // Wait for response
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
    });
  }

  async initialize() {
    return this.request("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "simple-client", version: "1.0.0" }
    });
  }

  async listTools() {
    return this.request("tools/list");
  }

  cleanup() {
    this.process.kill();
  }
}

// Usage
const client = new MCPClient();
await client.connect("./server.js");
const tools = await client.listTools();
console.log("Tools:", tools.tools.map(t => t.name));
client.cleanup();

```

### server.js

```js
import { createInterface } from "readline";

// Setup stdin/stdout communication
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Handle incoming JSON-RPC messages
rl.on("line", (line) => {
  const message = JSON.parse(line);

  // Route to handler
  if (message.method === "initialize") {
    handleInitialize(message);
  } else if (message.method === "tools/list") {
    handleToolsList(message);
  } else if (message.method === "tools/call") {
    handleToolCall(message);
  }
});

function send(message) {
  console.log(JSON.stringify(message));
}

function handleInitialize(request) {
  send({
    jsonrpc: "2.0",
    id: request.id,
    result: {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {}
      },
      serverInfo: {
        name: "simple-server",
        version: "1.0.0"
      }
    }
  });
}

function handleToolsList(request) {
  send({
    jsonrpc: "2.0",
    id: request.id,
    result: {
      tools: [
        {
          name: "add",
          description: "Add two numbers",
          inputSchema: {
            type: "object",
            properties: {
              a: { type: "number" },
              b: { type: "number" }
            },
            required: ["a", "b"]
          }
        }
      ]
    }
  });
}

function handleToolCall(request) {
  const { name, arguments: args } = request.params;

  if (name === "add") {
    const result = args.a + args.b;
    send({
      jsonrpc: "2.0",
      id: request.id,
      result: {
        content: [
          {
            type: "text",
            text: `Result: ${result}`
          }
        ]
      }
    });
  }
}

// Keep process alive
process.stdin.resume();

```

## Conclusion

**TBD: Summary of key learnings and next steps.**

Here is the full [conversation](https://kagi.com/assistant/d0ec1459-05b9-4fed-b3ec-f1617b9035a6).
