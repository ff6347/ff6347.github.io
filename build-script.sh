git pull origin master
env JEKYLL_ENV=production jekyll b
cp -a ./_site/. ~/html/ 
