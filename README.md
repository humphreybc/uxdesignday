UX Design Day
=============
[uxdesignday.org](http://uxdesignday.org)

Source code for uxdesignday.org - static HTML, Stylus, and a little bit of Coffeescript.

### TODO

#### General

* Install Node on the server to do server-side compiling
* Set up hooks instead of using a cronjob to deploy

### Structure

CSS and JS are compiled and minified into the public directory, whereas the HTML and content reside in the /public directory permanently. There is no templating engine for the HTML or assets. 

Everything needs to be compiled and checked locally at this stage as the server does no compilation. The server has folders for each location. Every few minutes the server does a pull and each locaiton is pointed to the /public directory. So uxdesignday.org/wellington will reflect whatever is in the /public folder of the branch 'wellington'.

Global changes should be tested in the 'beta' branch first (beta.uxdesignday.org) before being deployed to master (uxdesignday.org).

Lastly, the domain name uxdesignday.com just redirects to uxdesignday.org.

Note: The UTF-8 charset is set in the HTTP header on the server, so if you see funny characters instead of smart quotes, everything should be okay when pushed up.

### Dependencies

Uses [Coffeescript](http://coffeescript.org/) and [Stylus](http://learnboost.github.com/stylus/), and it's compiled using Node.js, so you'll need to install that on your computer. Also install npm (node package manager). More on that below.

IMPORTANT: The server doesn't compile anything, so you will need to compile locally into the /public directory and push that up to Git. Don't ignore that folder. Also don't delete it.

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

### Making changes

#### Content (HTML)

HTML and file changes are made directly in /public/dunedin/index.html. Each location has its own folder with sub-folders for speaker and sponsor images.

#### Styling (CSS)

CSS changes are made by changing the .styl files under /css/include. These will get joined together, compiled to CSS, and then minified into /public/app.css when 'grunt build' or 'grunt dev' is run.

#### Functionality (JS)

JavaScript changes are made under /js/app.coffee and the Coffeescript will be compiled to JavaScript in /public/js/app.js. Grunt will also create a minified copy: /public/js/app.min.js.

### Deploying

Anything you push to the master branch will be live on uxdesignday.org and uxdesignday.com within 10 minutes of pushing it. Only merge your working branch into master (after merging master into your local branch first, of course) when you're confident everything is looking peachy! 

You will need to compile locally using 'grunt build' before pushing, since the server simply points to the /public directory and does not compile the code on its own.

Then simply push up master, and the server will pull down the latest changes within 10 minutes.


### Questions?

Email me at benjamin@uxdesignday.org.
