UX Design Day
=============
[beta.uxdesignday.org](http://beta.uxdesignday.org)

Source code for uxdesignday.org - static HTML, CSS, and a little bit of JS.

### Dependencies

Uses [Coffeescript](http://coffeescript.org/) and [Stylus](http://learnboost.github.com/stylus/). I compile with [LiveReload](http://livereload.com/) which is pretty great, but any Coffeescript / Stylus compiler will do.

### Using Grunt

* [gruntjs.com](http://gruntjs.com/)
* [nodejs.org](http://nodejs.org/)
* [npmjs.org](https://npmjs.org/)

A Gruntfile with a 'dev' task is available for development. Install the node prerequisites with 'npm install' and run 'grunt dev' to watch changes to CoffeeScript and Stylus files.

You might need to run 'npm install -g grunt-cli' as root beforehand.

### Deploying

Pretty simple so far - since the site is totally static, I just push up to master and the server is on a 2 minute git pull origin master cronjob. You can see the site live at [beta.uxdesignday.org](http://beta.uxdesignday.org).