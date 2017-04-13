#!/usr/bin/env bash
# USAGE with NPM: add to scripts of package.json "./run.sh" & when running:
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
    ./node_modules/babel-cli/bin/babel-node.js --presets node6 entrypoint.development.js
}
development.babel() {
    nodemon entrypoint.development.js
}
developmentharmonybabel() {
    node --harmony entrypoint.development.js
}
developmentChrome() {
    node --inspect=localhost:9229 --debug-brk entrypoint.development.js
}

deployment.test() {
    echo \"Error: no test specified\" && exit 1
}

production() { # working directory is pointing to `app` folder inside container the result of distribution code.
    node entrypoint.production.js
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@