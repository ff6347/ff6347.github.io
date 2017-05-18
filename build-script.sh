cd /home/fabian/jekyll/fabianmoronzirfas.github.io
git pull origin master
env JEKYLL_ENV=production jekyll b
cp -a /home/fabian/jekyll/fabianmoronzirfas.github.io/_site/. /home/fabian/html
