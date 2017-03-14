import childProcess from 'child_process'
import gulp from 'gulp'
import proxyMiddleware from 'http-proxy-middleware'
var browserSync80 = require('browser-sync').create('Info - locahost:80 server');
let node;

// ⌚ Gulp watch settings 
// Fix high CPU usage for mounted filesystem in docker. And allow legacy file changes checking using flag 'usePolling' for chokidar.
// IMPORTANT: should maybe increase fs limit for number files that can be watched https://github.com/gulpjs/gulp/issues/217 https://discourse.roots.io/t/gulp-watch-error-on-ubuntu-14-04-solved/3453/6
const INTERVAL = 5000;
const usePolling = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function serverLivereload() {
    if(node) node.kill()

    node = childProcess.fork('babelCompile.entrypoint.js', { cwd: '/app/serverSide', stdio:'inherit' })
    node.on('message', (m) => {
        // console.log('Server ready & listening.', m);
        browserSync80.reload()
    });
    // node = childProcess.spawn('node', ['babelCompile.entrypoint.js'], { cwd: '/app/serverSide', stdio:[0,1,2] })
    node.on('close', (code) => {
        if(code === 8) {
            gulp.log('Error detected, waiting for changes.')
        }
    })
    // process.on('szn', (code) => {
    //     console.log('listening event emitted for child process 1!')
    // })    
    // node.on('szn', (code) => {
    //     console.log('listening event emitted for child process 1!')
    // })    
}
// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

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
            serverLivereload()
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
            browserSync80.reload()
            done()
        }        
	);
})

gulp.task('watch:livereload', 
	gulp.series(
		gulp.parallel(
            () => {

                // initialize server & reload
                // Serve files from the root of this project
                browserSync80.init({
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
                });
                serverLivereload()
            },
            'livereload:ServerSide', 
            'livereload:clientSide'
        )
	)
);
