/* global -_ */
/* jshint node: true, camelcase: false */

var _ = require("lodash"),
    util = require("util");

module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);

  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      build: {
        files: {
          '.sass-cache/site.css': 'public/css/site.scss'
        }
      }
    },

    autoprefixer: {
      build: {
        src: '.sass-cache/site.css',
        dest: 'public/css/site.css'
      }
    },

    delta: {
      sass: {
        files: [ "public/css/**/*.scss" ],
        tasks: ["sass:build", "autoprefixer:build"]
      }
    }
  };

  grunt.initConfig(taskConfig);

  grunt.renameTask("watch", "delta");
  grunt.registerTask("watch", [
    "build",
    "delta"
  ]);

  grunt.registerTask("build", [
    "sass:build",
    "autoprefixer:build"
  ]);

  grunt.registerTask("default", ["watch"]);
};
