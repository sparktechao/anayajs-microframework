"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("../common/config/config"));
const swagger_1 = __importDefault(require("./swagger"));
const errorHandler_1 = require("../common/middlewares/errorHandler");
const authRoutes_1 = __importDefault(require("../modules/auth/routes/authRoutes"));
const userRoutes_1 = __importDefault(require("../modules/user/routes/userRoutes"));
exports.default = ({ app }) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    app.enable('trust proxy');
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(require('method-override')());
    app.use(express_1.default.json());
    app.use(config_1.default.api.prefix + '/auth', authRoutes_1.default);
    app.use(config_1.default.api.prefix + '/users', userRoutes_1.default);
    (0, swagger_1.default)(app);
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    app.use(errorHandler_1.errorHandler);
};
