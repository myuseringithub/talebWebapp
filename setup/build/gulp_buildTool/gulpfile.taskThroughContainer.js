import gulp from 'gulp'
import path from 'path'
import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
const config = require('configuration/configuration.js') // configuration
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

module.exports = async () => {
}