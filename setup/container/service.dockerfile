FROM node:latest

# Environment Variables & Arguments
# default value is override if build argument is specified in docker compose.
ARG DEPLOYMENT=production
ENV DEPLOYMENT ${DEPLOYMENT}

COPY ./distribution /app/

WORKDIR /app/serverSide
ENTRYPOINT ./run.sh production