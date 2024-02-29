import { Route } from "../../entities";

export const healtCheck: Route<{}> = {
  method: "GET",
  url: "/health",
  schema: {},
  async handler(req, reply) {
    reply.code(200).send({ status: "ok" });
  },
};
