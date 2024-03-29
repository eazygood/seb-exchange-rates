import { Type, Static, TSchema } from "@sinclair/typebox";
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

export const Nullable = <T extends TSchema>(type: T) => Type.Union([type, Type.Null()]);

export const SeedFxRatesByDateSchema = Nullable(Type.Optional(Type.Object({
  date: Type.String(),
})));
export type SeedFxRatesByDateQuery = Static<typeof SeedFxRatesByDateSchema>;

export const ExchangeRateCurrencyParamSchema = Type.Object({
  currency: Type.String(),
})
export type ExchangeRateCurrencyParam = Static<typeof ExchangeRateCurrencyParamSchema>;

export const ExchangeRatesQuerySchema = Type.Optional(Type.Object({
  latest: Type.Optional(Type.Boolean()),
}));
export type ExchangeRatesQuery = Static<typeof ExchangeRatesQuerySchema>;