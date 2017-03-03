// 'use strict'; // Strict enforces specific conditions and imported scripts may have problems.
// 😄 This file is used to define Gulp tasks with source path and destination path. While gulp_includeNodeModules.js is used to save the functions for the build.

import gulp from 'gulp'
import path from 'path'
import merge from 'merge-stream' // A method to dynamically add more sources to the stream.
import filesystem from 'fs'
import config from 'configuration/configuration.js' // configuration

// const plugins = require('gulp-load-plugins')({ camelize: true }),
//     browserSync = require('browser-sync')

// Task & Utility Modules:
export const include = (file)=> { eval(filesystem.readFileSync(file) + '') }, // Execute file code as if written locally.
    joinPath = require(path.join(config.UtilityModulePath, 'joinPath.js')),
    source = subpath => { return joinPath(config.SourceCodePath, subpath) },
    destination = subpath => { return joinPath(config.DestinationPath, subpath) },
    rsyncTask = require(path.join(config.TaskModulePath, 'rsync.js'))

// Deployment container - tasks responsible for builds that happen through temporary container (from one volume to another).
// include('taskThroughContainer.js');
require('taskThroughContainer.js');

// // Environment container (production/development) - tasks run changing internals of container. 
// include('taskInsideContainer.js');

// livereloading
require('taskLivereload.js')
