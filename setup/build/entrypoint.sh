#!/usr/bin/env bash
set -ex; 

# current file parent directory path:
# also can use - echo "$(dirname "$0")"
currentFileDirectory=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # path of this file, regardless of where it is executed from.
cd "$currentFileDirectory"

build() { # ⭐ Gulp - run bulid tasks
    set -ex; 
    # Debug purposes
    node --harmony $currentFileDirectory/entrypoint.js build
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

