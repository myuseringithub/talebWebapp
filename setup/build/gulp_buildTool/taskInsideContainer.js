// Copy distribution inside container
gulp.task('copy:dist:root', ()=> { return rsyncTask( '/tmp/distribution/clientSide/root/', '/', '/app/root/' ); });
gulp.task('copy:dist:assets', ()=> { return rsyncTask( '/tmp/distribution/clientSide/assets/', '/', '/app/root/app/' ); });
gulp.task('copy:dist:muplugins', ()=> { return rsyncTask( '/tmp/distribution/serverSide/wordpressPlugins_mustUsePlugins/', '/', '/app/root/content/mu-plugins/' ); });
gulp.task('copy:dist:plugins', ()=> { return rsyncTask( '/tmp/distribution/serverSide/wordpressPlugins_composer_dependencyManager/plugins/', '/', '/app/root/content/plugins/' ); });
gulp.task('copy:dist:manualPlugins', ()=> {	return rsyncTask( '/tmp/distribution/serverSide/wordpressPlugins_manuallyUpdated/', '/', '/app/root/content/plugins/' ); });
gulp.task('copy:dist:routing', ()=> { return rsyncTask( '/tmp/distribution/clientSide/routing/', '/', '/app/root/content/themes/routing/' ); });
gulp.task('copy:dist:bower', ()=> {	return rsyncTask( '/tmp/distribution/clientSide/bower_packageManager/bower_components/', '/', '/app/root/app/sharedApp/elements/bower_components/' ); });
gulp.task('copy:dist:jspm', ()=> { return rsyncTask( '/tmp/distribution/clientSide/jspm_packages_modules/jspm_packages/', '/', '/app/root/app/sharedApp/javascripts/jspm_packages/' );
});
gulp.task('copy:distribution', 
	gulp.series(
		gulp.parallel(
			'copy:dist:root',
			'copy:dist:muplugins',
			'copy:dist:plugins',
			'copy:dist:routing',
			'copy:dist:manualPlugins', 
			'copy:dist:bower',
			'copy:dist:jspm'
		),
		'copy:dist:assets'
	)
);

// // ⭐ Copy content (volume -> container)
// gulp.task('copy:content:uploads', ()=> { return rsyncTask( '/tmp/content/wordpressUploads/', '/', '/app/root/content/uploads/' ); });

// ⭐ Copy configurations (volume -> persist in container image)
gulp.task('copy:conf:wordpressConfiguration', require(path.join(config.TaskImplementationPath, 'wordpressConfiguration.js')) );
gulp.task('copy:conf:phpini', require(path.join(config.TaskImplementationPath, 'phpini.js')) );
gulp.task('copy:conf:apacheFiles', require(path.join(config.TaskImplementationPath, 'apacheFile.js')) );
gulp.task('exec:conf:apacheEnableHost', require(path.join(config.TaskImplementationPath, 'apacheEnableHost.js')) );
gulp.task('copy:conf:apache', 
	gulp.series(
		gulp.parallel('copy:conf:apacheFiles'),
		'exec:conf:apacheEnableHost'
	)
);
gulp.task('copy:conf', 
	gulp.series(
		gulp.parallel('copy:conf:wordpressConfiguration', 'copy:conf:phpini','copy:conf:apache')
	)
);

// ⌚ Watch source & build to distribution.
gulp.task('watch:distribution', ()=> {
	// assets
	gulp.watch(
		[
			config.DistributionCodePath + 'clientSide/assets/**/*',
			config.DistributionCodePath + 'clientSide/routing/**/*'
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			gulp.parallel(
				'copy:dist:routing',
				'copy:dist:assets'
			)
		)
	);
	// bower
	gulp.watch(
		[
			config.DistributionCodePath + 'clientSide/bower_packageManager/**/*'
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			'copy:dist:bower'
		)
	);
	// jspm
	gulp.watch(
		[
			config.DistributionCodePath + 'clientSide/jspm_packages_modules/**/*'
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			'copy:dist:jspm'
		)
	);
	// root
	gulp.watch(
		[
			config.DistributionCodePath + 'clientSide/root/**/*'
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			'copy:dist:root'
		)
	);
	// serverSide
	gulp.watch(
		[
			config.DistributionCodePath + 'serverSide/apacheServer'
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			'copy:conf:apache'
		)
	);
	// serverSide
	gulp.watch(
		[
			config.DistributionCodePath + 'serverSide/phpConfiguration'
		], 
		{interval: INTERVAL, usePolling: usePolling}, 
		gulp.series(
			'copy:conf:phpini'
		)
	);

});