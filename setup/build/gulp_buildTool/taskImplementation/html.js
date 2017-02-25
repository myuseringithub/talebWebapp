'use strict';

let config = require('configuration/configuration.js');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let path = require("path");
let optimizeHtmlTask = require(path.join(config.TaskModulePath, 'html.js'));
let htmlminifyElementsTask = require(path.join(config.TaskModulePath, 'htmlElement.js'));
let joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js'));
let source = subpath => { return joinPath(config.SourceCodePath, subpath) };
let destination = subpath => { return joinPath(config.DestinationPath, subpath) };
var merge = require('merge-stream');

module.exports = ()=> {

	// let html = optimizeHtmlTask( // produces errors.
	// 	[
	// 		source('clientSide/assets/**/*.html'),
	// 		'!'+ source('clientSide/assets/elements/**/*.html'),
	// 		'!'+ source('clientSide/assets/elements/bower_components/**/*.html'),
	// 		'!'+ source('clientSide/assets/javascripts/addons_library/Woothemes-FlexSlider2/dynamic-carousel-min-max.html') // Throughs errors.
	// 	],
	// 	destination('clientSide/assets')
	// );

	let htmlElement = htmlminifyElementsTask(
		[
			source('clientSide/assets/elements/**/*.html'),
			'!'+ source('clientSide/assets/elements/bower_components/**/*.html')
		],
		destination('clientSide/assets/elements')
	);
	return htmlElement;
	
//   return merge(html, htmlElement);
}