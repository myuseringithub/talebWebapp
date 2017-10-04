#!/bin/bash
set -ex; 
echo "Deploying as ${DEPLOYMENT}";

gulp -v;


# ⭐ install dependencies / node modules (from packages.json) in working directory "/tmp/build/gulp_buildTool/" & update to latest versions
(cd /tmp/build/gulp_buildTool;
npm install; npm install --only=dev; npm update;)
(cd /tmp/appDeploymentLifecycle/gulp_buildTool; 
    npm install; npm install --only=dev; npm update;)
(cd /tmp/appDeploymentLifecycle/babel_javascriptTranspilation; 
    npm install; npm install --only=dev; npm update;)

(cd /tmp/build/gulp_buildTool;
./run.sh build)

echo "Gulp watch ? ";
if [ "$DEPLOYMENT" = "development" ]; then
    (cd /tmp/build/gulp_buildTool;
    ./run.sh watch)
fi

# ⭐ call docker-compose command after entrypoint as they are passed as arguments when entrypoint is set.
exec "$@"
