#!/usr/bin/env bash
set -ex; 
 
# current file parent directory path:
# also can use - echo "$(dirname "$0")"
currentFileDirectory=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # path of this file, regardless of where it is executed from.
cd "$currentFileDirectory"

watch() { # ⌚ Gulp watch
    set -ex; 
    node --harmony $(which gulp) watch:source --gulpfile $currentFileDirectory/entrypoint.js
}

# watch.livereload() {
#     set -ex; 
#     # out put what gulp livereload state 
#     # export DEBUG=*;
#     # --inspect --debug-brk allows for debugging node with chrome.
#     node --harmony $(which gulp) watch:livereload --gulpfile $currentFileDirectory/entrypoint.js
# }

watch.livereload() {
    set -ex; 
    # out put what gulp livereload state 
    # export DEBUG=*;
    # --inspect --debug-brk allows for debugging node with chrome.
    export DEPLOYMENT=development
    export SZN_DEBUG=false
    node --harmony $(which gulp) watch:livereload --gulpfile $currentFileDirectory/entrypoint.js
}

watch.livereload.chrome() {
    set -ex;
    # out put what gulp livereload state 
    # export DEBUG=*;
    #  --inspect=localhost:9229 --debug-brk allows for debugging node with chrome.
    export DEPLOYMENT=development
    export SZN_DEBUG=true
    export SZN_OPTION_BREAK=true
    node --harmony $(which gulp) watch:livereload --gulpfile $currentFileDirectory/entrypoint.js
}

watch.livereload.chrome.noBreak() {
    set -ex;
    export DEPLOYMENT=development
    export SZN_DEBUG=true
    export SZN_OPTION_BREAK=false
    # node --harmony $(which gulp) watch:livereload --gulpfile $currentFileDirectory/entrypoint.js
    node --harmony $currentFileDirectory/entrypoint.js watch:livereload
}

development() {
    export DEPLOYMENT=development
    (cd /project/application/setup/livereload/; $currentFileDirectory/entrypoint.sh watch.livereload.chrome)
}

distribution() {
    # TODO: Add option for watch base directory
    export DEPLOYMENT=development
    export SZN_OPTION_ENTRYPOINT_NAME="entrypoint.js"
    export SZN_OPTION_ENTRYPOINT_PATH="/project/application/distribution/serverSide/"
    (cd /project/application/setup/livereload/; $currentFileDirectory/entrypoint.sh watch.livereload.chrome)
}

if [[ $# -eq 0 ]] ; then # if no arguments supplied, fallback to default
    echo -n "Enter command: "
    read command
    echo "• Executing: $command. Passing arguments ${@:2}"
    $command
else
    # Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sh <functionName>".
    $@
fi
