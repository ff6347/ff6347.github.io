# Cross Repository GitHub Action Triggering

Wow what a title.

While developing the reference for our project [Basil.js](https://github.com/basiljs/basil.js) we ran into the following problem. We are lazy and we don't want to touch the reference each time some new function is added or even worse – we find a type in the JSDoc comments in the source.  

I took a look into TravisCI but learned early that the cross repo trigger is not possible. At least out of the box. Again. I'm lazy and I have little time to develop a complex TravisCI script that does somehow use GitHubs API to be triggered.  

Some time passed and we did not find a solution. Then out of the blue GitHub [announced their actions](https://github.com/features/actions) feature [^actions]. Wooohooo \o/. Here wee goooo 🎢 …

-----

You will need two repositories. Let's call the first one `trigger` and the second one `target`. The `trigger` repo represents the source of our project [Basil.js](https://github.com/basiljs/basil.js). Here we are developing and writing the source of our docs. The `target` repo holds or documentation. In our case it is the [GitHub orgs site repo](https://github.com/basiljs/basiljs.github.io).

You also will need a Personal Access Token. You can create it [here](https://github.com/settings/tokens).  

## Trigger Repo  

On our `trigger` we create the following action setup.

This is `.github/main.workflow`:  

```plain
workflow "trigger" {
  on = "push"
  resolves = ["run-it"]
}

action "run-it" {
  uses = "./action"
  secrets = ["PATOKEN"]
}
```

This is the content of `action/Dockerfile`:

```docker
FROM alpine
RUN apk add --no-cache curl
ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
```

This is `action/entrypoint.sh`:

TODO: Needs a test if we can break the string like this:

```bash
#!/bin/sh -l
sh -c "curl -XPOST -H \"Accept: \
application/vnd.github.everest-preview+json\"  \
-H \"Content-Type: application/json\" \
-H \"Authorization: token ${PATOKEN}\" \
https://api.github.com/repos/fabianmoronzirfas/target/dispatches \
--data '{\"event_type\": \"run-it\"}'"
```

## Target Repo

This is `.github/main.workflow`. Currently this is configured to build on the [webhook repository_dispatch](https://developer.github.com/actions/creating-workflows/triggering-a-repositorydispatch-webhook/) trigger and on push.  

```plain
workflow "Build-it on webhook" {
  on = "repository_dispatch"
  resolves = ["execute build"]
}

workflow "Build-it on push" {
  on = "push"
  resolves = ["execute build"]
}

action "execute build" {
  uses = "./action"
}
```

This is the content of `action/Dockerfile`:

TODO: Check if we need to copy the package.json. It seems like the files are already there.  

```docker
FROM alpine
ADD entrypoint.sh /entrypoint.sh
COPY package.json /package.json
RUN apk add --no-cache bash nodejs nodejs-npm
ENTRYPOINT ["/entrypoint.sh"]
```

This is `action/entrypoint.sh`:

TODO: Needs the build, commit and push part

```bash
#!/bin/sh -l
sh -c "echo 'NODE version:' $(node -v)"
sh -c "echo 'NPM version:' $(npm -v)"
sh -c "echo 'output of pwd:\n' && pwd"
sh -c "echo 'output of ls:\n' && ls"
sh -c "cd action && npm test"
```

[^actions]: GitHub Actions are in beta while I am writing this (20. Dec 2018).