#Vars
Region ?= sa-east-1
ContainerPort ?= 3000
ImageTag ?= latest
EcrUri ?= 072908428852.dkr.ecr.sa-east-1.amazonaws.com/venko
S3Bucket ?= venko

build:
	@echo "building docker image..."
	docker build --no-cache -t venko:${ImageTag} .

run:
	@echo "running..."
	docker run -d -p 3000:3000 venko:${ImageTag}

# -------- ECS Infraestructure --------
_tagImage:
	@echo "tagging latest built image..."
	docker tag venko:${ImageTag} ${EcrUri}:${ImageTag}

_pushImage:
	@echo "pushing image to ECR..."
	aws ecr get-login --no-include-email --region=${Region}
	docker push ${EcrUri}:${ImageTag}

_publish: | build _tagImage _pushImage

_deployECS:
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

publishAndDeployECS: | _publish _deployECS
# -------- -------------- --------

# -------- Lambda Infraestructure --------
_buildLocal:
	yarn build
	yarn build-dependency

_package:
	@echo "packaging serverless stack"
	aws cloudformation package                                                        \
	--template lambda.yaml                                                            \
	--s3-bucket ${S3Bucket}                                                           \
	--s3-prefix deployments                                                           \
	--output-template packaged-lambda.yaml                                            \
	--region ${Region}

_deployServerless:
	@echo "deploying serverless stack"
	aws cloudformation deploy                                                         \
		--template-file packaged-lambda.yaml                                            \
		--stack-name venko-serverless                                                   \
		--region ${Region}                                                              \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM                              \
		--tags stack="venko-serverless"

packageAndDeployServerless: | _buildLocal _package _deployServerless
# -------- -------------- --------