#!/usr/bin/env bash

currentRelativeFilePath=$(dirname "$0")
echo host path: `pwd`/$currentRelativeFilePath/..
# pwd - current working directory in host machine.
# currentRelativeFilePath - path relative to where shell was executed from.
# hostPath - will be used when calling docker-compose from inside 'manager' container to point to the host VM path rather than trying to mount from manager container. as mounting volumes from other container causes issues.
docker run \
    --volume `pwd`/$currentRelativeFilePath/..:/project/application \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --env "hostPath=`pwd`" \
    myuserindocker/deployment-environment:latest \
    containerCommand "$@"
