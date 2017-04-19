import gulp from 'gulp'
import path from 'path'
import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
const config = require('configuration/configuration.js') // configuration
const gulpTaskExecution = require(path.join(config.UtilityModulePath, 'gulpTaskExecution.js'))(gulp)

const FileSource = [
    {
        key: 'npm',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'npm.js'),
            argument: [
				source('/serverSide/')
			]
        }
    },
    {
        key: 'jspm',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'jspm.js'),
            argument: [
				process.env.NODEJS_VERSION,
				source('/clientSide/jspm_packageManager/')
			]
        }
    },
    {
        key: 'bower',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'bower.js'),
            argument: [
				source('/clientSide/bower_packageManager/')
			]
        }
    },

    { 
        key: 'serverSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'rsync.js'),
            argument: [
				source(),
				'serverSide/',
				'/app/'
			]
        }
    },
    {
        key: 'clientSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'rsync.js'),
            argument: [
				source(),
				'clientSide/',
				'/app/'
			]
        }
    },

    {
        key: 'json',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'json.js'),
            argument: [
                [
                    source('clientSide/**/*.json'),
                    '!' + source('clientSide/asset/webcomponent/bower_components/**/*.json'),
                    '!' + source('clientSide/asset/javascript/jspm_packages/**/*.json'),
                ],
                destination('clientSide/')
			]
        }
    },

    {
        key: 'html:metadata',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/asset/metadata/**/*.html'),
                ],
                destination('clientSide/asset/metadata/'),
                'webcomponent'
			]
        }
    },
    {
        key: 'html:root',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/template/root/**/*.html'),
                ],
                destination('clientSide/template/root/'),
                'webcomponent'
			]
        }
    },
    { // TODO: FIX uglify ES6.
        key: 'html:webcomponent',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/asset/webcomponent/**/*.html'),  
                    '!'+ source('clientSide/asset/webcomponent/bower_components/**/*.html'),
                    '!'+ source('clientSide/asset/webcomponent/bower_components/webcomponentsjs/**/*.html'),
                    '!'+ source('clientSide/asset/webcomponent/bower_components/web-component-tester/**/*.html'),
                    '!'+ source('clientSide/asset/webcomponent/bower_components/polymer/**/*.html'),
                ],
                destination('clientSide/asset/webcomponent/'),
                'webcomponent'
			],
        }
    },
    { // TODO: FIX uglify ES6.
        key: 'html:polymer',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/asset/webcomponent/bower_components/polymer/**/*.html'),  
                ],
                destination('clientSide/asset/webcomponent/bower_components/polymer'),
                'polymer'
			],
        }
    },
    {
        key: 'stylesheet:css',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'stylesheet.js'),
            argument: [
				source(['clientSide/asset/stylesheet/**/*.css']),
				destination('clientSide/asset/stylesheet')
			]
        }
    },
    { // TODO: Minify ES6 & Transpile
        key: 'javascript:js',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'javascript.js'),
            argument: [
				[
					source('clientSide/asset/javascript/**/*.js'),
					'!'+ source('clientSide/asset/javascript/jspm_packages/**/*.js'),
				],
				destination('clientSide/asset/javascript'),
                'pureJavascript'
			]
        }
    },
    { // TODO: Minify ES6 & Transpile
        key: 'javascript:serverSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'javascript.js'),
            argument: [
                [
                    source('serverSide/**/*.js'),
                    '!'+ source('serverSide/node_modules/**/*.js'),
                ],	
                destination('serverSide/'),
                'babelTranspile',
                config.GulpPath,
			]
        }
    },
    // { // TODO: Minify ES6 & Transpile
    //     key: 'javascript:clientSide',
    //     gulpTaskFunction: {
    //         path: path.join(config.TaskModulePath, 'javascript.js'),
    //         argument: [
    //             [
    //                 source('clientSide/**/*.js'),
    //                 '!'+ source('clientSide/asset/webcomponent/bower_components/**/*.js'),
    //                 '!'+ source('clientSide/asset/javascript/jspm_packages/**/*.js')
    //             ],	
    //             destination('clientSide/'),
    //             config.GulpPath
	// 		]
    //     }
    // },

    {
        key: 'nodeModules',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'symlinkNodeModules.js'),
            argument: [
				destination(config.GulpPath),
			]
        }
    },

    // { 
    //     key: '',
    //     gulpTaskFunction: {
    //         path: ,
    //         argument: [
	// 			[
	// 			],

	// 		]
    //     }
    // },
]

const GulpTaskDependency = [
    {
        name: 'install:dependencies',
        executionType: 'parallel',
        childTask: [
            {
                label: 'npm'
            }, 
            {
                label: 'jspm'
            },
            // {
            //     label: 'bower'
            // },
        ]
    },
    {
        name: 'copy:sourceToDistribution',
        executionType: 'parallel',
        childTask: [
            {
                label: 'serverSide'
            },
            {
                label: 'clientSide'
            },
        ]
    },
    {
        name: 'buildSourceCode',
        executionType: 'parallel',
        childTask: [
            {
                label: 'json'
            },
            {
                label: 'html:metadata'
            },
            {
                label: 'html:root'
            },
            {
                label: 'html:webcomponent'
            },
            // {
            //     label: 'html:template'
            // },
            {
                label: 'stylesheet:css'
            },
            {
                label: 'javascript:js'
            },
            {
                label: 'javascript:serverSide'
            },
        ]
    },
    {
        name: 'symlink',
        executionType: 'parallel',
        childTask: [
            {
                label: 'nodeModules'
            },
        ]
    },
    {
        name: 'build',
        executionType: 'series',
        childTask: [
            {
                label: 'install:dependencies'
            },
            {
                label: 'copy:sourceToDistribution'
            },
            {
                label: 'buildSourceCode'
            },
            // {
            //     label: 'symlink'
            // },
        ]
    },
]

gulpTaskExecution(FileSource, GulpTaskDependency)

// ⌚ Watch file changes from sources to destination folder.
gulp.task('watch:source', ()=> {

	// assets
	gulp.watch(
		[
			source('**/*'),
			source('**/*')
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			gulp.parallel(
				// 'build:css'
			)
		)
	);

});
