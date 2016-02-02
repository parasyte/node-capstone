module.exports = function (grunt) {
    "use strict";

    var sourceFiles = grunt.file.expand("lib/**/*.js");
    var specFiles = grunt.file.expand("spec/**/*.js");
    var docsDir = "./docs";

    // Project configuration.
    grunt.initConfig({
        "pkg" : grunt.file.readJSON("package.json"),

        "jshint" : {
            "options" : {
                "jshintrc" : ".jshintrc",
            },

            "files" : {
                "src" : [ sourceFiles, specFiles, "Gruntfile.js" ],
            }
        },

        "clean" : {
            "docs" : {
                "src" : [ docsDir + "/**/*" ],
            }
        },

        "dotdox" : {
            "options" : {
                "views" : "views",
                "readme" : "README.md",
                "project" : "node-capstone",
                "links" : {
                    "blog" : "http://blog.kodewerx.org/",
                    "twitter" : "kodewerx",
                }
            },

            "src" : sourceFiles,
            "dest" : docsDir,
        },

        "jasmine_nodejs" : {
            "all" : {
                "options" : {
                    "useHelpers" : true
                },
                "specs" : [ "spec/*.spec.js" ],
                "helpers" : [ "spec/*.helper.js" ],
            }
        },

        "bower-install-simple" : {
            "dist" : {
                "options" : {
                    "cwd" : "views"
                }
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-jasmine-nodejs");
    grunt.loadNpmTasks("grunt-bower-install-simple");

    // Custom Tasks
    grunt.loadTasks("tasks");

    // Default task.
    grunt.registerTask("default", [ "test" ]);

    grunt.registerTask("test", [ "jshint", "jasmine_nodejs" ]);
    grunt.registerTask("lint", [ "jshint" ]);
    grunt.registerTask("docs", [ "jshint", "clean:docs", "bower-install-simple", "dotdox" ]);
};
