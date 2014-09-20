module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        files: {'public/css/app.css': 'css/app.styl'}
      }
    },
    watch: {
      scripts: {
        files: 'js/*.js',
        tasks: ['concat:app', 'uglify:app']
      },
      styles: {
        files: 'css/**/*.styl',
        tasks: ['stylus']
      },
      livereload: {
        options: { livereload: true },
        files: ['public/**/*'],
        tasks: []
      },
      options: {
        tasks: ['build'],
        atBegin: true
      },
    },
    concat: {
      app: {
        files: {
          'public/js/app.js': ['public/js/jquery-2.1.1.min.js', 'public/js/bootstrap-tooltip.js', 'js/app.js']
        }
      }
    },
    uglify: {
      app: {
        files: {
          'public/js/app.min.js': ['public/js/jquery-2.1.1.min.js', 'public/js/bootstrap-tooltip.js', 'js/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', []);

  grunt.registerTask('dev', [
    'watch'
  ]);

  grunt.registerTask('build', [
    'stylus',
    'concat',
    'uglify'
  ]);
};