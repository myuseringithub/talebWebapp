#!/usr/bin/env bash
# USAGE with NPM: add to scripts of package.json "./entrypoint.sj" & when running:
# "npm run start -- <functionName>"
# "npm start -- <functionName>"
# Note: Running scripts through npm is important, because local dev depencies are required (which aren't installed globally).

development.stable() {
    node ./app.js
}
development.nightly() {
    node --harmony app.js
}
development.babelES6() {
    export DEPLOYMENT=development   
    ./node_modules/babel-cli/bin/babel-node.js --presets node6 entrypoint.js
}
development.babel.nodemon() {
    export DEPLOYMENT=development
    nodemon entrypoint.js --ignore '.git' --ignore 'node_modules' --watch '*.js' --legacy-watch --ext js,json
}
developmentharmonybabel() {
    export DEPLOYMENT=development   
    node --harmony entrypoint.js
}
developmentChrome() {
    export DEPLOYMENT=development
    node --inspect=localhost:9229 --debug-brk entrypoint.js
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
    node entrypoint.js
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/entrypoint.sj <functionName>".
$@