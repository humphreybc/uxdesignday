UX Design Day
=============
[beta.uxdesignday.org](http://beta.uxdesignday.org)

Source code for uxdesignday.org - static HTML, CSS, and a little bit of JS. Founded, designed, and predominantly built by Benjamin Humphrey with some help from Sam Tran, and Dave Strydom for the resources list.

### Dependencies

Uses [Coffeescript](http://coffeescript.org/) and [Stylus](http://learnboost.github.com/stylus/).

### Running locally with Grunt (recommended)

* [gruntjs.com](http://gruntjs.com/)
* [nodejs.org](http://nodejs.org/)
* [npmjs.org](https://npmjs.org/)

A Gruntfile with a 'dev' task is available for development.

#### Install grunt-cli (may need to use sudo)

    npm install -g grunt-cli

#### Install the node prerequisites

    npm install

#### Run 'grunt dev' to watch for changes in the Coffeescript and Stylus files.

    grunt dev

#### Rebuilding JS and CSS from scratch

    grunt build

### Deploying

Pretty simple so far - since the site is totally static, I just push up to master and the server is on a 2 minute git pull origin master cronjob. You can see the site live at [beta.uxdesignday.org](http://beta.uxdesignday.org).