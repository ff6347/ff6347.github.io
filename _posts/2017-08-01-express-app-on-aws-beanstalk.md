---
layout: post
title: Node.js on AWS Beanstalk
date: 2017.08.01
published: True
tags: [AWS, Node.js, Express]
categories: [tech]
---

Are you trying to deploy a Express/Node.js application to AWS Beanstalk? I tried today and these are the things you should take into account if you are using the AWS Console.  

1. When uploading a .zip you need to zip the content of your project folder. Not the folder.
2.  Name your main file "app.js" or "server.js" or create the "npm start". 
3.  You can define a own node command to run your app in the configuration of your Beanstalk application.
4.  If using Nginx the port will be 8081 according to this [stackoverflow.com question](https://stackoverflow.com/questions/36968989/cant-deploy-node-restify-app-to-aws-eb). To don't hardcode the port use `const port = process.env.PORT || 3000`.  

This might be it…  

Oh, and socket.io is throwing an error. This [is a problem](https://github.com/socketio/socket.io/issues/1942) for another day. Also, I should take a look at the command line tool for deploying Beanstalk. It seems I can define a aws region for an app.