'use strict';

let config = require('configuration/configuration.js');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let path = require("path");
let javascriptUglifyTask = require(path.join(config.TaskModulePath, 'javascript.js'));
let joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js'));
let source = subpath => { return joinPath(config.SourceCodePath, subpath) };
let destination = subpath => { return joinPath(config.DestinationPath, subpath) };

module.exports = ()=> {
	return javascriptUglifyTask(
		// chaged because it causes errors
		source('clientSide/assets/javascripts/admin-script.js'),
		destination('clientSide/assets/javascripts')
	);
};