## Venko
Venko training web server: https://venko.training/

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Docker build, publish and deploy
```bash
# build image
make build

# run
make run

# Publish to ECR and Deploy
make publishAndDeployECS ImageTag=$(date +%Y%m%d%H%M%S)

# Deploy using serverless
make packageAndDeployServerless
```