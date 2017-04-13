import gulp from 'gulp'
import path from 'path'
const config = require('configuration/configuration.js') // configuration
const BrowserSync = require('browser-sync')
const ServerLivereload = require(path.join(config.UtilityModulePath, 'serverLivereload.js'))

// ⌚ Gulp watch settings 
// Fix high CPU usage for mounted filesystem in docker. And allow legacy file changes checking using flag 'usePolling' for chokidar.
// IMPORTANT: should maybe increase fs limit for number files that can be watched https://github.com/gulpjs/gulp/issues/217 https://discourse.roots.io/t/gulp-watch-error-on-ubuntu-14-04-solved/3453/6
const INTERVAL = 5000;
const usePolling = true;

const browserSyncConfig = {
    host: 'localhost',
    port: 9903,
    proxy: {
        target: 'localhost',
        // ws: true // when localhost webapp uses websocket also.
    },
    ui: {
        port: 9901,
        weinre: {
            port: 9902
        }
    },
    logLevel: 'debug',
    logConnections: true,
    open: false, // open browser false.
    scriptPath: () => 'http://HOST/browser-sync/browser-sync-client.js?v=2.18.8'.replace("HOST", 'localhost')
};

let debugArguments = []
if (process.env.SZN_DEBUG) {
    if(process.env.SZN_OPTION.break) {
        debugArguments = ["--inspect=localhost:9229", "--debug-brk"]
    } else {
        debugArguments = ["--inspect=localhost:9229"]
    }
}

const $ = {} // shared object 

// ⌚ Watch file changes for livereload.
// reload server & browser
gulp.task('livereload:ServerSide', ()=> {
	gulp.watch(
		[ 
            '/app/serverSide/**/*.js', 
            '/app/serverSide/**/*.css', 
            '/app/serverSide/**/*.html', 
            '!/app/serverSide/**/node_modules{,/**/*}'
        ], // equals to '!/app/{node_modules,node_modules/**/*}'
		{ interval: INTERVAL, usePolling: usePolling }, 
		async (done) => {
            $.serverLivereload.reload()
            done()
        }
	);
});

// reload only browser
gulp.task('livereload:clientSide', ()=> {
	gulp.watch(
		[
            '/app/clientSide/**/*.js', 
            '/app/clientSide/**/*.css', 
            '/app/clientSide/**/*.html', 
            '!/app/clientSide/**/node_modules{,/**/*}'
        ], // equals to '!/app/{node_modules,node_modules/**/*}'
		{ interval: INTERVAL, usePolling: usePolling }, 
		async (done) => {
            $.browserSync.reload()
            done()
        }        
	);
})

gulp.task('watch:livereload', 
	gulp.series(
        () => { // Initialize
            $.browserSync = BrowserSync.create('Info - locahost server')
            $.browserSync.init(browserSyncConfig)
            $.serverLivereload = new ServerLivereload(gulp, debugArguments)
            $.serverLivereload.on('reload', () => {
                $.browserSync.reload()
            })
            $.serverLivereload.reload()
        },
		gulp.parallel(
            'livereload:ServerSide', 
            'livereload:clientSide'
        )
	)
);
