import gulp from 'gulp'
import path from 'path'
let config = require('configuration/configuration.js') // configuration
import {include, joinPath, source, destination, rsyncTask} from 'gulpfile.js'


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
            path: path.join(config.TaskImplementationPath, 'npm.js'),
            argument: [
				source('/serverSide/')
			]
        }
    },
    { 
        key: 'jspm',
        gulpTaskFunction: {
            path: path.join(config.TaskImplementationPath, 'jspm.js'),
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

    {
        key: 'babel',
        gulpTaskFunction: {
            path: path.join(config.TaskImplementationPath, 'babel.js'),
            argument: [
			]
        }
    },

    // { 
    //     gulpTaskDependency: '', 
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
                label: 'babel'
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
            // {
            //     label: 'compile'
            // },
            {
                label: 'buildSourceCode'
            },
        ]
    },
]

// create FileSource tasks
FileSource.map(fileSource => {
	gulp.task(fileSource.key, require(fileSource.gulpTaskFunction.path)(...fileSource.gulpTaskFunction.argument))
})
    // let taskName = `${fileSource.gulpTaskDependency}:${fileSource.key}`

function gulpTaskExecution(executionType, childTask = []) {
    let childTaskExecuted = []
    childTask.map((task) => {
        if(typeof(task.childTask) != 'undefined') {
            childTaskExecuted.push(gulpTaskExecution(task.executionType, task.childTask))
        } else {
            childTaskExecuted.push(task.label)
        }
    })
    let callback;
    switch(executionType) {
        case 'parallel':
            callback = gulp.parallel(...childTaskExecuted)
        break;
        case 'series':
            callback = gulp.series(...childTaskExecuted)
        break;
    }
    return callback
}

// define gulpTaskDependency tasks
GulpTaskDependency.map(gulpTaskDependency => {
    gulp.task(gulpTaskDependency.name, gulpTaskExecution(gulpTaskDependency.executionType, gulpTaskDependency.childTask) )
})

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
