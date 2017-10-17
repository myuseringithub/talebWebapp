FROM node:8.5.0

# Environment Variables & Arguments
# default value is override if build argument is specified in docker compose.
ARG DEPLOYMENT=production
ENV DEPLOYMENT ${DEPLOYMENT}

COPY ./distribution /project/application/distribution/

WORKDIR /project/application/distribution/serverSide
ENTRYPOINT ./entrypoint.sh production