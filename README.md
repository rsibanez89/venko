## Venko
https://venko.training/

Venko training provides personalized routines and exercises that are updated every month.

Users have different routines depending on their goals and physical capabilities.

### Examples of routines are:
![Venko strong](./ng-ui/src/assets/images/venko-strong.jpg)
Improve your strength week by week.

![Venko burn](./ng-ui/src/assets/images/venko-burn.jpg)
Burn calories, increase your heart rate and improve your resistance.

![Venko mobility](./ng-ui/src/assets/images/venko-mobility.jpg)
Improve your flexibility and keep healthy joints.

![Venko mobility](./ng-ui/src/assets/images/venko-special.jpg)
Improve your equilibrium and agility.

![Venko running](./ng-ui/src/assets/images/venko-running.jpg)
Specially created for runners.

---

## Installation

```bash
# backend in node
$ yarn install

# frontend in angular
$ cd ng-ui && yarn install
```

## Running the bakend app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running the frontend app

```bash
# change environment.ts if you want to run with local backend
$ cd ng-ui && yarn start
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

# Publish to ECR and Deploy (Retired)
# make publishAndDeployECS ImageTag=$(date +%Y%m%d%H%M%S)

# Deploy database
make _deployDatabase

# Deploy using serverless
make packageAndDeployServerless
```