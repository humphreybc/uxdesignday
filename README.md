UX Design Day
=============
[uxdesignday.org](http://uxdesignday.org)

Source code for uxdesignday.org - static HTML, CSS, and a little bit of JS. Founded, designed, and predominantly built by Benjamin Humphrey with some help from Sam Tran, and Dave Strydom for the resources list.

### TODO

#### General

* Add new resources
* Make the splash / home page responsive for mobile
* Install Node on the server to do server-side compiling
* Set up hooks instaed of using a cronjob to deploy
* Set up Github Issues for tracking global problems / feature requests
* Refactor all the things

### Structure

For now the structure is a little bit crap but until I have some more time. Basically the server has folders set up for each conference, eg. uxdesignday.org/dunedin and uxdesignday.org/wellington.

These folders are hooked up to a cronjob which pulls down the corresponding branch every few minutes and looks in the /public directory. So uxdesignday.org/wellington will reflect whatever is in the /public folder of the branch 'wellington'.

Eventually I hope master will simply be global styles and layout, and a splash page pointing people towards the individual conference pages. The idea is that you will occaisonally merge master back into your individual conference-specific branches. I haven't had time to re-architect the website like this yet.

Global changes should be tested in the 'beta' branch first (beta.uxdesignday.org/dunedin) before being deployed to master (uxdesignday.org/dunedin).

FYI - uxdesignday.com just redirects to .org.

### Dependencies

Uses [Coffeescript](http://coffeescript.org/) and [Stylus](http://learnboost.github.com/stylus/), and it's compiled using Node.js, so you'll need to install that on your computer. Also install npm (node package manager). More on that below.

IMPORTANT: The server doesn't compile anything yet, so you will need to compile locally into the /public directory and push that up to Git. Don't ignore that folder. Also, don't delete it - there are some assets in there that don't get automatically generated when you compile.

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

Open pull requests against the correct branch (eg. dunedin) to make changes and Benjamin will review the PR before merging. You will need to compile locally using 'grunt build' before pushing, since the server simply points to the /public directory and does not compile the code on its own.

Changes to the master branch will be live on uxdesignday.org within 10 minutes of pushing.


### Questions?

Email me at benjamin@uxdesignday.org.
