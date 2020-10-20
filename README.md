![CD](https://github.com/fptu-cms/front-end/workflows/CD/badge.svg)
[![DeepSource](https://deepsource.io/gh/fptu-cms/front-end.svg/?label=resolved+issues&show_trend=true)](https://deepsource.io/gh/fptu-cms/front-end/?ref=repository-badge)

# Duy's React Starter Kit

This project was based on [Create React App](https://github.com/facebook/create-react-app). [(3.4.3 (2020-08-12))](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md)

## Configure

`cp .env.example .env && vi .env`

## Development

With docker: `docker-compose up --build -d`

Without docker: `yarn start`

Configure in `docker-compose.yml` file, default running on port `3000`

Running test: `yarn test`

Debugging tests: `yarn test:debug`

Reinstall entire project: `yarn refresh`

Lint code: `yarn lint:code`

Lint style : `yarn lint:style`

Fix code: `yarn fix:code`

Fix style: `yarn fix:style`

## Production

Build image: `sudo docker build -t front-end .`

Run container: `sudo docker run -dit -p 3000:80 --name front-end front-end:latest`

Kill and remove: `(sudo docker kill front-end || true) && (sudo docker rm front-end || true)`

Without docker: `yarn build`, output is located at `/build`

Analyze output: `yarn analyze`

## Todo

- Typescript
- Redux + Class component
- Unstated + Functional component + Hooks
- Xstate?
- GraphQL - Relay/Apollo
- Eject/Config Webpack - Server-Side rendering
- Config PWA - workbox/firebase
