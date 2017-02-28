import gulp from 'gulp'
import path from 'path'
let config = require('configuration/configuration.js') // configuration
import {include, joinPath, source, destination, rsyncTask} from 'gulpfile.js'

// ⭐ Copy & Build distribution code (source -> distribution).
gulp.task('copy:serverSide', ()=> { return rsyncTask( source(), 'serverSide/', '/app/' ); });
gulp.task('copy:clientSide', ()=> { return rsyncTask( source(), 'clientSide/', '/app/' ); });
gulp.task('copy:sourceToDistribution', 
	gulp.parallel('copy:serverSide', 'copy:clientSide')
);

// Install dependencies (in distribution volume)
gulp.task('install:npm', require(path.join(config.TaskImplementationPath, 'npm.js')) );
gulp.task('install:dependencies', 
	gulp.series(
		gulp.parallel('install:npm')
	)
);

// Compile from ES6 to released javascript version.
gulp.task('symlinkNodeModules', require(path.join(config.TaskImplementationPath, 'symlinkNodeModules.js')) ); 
gulp.task('compile:babel', require(path.join(config.TaskImplementationPath, 'babel.js')) );
gulp.task('compile', 
	gulp.series(
		// doesn'T WORK
		// 'symlinkNodeModules', // make gulp node modules available to babel to use, because it is changing the cwd during gulp babel pipe (apparently).
		gulp.parallel('compile:babel')
	)
);

// Build assets
gulp.task('build:css', require(path.join(config.TaskImplementationPath, 'stylesheet.js')) );
gulp.task('build:js', require(path.join(config.TaskImplementationPath, 'javascript.js')) );
gulp.task('build:html', require(path.join(config.TaskImplementationPath, 'html.js')) );
gulp.task('buildSourceCode', 
	gulp.series(
		gulp.parallel('build:css', 'build:html', 'build:js')
	)
);

gulp.task('build', 
	gulp.series(
		'install:dependencies', // install first as compile uses node_modules
		'copy:sourceToDistribution',
		'compile'
		// 'buildSourceCode'
	)
);

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
