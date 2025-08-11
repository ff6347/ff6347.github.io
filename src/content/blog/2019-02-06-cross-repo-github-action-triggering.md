---
title: "Cross Repository Action Triggers Using GitHub Actions"
pubDate: 2019-02-06
tags: [github, actions, automation]
categories: [tech]
published: true
---

# Cross Repository GitHub Action Triggering

Wow what a title.

While developing the reference for our project [Basil.js](https://github.com/basiljs/basil.js) we ran into the following problem. We are lazy and we don't want to touch the reference each time some new function is added or even worse – we find a type in the JSDoc comments in the source.

I took a look into TravisCI but learned early that the cross repo trigger is not possible. At least out of the box. Again. I'm lazy and I have little time to develop a complex TravisCI script that does somehow use GitHubs API to be triggered.

Some time passed and we did not find a solution. Then out of the blue GitHub [announced their actions](https://github.com/features/actions) feature [^actions]. Wooohooo \o/. Here wee goooo 🎢 …

---

You will need two repositories. Let's call the first one `trigger` and the second one `target`. The `trigger` repo represents the source of our project [Basil.js](https://github.com/basiljs/basil.js). Here we are developing and writing the source of our docs. The `target` repo holds or documentation. In our case it is the [GitHub orgs site repo](https://github.com/basiljs/basiljs.github.io).

You also will need a Personal Access Token. You can create it [here](https://github.com/settings/tokens). This token needs to be added as a secret to both repositories[^secret]. You also will have to activate it in your main.workflow[^mainwf] interface.

## The Trigger Repository

On our `trigger` we create the following action setup. On push we run the docker container defined under `./action`. The only needed application in this container is curl to execute the webhook.

This is `.github/main.workflow`:

```text
workflow "trigger" {
  on = "push"
  resolves = ["run-it"]
}

action "run-it" {
  uses = "./action"
  secrets = ["PA_TOKEN"]
}
```

This is the content of `action/Dockerfile`:

```docker
FROM alpine
RUN apk add --no-cache curl
ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
```

This is `action/entrypoint.sh` with the curl post call:

```bash
#!/bin/sh -l
sh -c "curl -XPOST -H \"Accept: \
application/vnd.github.everest-preview+json\"  \
-H \"Content-Type: application/json\" \
-H \"Authorization: token ${PA_TOKEN}\" \
https://api.github.com/repos/fabianmoronzirfas/target/dispatches \
--data '{\"event_type\": \"run-it\"}'"
```

## The Target Repository

This is `.github/main.workflow`. Currently this is configured to build on the [webhook repository_dispatch](https://developer.github.com/actions/creating-workflows/triggering-a-repositorydispatch-webhook/) trigger.

In this example the `args` and the `env` values are not used. Just for illustrating the possibility of having them. The repo waits on its webhook to be called and then executes the script in the docker container.

```text
workflow "Build-it on webhook" {
  on = "repository_dispatch"
  resolves = ["execute build"]
}

action "execute build" {
  uses = "./action"
  env = {
    NAME = "fabianmoronzirfas"
  }
  args = "\"This name is set as a env variable: $NAME\""
  secrets = ["PA_TOKEN"]
}

```

The container has the following dependencies:

- git
- node.js
- npm
- openssh
- bash (optional)

This is the content of `action/Dockerfile`:

```docker
FROM alpine
ADD entrypoint.sh /entrypoint.sh
RUN apk --update add --no-cache bash nodejs nodejs-npm git openssh
ENTRYPOINT ["/entrypoint.sh"]
```

And this is the script that does the execution. Fist we output some infos to see if the install worked. The important part is the `npm run build` call. It is a Node.js script that creates a file within the container. It is very simple in our case just a `require('fs').writeFileSync('./out-date', JSON.stringify(new Date()))` to have some output.
Then it adds this file with `git` and uses the Personal Access Token to `push` to the repo via https.

This is `action/entrypoint.sh`:

```bash
#!/bin/sh -l
sh -c "echo 'in entrypoint.sh'"
sh -c "echo 'NODE version:' $(node -v)"
sh -c "echo 'NPM version:' $(npm -v)"
sh -c "echo 'GIT version:' $(git --version)"
sh -c "echo 'output of pwd:' && pwd"
sh -c "echo 'output of ls:' && ls"
sh -c "echo 'these are arguments set to the workflow' && echo ${*}"
sh -c "cd action && npm test"
sh -c "cd action && npm run build"
sh -c "cd action && echo 'output of ls:' && ls"
sh -c "git config --global user.email 'fabian.moron.zirfas@gmail.com'"
sh -c "git config --global user.name 'me-as-a-bot'"
sh -c "echo 'git status' && git status"
sh -c "git add ."
sh -c "git commit -m 'added file'"
sh -c "git push https://${PA_TOKEN}@github.com/fabianmoronzirfas/target.git"
```

As soon as GitHub Actions are out of beta I will make these repos public so you can take a look at the source.

[^actions]: GitHub Actions are in beta while I am writing this (07. Jan 2019).

[^secret]: You can set your secrets under this url https://github.com/[YOUR USER NAME]/[YOUR REPO NAME]/settings/secrets

[^mainwf]: You will find your main.workflow here https://github.com/[YOUR USER NAME]/[YOUR REPO NAME]/blob/master/.github/main.workflow
