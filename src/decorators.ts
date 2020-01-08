import 'reflect-metadata';
import { APP_CONFIG, DEFAULT_CONFIG_VALUE } from './constants';
import { Inject } from '@nestjs/common';

export const ConfigDefaultValue = (func: Function) => {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(DEFAULT_CONFIG_VALUE, func, target, propertyKey);
  };
};

export const InjectConfig = () => Inject(APP_CONFIG);
