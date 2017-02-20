#!/usr/bin/env bash

production() {

    # 1.
    docker-machine ssh $VM-1
    VolumeBasePath=/mnt/datadisk-1/rethinkdb
    sudo mkdir -p $VolumeBasePath/rethinkdbData

    # 2.
    docker stack deploy -c ./setup/container/production.dockerStack.yml mobta3athWebapp
}

development() {

    # DOESN'T WORK
    # fix issue caused by virtualbox & Windows apparently that don't support sync directory - https://forums.docker.com/t/issues-with-rethinkdb-example-using-volumes/13720/4
    # Download exe and run exe - https://www.rethinkdb.com/docs/install/windows/
    # grab the files created in new directory to the volume that will be mounted to the container.

    # . 
    export DEPLOYMENT=development
    docker-compose -f ./setup/container/development.dockerCompose.yml up -d 
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@
