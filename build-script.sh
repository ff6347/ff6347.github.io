#!/bin/zsh

function main(){
  LOC=/home/fabian/jekyll/fabianmoronzirfas.github.io
  echo "moving to ${LOC}"
  cd $LOC || exit
  echo "pulling from remote with git"
  git pull origin master
  echo "building with jekyll"
  env JEKYLL_ENV=production jekyll b
  echo "copying all the files to the document root"
  cp -a /home/fabian/jekyll/fabianmoronzirfas.github.io/_site/. /home/fabian/html
}
main
