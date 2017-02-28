'use strict';

let config = require('configuration/configuration.js'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	childProcess = require('child_process'),
	path = require("path"),
	joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')),
	source = subpath => { return joinPath(config.SourceCodePath, subpath) },
	destination = subpath => { return joinPath(config.DestinationPath, subpath) },
	merge = require('merge-stream');

export default ()=> {
	// In gulp 4, you can return a child process to signal task completion
	let installProd = childProcess.spawn('npm', ['install'], { cwd: destination('serverSide/'), shell: true, stdio:[0,1,2] });
	let installDev = childProcess.spawn('npm', ['install --only=dev'], { cwd: destination('serverSide/'), shell: true, stdio:[0,1,2] });
	return merge(installDev, installProd);
};