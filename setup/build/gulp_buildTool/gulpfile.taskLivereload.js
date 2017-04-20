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
    // logLevel: 'debug',
    logConnections: true,
    open: false, // open browser false.
    scriptPath: () => 'http://HOST/browser-sync/browser-sync-client.js?v=2.18.8'.replace("HOST", 'localhost')
};

const entrypoint = {
    filename: process.env.SZN_OPTION_ENTRYPOINT_NAME || 'entrypoint.development.js',
    filePath: process.env.SZN_OPTION_ENTRYPOINT_PATH || '/app/serverSide/'
}

let debugArguments = []
if (process.env.SZN_DEBUG) {
    if(process.env.SZN_OPTION_BREAK == 'true') {
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
            setTimeout(function(){ 
                $.serverLivereload.reload()
                done()
            }, 1000);
        }
	);
});

// TODO: Watch files of clientSide-es5 when distribution is used.
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
            setTimeout(function(){
                $.browserSync.reload()
                done()
            }, 1000);
        }        
	);
})

gulp.task('watch:livereload', 
	gulp.series(
		gulp.parallel(
            () => { // Initialize
                console.info(`☕ SZN Gulp - Running script "${entrypoint.filePath}${entrypoint.filename}". With arguments: ${debugArguments.join()}`)
                $.browserSync = BrowserSync.create('Info - locahost server')
                $.browserSync.init(browserSyncConfig)
                $.serverLivereload = new ServerLivereload(gulp, debugArguments, entrypoint)
                $.serverLivereload.on('reload', () => {
                    $.browserSync.reload()
                })
                $.serverLivereload.reload()
            },
            'livereload:ServerSide', 
            'livereload:clientSide'
        )
	)
);
