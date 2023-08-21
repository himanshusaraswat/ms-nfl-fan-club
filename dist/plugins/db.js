"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const mongodb_1 = require("@fastify/mongodb");
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.register(mongodb_1.fastifyMongodb, {
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l7v9qsp.mongodb.net/?retryWrites=true&w=majority`,
        forceClose: true,
        database: process.env.DB_NAME,
    });
});
//# sourceMappingURL=db.js.map