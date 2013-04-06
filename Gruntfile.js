module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      scripts: {
        files: {
          'public/js/app.js': 'js/app.coffee'
        }
      }
    },
    coffeelint: {
      app: ['*.coffee'],
      options: {
        indentation: {
          value: 2,
          level: 'error'
        },
        max_line_length: {
          value: 120,
          level: 'error'
        }
      }
    },
    stylus: {
      compile: {
        files: {'public/css/app.css': 'css/app.styl'}
      }
    },
    watch: {
      scripts: {
        files: 'js/*.coffee',
        tasks: ['coffeelint', 'coffee:scripts', 'uglify:app']
      },
      styles: {
        files: 'css/**/*.styl',
        tasks: ['stylus']
      }
    },
    uglify: {
      app: {
        files: {
          'public/js/app.min.js': ['public/js/app.js', 'public/js/bootstrap-tooltip.js'],
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', []);

  grunt.registerTask('dev', [
    'watch'
  ]);

  grunt.registerTask('build', [
    'coffeelint',
    'coffee',
    'stylus',
    'uglify'
  ]);
};