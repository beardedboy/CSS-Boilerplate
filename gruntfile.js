module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {                            // Target
                options: {                      // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'css/grid.css': 'scss/grid.scss'
                }

            }
        },
        autoprefixer: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                // Target-specific file lists and/or options go here.
            },
        },

        cssmin: {
            target: {
                files: {
                    'css/grid.min.css': ['css/grid.css']
                }
            }
        },
        watch: {
            sass: {
                files: 'scss/partials/*.scss',
                tasks: ['sass','autoprefixer','cssmin'],
                options: {
                    spawn: false,
                }
            }
        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin']);
};