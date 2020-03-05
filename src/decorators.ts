import 'reflect-metadata';
import { APP_CONFIG, DEFAULT_CONFIG_VALUE } from './constants';
import { Inject } from '@nestjs/common';

export const ConfigDefaultValue = (func: Function) => {
  return (target: any, propertyKey: string | symbol) => {
    const previous = Reflect.getMetadata(DEFAULT_CONFIG_VALUE, target) || {};
    Reflect.defineMetadata(DEFAULT_CONFIG_VALUE, Object.assign(previous, { [propertyKey]: func }), target);
  };
};

export const InjectConfig = () => Inject(APP_CONFIG);
