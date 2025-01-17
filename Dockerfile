FROM node:22.13.0-alpine

ENV NODE_ENV=development

WORKDIR /usr/src/app

RUN apk --no-cache add 'git~=2.47.2' && apk --no-cache add 'openssh-client~=9.9'
