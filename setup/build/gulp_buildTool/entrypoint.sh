#!/usr/bin/env bash
set -ex; 
 
build() { # ⭐ Gulp - run bulid tasks
    set -ex; 
    # Debug purposes
    node --harmony `which gulp` --tasks --gulpfile ./entrypoint.js
    node --harmony `which gulp` build --gulpfile ./entrypoint.js
}

watch() { # ⌚ Gulp watch
    set -ex; 
    node --harmony `which gulp` watch:source --gulpfile ./entrypoint.js
}

# watch.livereload() {
#     set -ex; 
#     # out put what gulp livereload state 
#     # export DEBUG=*;
#     # --inspect --debug-brk allows for debugging node with chrome.
#     node --harmony `which gulp` watch:livereload --gulpfile ./entrypoint.js
# }

watch.livereload() {
    set -ex; 
    # out put what gulp livereload state 
    # export DEBUG=*;
    # --inspect --debug-brk allows for debugging node with chrome.
    export DEPLOYMENT=development
    export SZN_DEBUG=false
    node --harmony `which gulp` watch:livereload --gulpfile ./entrypoint.js
}

watch.livereload.chrome() {
    set -ex;
    # out put what gulp livereload state 
    # export DEBUG=*;
    #  --inspect=localhost:9229 --debug-brk allows for debugging node with chrome.
    export DEPLOYMENT=development
    export SZN_DEBUG=true
    export SZN_OPTION_BREAK=true
    node --harmony `which gulp` watch:livereload --gulpfile ./entrypoint.js
}

watch.livereload.chrome.noBreak() {
    set -ex;
    export DEPLOYMENT=development
    export SZN_DEBUG=true
    export SZN_OPTION_BREAK=false
    node --harmony `which gulp` watch:livereload --gulpfile ./entrypoint.js
}

development() {
    export DEPLOYMENT=development
    (cd /project/application/setup/build/gulp_buildTool/; ./entrypoint.sj watch.livereload.chrome)
}

distribution() {
    # TODO: Add option for watch base directory
    export DEPLOYMENT=development
    export SZN_OPTION_ENTRYPOINT_NAME="entrypoint.js"
    export SZN_OPTION_ENTRYPOINT_PATH="/project/application/distribution/serverSide/"
    (cd /project/application/setup/build/gulp_buildTool/; ./entrypoint.sj watch.livereload.chrome)
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sj <functionName>".
$@
