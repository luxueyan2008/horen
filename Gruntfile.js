'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name || "" %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    // concat: {
    //   options: {
    //     banner: '<%= banner %>',
    //     stripBanners: true
    //   },
    //   dist: {
    //     src: ['src/<%= pkg.name %>.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   },
    // },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: ['js/dev/<%= pkg.name %>.js'],
        dest: 'js/deploy/<%= pkg.name %>.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'js/dev',
          outdir: 'docs'
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          specify: 'sass/**/*.scss',
          sassDir: 'sass',
          cssDir: 'css',
          debugInfo: true,
          outputStyle: 'expand'
        }
      }
    },
    browser_sync: {
      files: {
        src : [
          'css/**/*.css',
          'imgs/*',
          'js/**/*.js',
          'html/**/*.html'
        ],
      },
      options: {
        watchTask: true
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      // gruntfile: {
      //   files: '<%= jshint.gruntfile.src %>',
      //   tasks: ['jshint:gruntfile']
      // },
      scss: {
        files: [ 'sass/**/*.scss','Gruntfile.js' ],
        tasks: [ 'compass' ]
      },
      yuidoc: {
        files: ['<%= yuidoc.options.files %>','Gruntfile.js'],
        task: [ 'yuidoc' ]
      },
      // src: {
      //   files: '<%= jshint.src.src %>',
      //   tasks: ['jshint:src', 'qunit']
      // },
      // test: {
      //   files: '<%= jshint.test.src %>',
      //   tasks: ['jshint:test', 'qunit']
      // },
    },
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify','browser_sync']);

};
