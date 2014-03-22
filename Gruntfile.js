/*global module:false*/
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['*.*'],
            tasks: ['jekyll']
        },
        jekyll: {
            dist: {
                options: {
                    config: '_config.yml'
                    // Construct a string with JavaScript.
                    // Remember, in YAML line breaks and indentation matter.
                }
            }
        }
        // banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        //   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        //   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        //   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        //   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // // Task configuration.
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jekyll');
    // Default task.
    grunt.registerTask('default', ['watch']);

};