"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("@fastify/mongodb");
const example = async (fastify) => {
    fastify
        .register(require('fastify-pagination'))
        .get('/headshots', async function (request, reply) {
        const { limit, offset } = request.parsePagination();
        const { items, count } = await getItemsAndTotalCountWithPagination(fastify, limit, offset);
        reply.sendWithPagination({ count, page: items });
    });
    fastify
        .get('/headshots/gameResult', async function (request, reply) {
        const { name, id } = request.query;
        const result = await findById(fastify, id);
        reply.send(result.Name.toLowerCase() === name.toLowerCase());
    });
};
const getItemsAndTotalCountWithPagination = async (fastify, limit, offset) => {
    const totalCount = await fastify.mongo.db.collection('nfl-headshot').count();
    const result = await fastify.mongo.db.collection('nfl-headshot')
        .find()
        .skip(offset)
        .limit(limit)
        .toArray();
    return {
        items: result,
        count: totalCount
    };
};
const findById = async (fastify, id) => {
    return await fastify.mongo.db.collection('nfl-headshot').findOne({ _id: new mongodb_1.ObjectId(id) });
};
exports.default = example;
//# sourceMappingURL=index.js.map