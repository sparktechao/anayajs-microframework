"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMiddleware = UseMiddleware;
exports.getMiddlewares = getMiddlewares;
require("reflect-metadata");
const MIDDLEWARES_KEY = 'middlewares';
function UseMiddleware(...middlewares) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(MIDDLEWARES_KEY, middlewares, target, propertyKey);
    };
}
function getMiddlewares(target, propertyKey) {
    return Reflect.getMetadata(MIDDLEWARES_KEY, target, propertyKey) || [];
}
