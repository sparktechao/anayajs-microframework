"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
exports.applyRoutes = applyRoutes;
require("reflect-metadata");
const express_1 = require("express");
const useMiddleware_1 = require("./useMiddleware");
const router = (0, express_1.Router)();
const ROUTES_KEY = 'routes';
function createRouteDecorator(method) {
    return function (path, ...middlewares) {
        return function (target, propertyKey) {
            if (!Reflect.hasMetadata(ROUTES_KEY, target.constructor)) {
                Reflect.defineMetadata(ROUTES_KEY, [], target.constructor);
            }
            const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor);
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
function createRouteHandler(instance, handlerName) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const middlewares = (0, useMiddleware_1.getMiddlewares)(instance, handlerName);
                let returnValue;
                for (const middleware of middlewares) {
                    yield new Promise((resolve, reject) => {
                        middleware(req, res, (err) => {
                            if (err)
                                reject(err);
                            else
                                resolve();
                        });
                    });
                }
                returnValue = yield instance[handlerName](req, res, next);
                if (returnValue !== undefined && res.headersSent === false) {
                    res.json(returnValue);
                }
            }
            catch (error) {
                next(error);
            }
        });
    };
}
exports.Get = createRouteDecorator('get');
exports.Post = createRouteDecorator('post');
exports.Put = createRouteDecorator('put');
exports.Delete = createRouteDecorator('delete');
exports.Patch = createRouteDecorator('patch');
function applyRoutes(controllerClass) {
    const instance = new controllerClass();
    const routes = Reflect.getMetadata(ROUTES_KEY, controllerClass);
    routes.forEach(route => {
        const routeHandler = createRouteHandler(instance, route.handlerName);
        router[route.method](route.path, ...route.middlewares, routeHandler);
    });
    return router;
}
