#!/usr/bin/env bash
# USAGE with NPM: add to scripts of package.json "./entrypoint.sh" & when running:
# "npm run start -- <functionName>"
# "npm start -- <functionName>"
# Note: Running scripts through npm is important, because local dev depencies are required (which aren't installed globally).

# current file parent directory path:
# also can use - echo "$(dirname "$0")"
currentFileDirectory=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # path of this file, regardless of where it is executed from.
cd "$currentFileDirectory"

development.stable() {
    node $currentFileDirectory/app.js
}
development.nightly() {
    node --harmony $currentFileDirectory/app.js
}
development.babelES6() {
    export DEPLOYMENT=development   
    $currentFileDirectory/node_modules/babel-cli/bin/babel-node.js --presets node6 entrypoint.js
}
development.babel.nodemon() {
    export DEPLOYMENT=development
    nodemon $currentFileDirectory/entrypoint.js --ignore '.git' --ignore 'node_modules' --watch '*.js' --legacy-watch --ext js,json
}
developmentharmonybabel() {
    export DEPLOYMENT=development   
    node --harmony $currentFileDirectory/entrypoint.js
}
developmentChrome() {
    export DEPLOYMENT=development
    node --inspect=localhost:9229 --debug-brk $currentFileDirectory/entrypoint.js
}

development.distributionCode() {
    export DEPLOYMENT=development
    node --harmony /project/application/distribution/serverSide/entrypoint.js
}

deployment.test() {
    echo \"Error: no test specified\" && exit 1
}

production() { # working directory is pointing to `app` folder inside container the result of distribution code.
    export DEPLOYMENT=production
    node $currentFileDirectory/entrypoint.js
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
