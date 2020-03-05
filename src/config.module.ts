import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_CONFIG, DEFAULT_CONFIG_VALUE } from './constants';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { RegisterConfigOptions } from './interfaces';

@Global()
@Module({})
export class ConfigModule {
  static register(options: RegisterConfigOptions) {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: APP_CONFIG,
          useFactory: () => {
            const schemas = options.schemas || [];
            const envFile = options.envFile || '.env';

            if (fs.existsSync(envFile)) {
              dotenv.config({ path: envFile });
            }
            const config = {};
            for (const schema of schemas) {
              const schemaObject = new schema();
              const defaultFunctions = Reflect.getMetadata(DEFAULT_CONFIG_VALUE, schemaObject) || {};
              const keys = Object.keys(defaultFunctions);
              for (const key of keys) {
                const func = defaultFunctions[key];
                config[key] = func();
              }
            }
            return config;
          },
        },
      ],
      exports: [APP_CONFIG],
    } as DynamicModule;
  }
}
