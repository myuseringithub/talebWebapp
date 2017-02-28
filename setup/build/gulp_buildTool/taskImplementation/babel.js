'use strict';

let config = require('configuration/configuration.js');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let path = require("path");
let joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js'));
let source = subpath => { return joinPath(config.SourceCodePath, subpath) };
let destination = subpath => { return joinPath(config.DestinationPath, subpath) };
let babelTask = require(path.join(config.TaskModulePath, 'babel.js'));
var merge = require('merge-stream');

module.exports = ()=> {
    let serverSide = babelTask(
		// chaged because it causes errors
		[
			source('serverSide/**/*.js'),
			'!'+ source('serverSide/node_modules/**/*.js')
		],	
		destination('serverSide/'),
		config.GulpPath
	);
    return merge(serverSide);
};
