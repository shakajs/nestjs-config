import 'reflect-metadata';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DEFAULT_CONFIG_VALUE } from './constants';

export class ConfigService<T extends object> {
  config: T = {} as any;

  load(...schemas: Array<{ new (): any }>) {
    this.loadFile();
    const config = {};

    for (const schema of schemas) {
      const schemaObject = new schema();
      for (const key of Object.keys(schemaObject)) {
        if (Reflect.hasMetadata(DEFAULT_CONFIG_VALUE, schemaObject, key)) {
          const func = Reflect.getMetadata(
            DEFAULT_CONFIG_VALUE,
            schemaObject,
            key,
          );
          config[key] = func();
        }
      }
    }
    this.config = Object.assign(this.config, config);
  }

  loadFile() {
    if (fs.existsSync('.env')) {
      dotenv.config();
    }
  }
}
