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
    ./node_modules/babel-cli/bin/babel-node.js --presets node6 babelCompile.entrypoint.js
}
development.babel() {
    nodemon babelCompile.entrypoint.js
}
developmentharmonybabel() {
    node --harmony babelCompile.entrypoint.js
}

deployment.test() {
    echo \"Error: no test specified\" && exit 1
}

production() { # working directory is pointing to `app` folder inside container the result of distribution code.
    node production.entrypoint.js
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@