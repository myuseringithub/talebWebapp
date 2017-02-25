'use strict';

let config = require('configuration/configuration.js');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let path = require("path");
let stylesheet = require(path.join(config.TaskModulePath, 'stylesheet.js'));
let joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js'));
let source = subpath => { return joinPath(config.SourceCodePath, subpath) };
let destination = subpath => { return joinPath(config.DestinationPath, subpath) };
var merge = require('merge-stream');

module.exports = ()=> {
	let assets = stylesheet(
		source(['clientSide/assets/styles/**/*.css']),
		destination('clientSide/assets/styles')
	);

	let routing = stylesheet(
		source(['clientSide/routing/**/*.css']),
		destination('clientSide/routing')
	);

  return merge(assets, routing);
};