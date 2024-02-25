import {
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RouteGenericInterface,
    RouteOptions,
  } from "fastify";

export type Route<Types extends RouteGenericInterface> = RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  Types
>;