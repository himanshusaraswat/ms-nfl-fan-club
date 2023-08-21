"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.app = void 0;
const path_1 = require("path");
const autoload_1 = require("@fastify/autoload");
const helmet_1 = require("@fastify/helmet");
const cors_1 = require("@fastify/cors");
const options = {};
exports.options = options;
const app = async (fastify, opts) => {
    fastify.register(helmet_1.default, { global: true });
    fastify.register(cors_1.default, {
        origin: ["http://localhost:4200", "https://devmeraki.com", "www.devmeraki.com"],
        methods: ["GET"],
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "plugins"),
        options: opts,
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "routes"),
        options: opts,
    });
};
exports.app = app;
exports.default = app;
//# sourceMappingURL=app.js.map