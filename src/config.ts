import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';

// Read .env file
dotenv.config();

// Validate .env file
const configSchema = Joi.object({
  PORT: Joi.number().default(3000),
  AWS_REGION: Joi.string().default('sa-east-1'),
  AUTH0_DOMAIN: Joi.string().default('https://venko.auth0.com/'),
  AUTH0_AUDIENCE: Joi.string().default('https://venko.auth0.com/api/v2/'),
  JWT_SECRET: Joi.string().default('secretKey'),
  DYNAMODB_USERS_TABLE_NAME: Joi.string().default('venko-users-registry'),
})
  .unknown()
  .required();

const { error, value } = configSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Export configs
const config = {
  port: value.PORT,
  awsRegion: value.AWS_REGION,
  auth0Domain: value.AUTH0_DOMAIN,
  auth0Audience: value.AUTH0_AUDIENCE,
  secretKey: value.JWT_SECRET,
  usersTableName: value.DYNAMODB_USERS_TABLE_NAME,
};
export default config;
