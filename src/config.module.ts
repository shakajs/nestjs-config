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
            return schemas.reduce((previous, schema) => {
              const schemaObject = new schema();
              return Object.keys(schemaObject)
                .filter(key =>
                  Reflect.hasMetadata(DEFAULT_CONFIG_VALUE, schemaObject, key),
                )
                .map(key => {
                  const func = Reflect.getMetadata(
                    DEFAULT_CONFIG_VALUE,
                    schemaObject,
                    key,
                  );
                  previous[key] = func();
                  return previous;
                });
            }, {});
          },
        },
      ],
      exports: [APP_CONFIG],
    } as DynamicModule;
  }
}
