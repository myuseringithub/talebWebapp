// 'use strict'; // Strict enforces specific conditions and imported scripts may have problems.
// 😄 This file is used to define Gulp tasks with source path and destination path. While gulp_includeNodeModules.js is used to save the functions for the build.

import gulp from 'gulp'
import path from 'path'
import merge from 'merge-stream' // A method to dynamically add more sources to the stream.
import filesystem from 'fs'
import config from 'configuration/configuration.js' // configuration
export const include = (file)=> { eval(filesystem.readFileSync(file) + '') }, // Execute file code as if written locally.
    joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')),
    source = subpath => { return joinPath(config.SourceCodePath, subpath) },
    destination = subpath => { return joinPath(config.DestinationPath, subpath) },
    plugins = require('gulp-load-plugins')({ camelize: true })

// Deployment container - tasks responsible for builds that happen through temporary container (from one volume to another).
const gulpTaskExecution = require(path.join(config.UtilityModulePath, 'gulpTaskExecution.js'))(gulp)
let es6TaskSetting = require('./buildStepDefinition/es6.taskSetting.js')
let es5TaskSetting = require('./buildStepDefinition/es5.taskSetting.js')
let serverSideTaskSetting = require('./buildStepDefinition/serverSide.taskSetting.js')
let es6TaskAggregator = require('./buildStepDefinition/es6.taskAggregator.js')
let es5TaskAggregator = require('./buildStepDefinition/es5.taskAggregator.js')
let serverSideTaskAggregator = require('./buildStepDefinition/serverSide.taskAggregator.js')

let FileSource = Array.concat(es6TaskSetting, es5TaskSetting, serverSideTaskSetting)
let GulpTaskDependency = Array.concat(
	es6TaskAggregator, 
	es5TaskAggregator,
	serverSideTaskAggregator,
	[{
		name: 'build',
		executionType: 'series',
		childTask: [
			{
				label: 'serverSide:build'
			},
			{
				label: 'es6:build'
			}, 
			{
				label: 'es5:build'
			},
		]
	}]
)
console.log(JSON.stringify(FileSource))
console.log(JSON.stringify(GulpTaskDependency))

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

// livereloading
require('gulpfile.taskLivereload.js')