'use strict';

let config = require('configuration/configuration.js');
let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({ camelize: true });
let path = require("path");
let joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js'));
let source = subpath => { return joinPath(config.SourceCodePath, subpath) };
let destination = subpath => { return joinPath(config.DestinationPath, subpath) };
let babelTask = require(path.join(config.TaskModulePath, 'babel.js'));
let merge = require('merge-stream');
let babelInline = require('gulp-babel-inline');
let babel = require('gulp-babel');

module.exports = () => {
	return ()=> {
		let jsFileServerSide = babelTask(
			// chaged because it causes errors
			[
				source('serverSide/**/*.js'),
				'!'+ source('serverSide/node_modules/**/*.js'),
			],	
			destination('serverSide/'),
			config.GulpPath
		);
		let jsFileClientSide = babelTask(
			// chaged because it causes errors
			[
				source('clientSide/**/*.js'),
				'!'+ source('clientSide/asset/webcomponent/bower_components/**/*.js'),
				'!'+ source('clientSide/asset/javascript/jspm_packages/**/*.js')
			],	
			destination('clientSide/'),
			config.GulpPath
		);
		let inlineJS =  gulp.src([
					source('clientSide/asset/webcomponent/**/*.html'),
					'!'+ source('clientSide/asset/webcomponent/bower_components/**/*.html'),
					'!'+ source('clientSide/asset/javascript/jspm_packages/**/*.html')
				])
				.pipe(babelInline({
					"presets": ["es2015", "stage-0"],
					"plugins": ["babel-plugin-transform-runtime", "babel-plugin-add-module-exports"]
				}))
				.pipe(gulp.dest(destination('clientSide/')));

		return merge(jsFileServerSide, jsFileClientSide, inlineJS);
	};
}