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
            css: ['concat', 'cssmin'],
            js: ['concat', 'uglifyjs']
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
            function removeQuery(target) {
              target.files.forEach(function(file) {
                file.dest = file.dest.split('?')[0];
                file.src = file.src.map(function(srcPath) {
                  return srcPath.split('?')[0];
                });
              });
            }
            removeQuery(config.concat.generated);
            removeQuery(config.uglify.generated);
            removeQuery(config.cssmin.generated);
          }
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
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
    'uglify',
    'cssmin',
    'usemin'
  ]);

};
