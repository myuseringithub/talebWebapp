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

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@
