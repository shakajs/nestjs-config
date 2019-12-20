import 'reflect-metadata';
import { DEFAULT_CONFIG_VALUE } from './constants';

export function ConfigDefaultValue(func: Function) {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(DEFAULT_CONFIG_VALUE, func, target, propertyKey);
  };
}
