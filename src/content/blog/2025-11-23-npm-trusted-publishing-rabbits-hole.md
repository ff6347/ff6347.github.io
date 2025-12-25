---
title: "NPM trusted publishing rabbits hole"
pubDate: 2025-11-23
updateDate: 2025-12-25
tags: ["npm", "development", "publishing", "ci/cd"]
categories: []
published: true
description: "Notes on trusted publishing for the future me"
---



Ok, I fell into a rabbit's hole of npm dependencies today. So I want to just jot down quickly what I had to do. Since the supply chain attacks recently, NPM is deprecating classic tokens. This means we need to use more granular tokens that also need to be rotated every 90 days. This is something I really don't want to take care of and I really don't want to set up some automation to rotate tokens using the NPM API (if there is something like that).

So I went for [trusted publishing](https://docs.npmjs.com/trusted-publishers). This is something that the registry (npmjs.org) and the CI provider (like GitHub.com) do some handshaking. Not sure what is going on behind the scenes, but they say that's their thing. So I will go for it. The problem I had here is that there need to be some changes to the repos. First it's **the permissions on the GitHub workflow.** 

```yaml
name: Node.js CI
permissions:
  contents: write
  id-token: write # needed for OIDC
  packages: write
```

I also had to go into the settings of my published module on npmjs.org and tell npm which workflow is allowed to publish.

Pretty straight forward until this point. Now here comes the rabbits hole. 

 I've been using a shared semantic release config we created the Technologiestiftung Berlin a lot, but this needed to be updated. It needs to use the latest semantic-release (currently 25.0.2) and the semantic-release npm plug-in (currently 13.1.2). Since I don't want to interfere with the current setup on all the repos Technologiestiftung's version uses, I went for a [fork](https://github.com/ff6347/semantic-release-config/) 

 Another thing that had to be done was to **remove the NPM_TOKEN environment variable** so this doesn't interfere with the trusted publishing.

 I also had an error because my `package.json` file didn't have the [repository field](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#repository). 

Things you do on a Sunday morning for a package that is some kind of abandon-ware. `¯\_(ツ)_/¯`

## Update 2025-12-25

I just ran into the same issue here without consulting my notes. m(
Once again for future me:

- Setup trusted publishing on npmjs.org
- Needs semantic-release >= 25
- Needs npm semantic release plugin >= 13
- Optional use @ff6347/semantic-release-config >= 1.0.6
- The Workflow or job needs the following permissions:

```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write
  id-token: write
```
- Remove any `NPM_TOKEN` env variable
- The package.json needs the `repository` field:

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/OWNER/REPO.git"
}
```
- Persist the credentials on the jobs checkout step (happens by default):
```yaml
persist-credentials: true
```
- Semantic release steps needs `GITHUB_TOKEN` from the env
```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Link to a [working workflow](https://github.com/ff6347/named-css-colors/blob/af6c24e8d2c035ac75d119e1a58f6ef1a51da6f9/.github/workflows/test.yml)
Link to a [working package.json](https://github.com/ff6347/named-css-colors/blob/af6c24e8d2c035ac75d119e1a58f6ef1a51da6f9/package.json)
