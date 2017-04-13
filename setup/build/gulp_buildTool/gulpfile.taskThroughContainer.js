import gulp from 'gulp'
import path from 'path'
import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
const config = require('configuration/configuration.js') // configuration
const gulpTaskExecution = require(path.join(config.UtilityModulePath, 'gulpTaskExecution.js'))(gulp)

const FileSource = [
    { // build:webcomponent
        key: 'html',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/asset/metadata/**/*.html'),
                ],
                destination('clientSide/asset/metadata/'),
			]
        }
    },
    { // build:webcomponent
        key: 'htmlRoot',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/template/root/*.html'),
                ],
                destination('clientSide/template/root/'),
			]
        }
    },
    {
        key: 'webcomponent',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/asset/webcomponent/**/*.html'),  
                    '!'+ source('clientSide/asset/webcomponent/bower_components/**/*.html')
                ],
                destination('clientSide/asset/webcomponent/'),
			]
        }
    },
    {
        key: 'template',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/template/root/document-element/**/*.html'),  
                ],
                destination('clientSide/template/root/document-element'),
			]
        }
    },
    { 
        key: 'jsFileServerSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'babel.js'),
            argument: [
                [
                    source('serverSide/**/*.js'),
                    '!'+ source('serverSide/node_modules/**/*.js'),
                ],	
                destination('serverSide/'),
                config.GulpPath
			]
        }
    },
    { 
        key: 'jsFileClientSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'babel.js'),
            argument: [
                [
                    source('clientSide/**/*.js'),
                    '!'+ source('clientSide/asset/webcomponent/bower_components/**/*.js'),
                    '!'+ source('clientSide/asset/javascript/jspm_packages/**/*.js')
                ],	
                destination('clientSide/'),
                config.GulpPath
			]
        }
    },
    {
        key: 'js',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'javascript.js'),
            argument: [
				[
					source('clientSide/asset/javascript/**/*.js'),
					'!'+ source('clientSide/asset/javascript/jspm_packages/**/*.js'),
				],
				destination('clientSide/asset/javascript')
			]
        }
    },
    {
        key: 'css',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'stylesheet.js'),
            argument: [
				source(['clientSide/asset/stylesheet/**/*.css']),
				destination('clientSide/asset/stylesheet')
			]
        }
    },


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
        name: 'buildSourceCode',
        executionType: 'parallel',
        childTask: [
            {
                label: 'html'
            },
            {
                label: 'htmlRoot'
            },
            {
                label: 'webcomponent'
            },
            {
                label: 'template'
            },
            {
                label: 'css'
            },
            {
                label: 'js'
            },
            {
                label: 'jsFileClientSide'
            }
        ]
    },
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
            {
                label: 'bower'
            },
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
        name: 'symlink',
        executionType: 'parallel',
        childTask: [
            {
                label: 'nodeModules'
            },
        ]
    },
    {
        name: 'compile',
        executionType: 'parallel',
        childTask: [
            {
                label: 'jsFileServerSide'
            }
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
                label: 'compile'
            },
            {
                label: 'buildSourceCode'
            },
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
