FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install app dependencies
COPY package.json package-lock.json /usr/app/

RUN apk add --no-cache --virtual .gyp python make g++ \
    && apk add --no-cache --virtual builds-deps build-base \
    && npm install --only=production

# Bundle app source
COPY index.js /usr/app/

EXPOSE 3000

CMD ["node","-r","esm","./index.js"]
