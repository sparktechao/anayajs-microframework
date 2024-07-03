import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { getMiddlewares } from './useMiddleware';


const router = Router();
const ROUTES_KEY = 'routes';

interface RouteDefinition {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>;
  handlerName: string;
}

function createRouteDecorator(method: 'get' | 'post' | 'put' | 'delete' | 'patch') {
  return function (path: string, ...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>) {
    return function (target: any, propertyKey: string) {
      if (!Reflect.hasMetadata(ROUTES_KEY, target.constructor)) {
        Reflect.defineMetadata(ROUTES_KEY, [], target.constructor);
      }

      const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) as RouteDefinition[];

      routes.push({
        method,
        path,
        middlewares,
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
    };
  };
}

function createRouteHandler(instance: any, handlerName: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const middlewares = getMiddlewares(instance, handlerName);
      let returnValue: any;

      for (const middleware of middlewares) {
        await new Promise<void>((resolve, reject) => {
          middleware(req, res, (err: any) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }

      returnValue = await instance[handlerName](req, res, next);

      if (returnValue !== undefined && res.headersSent === false) {
        res.json(returnValue);
      }
    } catch (error) {
      next(error);
    }
  };
}

export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');
export const Patch = createRouteDecorator('patch');

export function applyRoutes(controllerClass: any) {
  const instance = new controllerClass();
  const routes = Reflect.getMetadata(ROUTES_KEY, controllerClass) as RouteDefinition[];

  routes.forEach(route => {
    const routeHandler = createRouteHandler(instance, route.handlerName);
    router[route.method](route.path, ...route.middlewares, routeHandler);
  });

  return router;
}