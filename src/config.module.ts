import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_CONFIG, DEFAULT_CONFIG_VALUE } from './constants';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

@Global()
@Module({})
export class ConfigModule {
  static register(...schemas: Array<{ new (): any }>) {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: APP_CONFIG,
          useFactory: () => {
            if (fs.existsSync('.env')) {
              dotenv.config();
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
