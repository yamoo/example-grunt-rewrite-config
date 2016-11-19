'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      build: {
        src: ['.tmp', 'build']
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.html'],
          dest: 'build/',
          filter: 'isFile'
        }]
      }
    },

    replace: {
      build: {
        options: {
          patterns: [{
            match: 'revision',
            replacement: '<%= grunt.template.today("yyyymmdd") %>'
          }]
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: ['*.html'],
          dest: 'build/',
          filter: 'isFile'
        }]
      }
    },

    useminPrepare: {
      html: 'build/*.html',
      options: {
        dest: 'build',
        root: 'src',
        flow: {
          steps: {
            js: ['concat']
          },
          post: {}
        }
      }
    },

    usemin: {
      html: 'build/*.html'
    },

    rewriteConfig: {
      build: {
        options: {
          rewrite: function(config) {
            config.concat.generated.files.forEach(function(file) {
              file.dest = file.dest.split('?')[0];
            });
          }
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-rewrite-config');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-usemin');

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'clean',
    'copy',
    'replace',
    'useminPrepare',
    'rewriteConfig',
    'concat',
    'usemin'
  ]);

};
