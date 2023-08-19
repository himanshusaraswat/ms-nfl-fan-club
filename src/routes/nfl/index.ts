import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { ObjectId } from "@fastify/mongodb";

interface Records {
  items: any;
  count: number;
}
const example: FastifyPluginAsync = async (fastify: any): Promise<void> => {
  fastify
    .register(require("fastify-pagination"))
    .get("/headshots", async function (request: any, reply: any) {
      const { limit, offset } = request.parsePagination();
      const { items, count } = await getItemsAndTotalCountWithPagination(
        fastify,
        limit,
        offset
      );
      reply.sendWithPagination({ count, page: items });
    });
  fastify.get(
    "/headshots/gameResult",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { name, id }: any = request.query;
      const result = await findById(fastify, id);
      reply.send(result.Name.toLowerCase() === name.toLowerCase());
    }
  );
};

const getItemsAndTotalCountWithPagination = async (
  fastify: any,
  limit: number,
  offset: number
): Promise<Records> => {
  const totalCount = await fastify.mongo.db.collection("nfl-headshot").count();
  const result = await fastify.mongo.db
    .collection("nfl-headshot")
    .find()
    .skip(offset)
    .limit(limit)
    .toArray();

  return {
    items: result,
    count: totalCount,
  };
};

const findById = async (fastify: any, id: string) => {
  return await fastify.mongo.db
    .collection("nfl-headshot")
    .findOne({ _id: new ObjectId(id) });
};
export default example;
