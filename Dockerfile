FROM node:16.13.1 as build-deps

RUN _="Production Docker File" && echo $_

WORKDIR /usr/app
COPY package.json package-lock.json ./
ADD . ./

RUN npm  install 
RUN npm run build

FROM node:16-alpine3.14

WORKDIR /gistfinder
COPY --from=build-deps /usr/app/node_modules /gistfinder/node_modules
COPY --from=build-deps /usr/app/package.json  /gistfinder/package.json
COPY --from=build-deps /usr/app/package-lock.json /gistfinder/package-lock.json
COPY --from=build-deps /usr/app/tsconfig.build.json  /gistfinder/tsconfig.build.json
COPY --from=build-deps /usr/app/dist /gistfinder/dist

COPY env  /gistfinder/env

EXPOSE 8080

CMD ["yarn","start"]
