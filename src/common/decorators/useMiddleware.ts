import { RequestHandler } from 'express';
import 'reflect-metadata';

const MIDDLEWARES_KEY = 'middlewares';

export function UseMiddleware(...middlewares: RequestHandler[]): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(MIDDLEWARES_KEY, middlewares, target, propertyKey);
  };
}

export function getMiddlewares(target: any, propertyKey: string | symbol): RequestHandler[] {
  return Reflect.getMetadata(MIDDLEWARES_KEY, target, propertyKey) || [];
}
