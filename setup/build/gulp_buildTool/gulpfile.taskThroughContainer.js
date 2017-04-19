import gulp from 'gulp'
import path from 'path'
import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
const config = require('configuration/configuration.js') // configuration
const gulpTaskExecution = require(path.join(config.UtilityModulePath, 'gulpTaskExecution.js'))(gulp)

function mergeDedupe(array) {  return [ ...new Set( [].concat( ...array ) ) ]; }
let es6TaskSetting = require('./buildStepDefinition/es6.taskSetting.js')
let es6TaskAggregator = require('./buildStepDefinition/es6.taskAggregator.js')
// let es5TaskSetting = require('./buildStepDefinition/es5.taskSetting.js')
// let es5TaskAggregator = require('./buildStepDefinition/es5.taskAggregator.js')
let es5TaskSetting = []
let es5TaskAggregator = []
let FileSource = mergeDedupe(es6TaskSetting, es5TaskSetting)
let GulpTaskDependency = mergeDedupe(es6TaskAggregator, es5TaskAggregator)

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
