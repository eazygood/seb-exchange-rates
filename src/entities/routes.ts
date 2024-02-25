import { Type, Static } from "@sinclair/typebox";
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

export const SeedFxRatesByDateSchema = Type.Object({
  date: Type.String(),
});

export type SeedFxRatesByDateQuery = Static<typeof SeedFxRatesByDateSchema>;
