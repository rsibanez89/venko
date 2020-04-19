#Vars
Region ?= sa-east-1
ContainerPort ?= 3000
ImageTag ?= latest
EcrUri ?= 072908428852.dkr.ecr.sa-east-1.amazonaws.com/venko

build:
	@echo "building docker image..."
	docker build --no-cache -t venko:${ImageTag} .

run:
	@echo "running..."
	docker run -d -p 3000:3000 venko:${ImageTag}

_tagImage:
	@echo "tagging latest built image..."
	docker tag venko:${ImageTag} ${EcrUri}:${ImageTag}

_pushImage:
	@echo "pushing image to ECR..."
	aws ecr get-login --no-include-email --region=${Region}
	docker push ${EcrUri}:${ImageTag}

_publish: | build _tagImage _pushImage

_deploy:
	@echo "deploying ecs stack..."
	aws cloudformation deploy                                                         \
        --template-file ecs.yaml                                                    \
        --stack-name venko-ecs                                                      \
        --capabilities CAPABILITY_NAMED_IAM CAPABILITY_IAM                          \
        --region ${Region}                                                          \
        --no-fail-on-empty-changeset                                                \
        --parameter-overrides                                                       \
            Image=${EcrUri}:${ImageTag}                                             \
            ContainerPort=${ContainerPort}                                          \
        --tags stack="venko"

publishAndDeploy: | _publish _deploy