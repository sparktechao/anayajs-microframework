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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const logger_1 = __importDefault(require("../common/utils/logger"));
const db_1 = require("../common/config/db");
const prismaService_1 = __importDefault(require("../common/services/prismaService"));
const tsyringe_1 = require("tsyringe");
exports.default = (_a) => __awaiter(void 0, [_a], void 0, function* ({ expressApp }) {
    yield (0, db_1.connectDB)();
    logger_1.default.info('✌️ DB loaded and connected!');
    tsyringe_1.container.registerInstance(prismaService_1.default, new prismaService_1.default());
    logger_1.default.info('✌️ Dependency Injector loaded');
    yield (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
});
