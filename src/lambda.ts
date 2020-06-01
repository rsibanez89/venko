import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Context } from 'aws-lambda';
import serverlessExpress from 'aws-serverless-express';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let lambdaProxy: Server;

async function bootstrap() {
  const expressServer = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressServer)
  );
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Venko training api 2')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.init();

  return serverlessExpress.createServer(expressServer);
}

const updateEvent = {
	"resource": "/{proxy+}",
	"path": "/update",
	"httpMethod": "GET",
	"headers": {
		"Accept": "*/*"
	},
	"multiValueHeaders": {
		"Accept": [
			"*/*"
		]
	},
	"queryStringParameters": null,
	"multiValueQueryStringParameters": null,
	"pathParameters": {
		"proxy": "update"
	},
	"stageVariables": null,
	"requestContext": {
		"resourceId": "gn68d5",
		"resourcePath": "/{proxy+}",
		"httpMethod": "GET",
		"path": "/update",
		"accountId": "072908428852",
		"protocol": "HTTP/1.1",
		"stage": "venko-stage",
		"domainPrefix": "api"
	},
	"body": null,
	"isBase64Encoded": false
};

export const handler = (event: any, context: Context) => {
  if(event.action === 'update')
  {
    event = updateEvent;
  }
  if (!lambdaProxy) {
    bootstrap().then(server => {
      lambdaProxy = server;
      serverlessExpress.proxy(lambdaProxy, event, context);
    });
  } else {
    serverlessExpress.proxy(lambdaProxy, event, context);
  }
};
