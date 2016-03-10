module.exports = function(grunt) {

    // 1. All configuration goes here 

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {                            // Target
                options: {                      // Target options
                    style: 'expanded',
                   sourcemap: 'none'
                },
                files: {                         // Dictionary of files
                    'css/src/main.css': 'scss/main.scss'
                }

            }
        },

        cssnano: {
            options: {
                sourcemap: false
            },
            dist: {
                files: {
                    'css/dist/main.min.css': 'css/src/main.css'
                }
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'css/dist' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: ['not ie < 8']
                    })
                ]
            },
            dist: {
                src: 'css/src/*.css'
            }
        },
        watch: {
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass', 'postcss:dist', 'cssnano'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },

    });

    var modules = [
        'grunt-contrib-sass',
        'grunt-cssnano',
        'grunt-postcss',
        'grunt-contrib-watch'
    ];

    modules.forEach(function(task){
        grunt.loadNpmTasks(task);
    });


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

    grunt.registerTask('default', ['sass', 'postcss:dist', 'cssnano', 'watch']);
};