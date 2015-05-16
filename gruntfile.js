module.exports = function (grunt) {

    var bowerPath = 'bower_components',
        buildPath = 'build',
        buildAppPath = 'build/app',
        buildAssertPath = 'build/assert',
        srcAppPath = 'src/app',
        srcLibPath = 'src/lib',
        buildLibPath = 'build/lib',
        srcIndexFile = "src/index.html",
        buildIndexFile = "build/index.html";


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [
            buildPath
        ],
        copy: {
            lib: {
                files: [
                    {
                        src: bowerPath + '/jquery/dist/jquery.js',
                        dest: buildAssertPath + '/jquery.js'
                    },
                    {
                        src: bowerPath + '/jSignature/src/jSignature.js',
                        dest: buildAssertPath + '/jSignature.js'
                    },
                    {
                        src: bowerPath + '/jSignature/src/plugins/jSignature.CompressorBase30.js',
                        dest: buildAssertPath + '/jSignature.CompressorBase30.js'
                    },
                    {
                        src: bowerPath + '/angular/angular.js',
                        dest: buildAssertPath + '/angular.js'
                    }
                ]
            },
            index: {
                src: srcIndexFile,
                dest: buildIndexFile
            }
        },
        concat: {
            app: {
                src: srcAppPath + "/**/*.js",
                dest: buildAppPath + "/app.js"
            },
            lib: {
                src: srcLibPath + "/**/*.js",
                dest: buildLibPath + "/ng-j-signature.js"
            },
            options: {
                sourceMap: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['clean', 'copy', 'concat']);
};
