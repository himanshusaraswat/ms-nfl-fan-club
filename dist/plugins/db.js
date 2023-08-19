"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const mongodb_1 = require("@fastify/mongodb");
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.register(mongodb_1.fastifyMongodb, {
        url: `mongodb+srv://prj-dev-meraki-gallery-read:lnnqCFZ5BhodoA8Z@cluster0.l7v9qsp.mongodb.net/?retryWrites=true&w=majority`,
        forceClose: true,
        database: "prj-dev-gallery"
    });
});
//# sourceMappingURL=db.js.map