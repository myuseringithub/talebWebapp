#!/bin/bash
###### TODO: Change this file name to represent its purpose more like "node module installations. and execution of following command"

set -ex; 
echo "Deploying as ${DEPLOYMENT}";

gulp -v;


# # ⭐ install dependencies / node modules (from packages.json) in working directory "/tmp/build/gulp_buildTool/" & update to latest versions
# --no-bin-links --no-optional options may sovle issues with installation.
(cd /project/application/setup/build;
npm install --no-optional; npm install --only=dev; npm update;)
if [ -d "/project/application/setup/livereload" ]; then
    (cd /project/application/setup/livereload;
    npm install; npm install --only=dev; npm update;)
fi
(cd /project/dependency/appDeploymentLifecycle/gulp_buildTool.js; 
    npm install; npm install --only=dev; npm update;)
(cd /project/dependency/appDeploymentLifecycle/babel_javascriptTranspilation.js; 
    npm install; npm install --only=dev; npm update;)

(cd /project/application/setup/build;
./entrypoint.sh build)

echo "Gulp watch ? ";
if [ "$DEPLOYMENT" = "development" ]; then
    (cd /project/application/setup/livereload;
    ./entrypoint.sh watch)
fi

# ⭐ call docker-compose command after entrypoint as they are passed as arguments when entrypoint is set.
exec "$@"
