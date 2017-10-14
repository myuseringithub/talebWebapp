#!/usr/bin/env bash
projectPath="/project"
dependencyPath="$projectPath/dependency"
applicationPath="$projectPath/application"

production.stack() {
    # 1.
    docker-machine ssh $VM-1
    VolumeBasePath=/mnt/datadisk-1/taleb
    sudo mkdir -p $VolumeBasePath/rethinkdbData
    
    # 2. Add raw Github reverse proxy file to Redbird proxy.

    # 3.
    export DEPLOYMENT=production
    docker stack deploy -c ./setup/container/production.dockerStack.yml talebwebapp
}

development() {
    # DOESN'T WORK
    # fix issue caused by virtualbox & Windows apparently that don't support sync directory - https://forums.docker.com/t/issues-with-rethinkdb-example-using-volumes/13720/4
    # Download exe and run exe - https://www.rethinkdb.com/docs/install/windows/
    # grab the files created in new directory to the volume that will be mounted to the container.

    # 1. Hosts local development environment
    # http://serverfault.com/questions/115282/can-i-configure-the-windows-hosts-file-to-use-ip-address-plus-port
    # map 'cdn.localhost' & 'api.localhost' to localhost:8081 & localhost:8082 respectively
    # Using Fiddler (because hosts file doesn't support mapping to ports.) in Tool -> HOSTS:
    # localhost:8081      cdn.localhost
    # localhost:8082      api.localhost

    # 2. connect to VM
    VM=machine
    eval $(docker-machine env $VM)

    # 3. 
    export DEPLOYMENT=development
    docker-compose -f ./setup/container/development.dockerCompose.yml up -d --force-recreate

    # 4. Run services using gulp inside container
    VM=machine
    docker-machine ssh $VM
    dockerContainerID=""
    docker exec -it $dockerContainerID bash
    (cd $applicationPath/setup/build/gulp_buildTool/; ./run.sh developmentharmonybabel)
}

deployment.buildDistribution() { # ⭐
    # development / production
    export DEPLOYMENT=production
    docker-compose -f ./setup/container/deployment.dockerCompose.yml up buildDistributionCode
}

deployment.buildImage() { # ⭐
    # 1. development / production
    export DEPLOYMENT=production
    # export DEPLOYMENT=development
    # export COMPOSE_PROJECT_NAME= # Not needed as name is taken from image field.

    # 2. Build Source COde:
    ./setup/run.sh deployment.buildDistribution

    # 3.
    # Problem cannot pass arguments to dockerfile
    docker-compose -f ./setup/container/deployment.dockerCompose.yml build --no-cache buildImage

    # 4. tag image and push
}

# Important: call arguments verbatim. i.e. allows first argument to call functions inside file. So that it could be called as "./setup/run.sh <functionName>".
$@
