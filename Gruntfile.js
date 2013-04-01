module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      scripts: {
        files: {
          './public/js/app.js': './js/app.coffee'
        }
      }
    },
    coffeelint: {
      app: ['./*.coffee'],
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
        files: {'./public/css/app.css': './css/app.styl'}
      }
    },
    watch: {
      scripts: {
        files: './js/*.coffee',
        tasks: ['coffeelint', 'coffee:scripts']
      },
      styles: {
        files: './css/**/*.styl',
        tasks: ['stylus']
      }
    },
    uglify: {
      scripts: {
        files: './js/*.coffee',
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
    'stylus'
  ]);
};