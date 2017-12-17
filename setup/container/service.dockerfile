FROM node:9.3.0 

# Environment Variables & Arguments
# default value is override if build argument is specified in docker compose.
ARG DEPLOYMENT=production
ENV DEPLOYMENT ${DEPLOYMENT}

COPY ./distribution /project/application/

WORKDIR /project/application/serverSide
ENTRYPOINT ./entrypoint.sh run