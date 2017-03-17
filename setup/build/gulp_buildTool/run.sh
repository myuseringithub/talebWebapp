#!/usr/bin/env bash
set -ex; 
 
build() { # ⭐ Gulp - run bulid tasks
    set -ex; 
    node --harmony `which gulp` build --gulpfile ./babel_JSCompiler.entrypoint.js
}

watch() { # ⌚ Gulp watch
    set -ex; 
    node --harmony `which gulp` watch:source --gulpfile ./babel_JSCompiler.entrypoint.js
}

watch.livereload() {
    set -ex; 
    # out put what gulp livereload state 
    # export DEBUG=*;
    # --inspect --debug-brk allows for debugging node with chrome.
    node --harmony `which gulp` watch:livereload --gulpfile ./babel_JSCompiler.entrypoint.js
}

watch.livereload() {
    set -ex; 
    # out put what gulp livereload state 
    # export DEBUG=*;
    # --inspect --debug-brk allows for debugging node with chrome.
    export SZN_DEBUG = false
    node --harmony `which gulp` watch:livereload --gulpfile ./babel_JSCompiler.entrypoint.js
}

watch.livereload.chrome() {
    set -ex;
    # out put what gulp livereload state 
    # export DEBUG=*;
    #  --inspect=localhost:9229 --debug-brk allows for debugging node with chrome.
    export SZN_DEBUG=true
    node --harmony `which gulp` watch:livereload --gulpfile ./babel_JSCompiler.entrypoint.js
}

development() {
    (cd /tmp/build/gulp_buildTool/; ./run.sh watch.livereload.chrome)
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@
