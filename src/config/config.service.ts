import * as dotenv from "dotenv";
import * as Joi from "joi";
import { Injectable } from "@nestjs/common";
import { ConfigInterface } from "./interface/config.interface";

@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigInterface;
  constructor() {
    dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` });
    const config: { [name: string]: string } = process.env;
    const parsedConfig = JSON.parse(JSON.stringify(config));
    this.envConfig = this.validateInput(parsedConfig);
  }

  private validateInput = (envConfig): ConfigInterface => {
    const envVarSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .required()
        .valid(
          "development",
          "production",
          "staging",
          "provision",
          "inspection"
        )
        .default("development"),
      PORT: Joi.number().required(),
    });

    const { error, value: validatedEnvConfig } = envVarSchema.validate(
      envConfig,
      {
        abortEarly: false,
        allowUnknown: true,
      }
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  };

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get USERNAME(): string {
    return this.envConfig.USERNAME;
  }

  get PASSWORD(): string {
    return this.envConfig.PASSWORD;
  }

  get port(): string {
    return this.envConfig.PORT;
  }

  get REDIS_PORT(): string {
    return this.envConfig.REDIS_PORT;
  }

  get REDIS_HOST(): string {
    return this.envConfig.REDIS_HOST;
  }
}
