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

export const ExchangeRateCurrencyParamSchema = Type.Object({
  currency: Type.String(),
})
export type ExchangeRateCurrencyParam = Static<typeof ExchangeRateCurrencyParamSchema>;

export const ExchnageRateCalculationBodySchema = Type.Object({
  source_currency: Type.String(),
  target_currency: Type.String(),
  amount: Type.String(),
});
export type ExchnageRateCalculationBody = Static<typeof ExchnageRateCalculationBodySchema>;

export const ExchangeRatesQuerySchema = Type.Optional(Type.Object({
  latest: Type.Optional(Type.Boolean()),
}));
export type ExchangeRatesQuery = Static<typeof ExchangeRatesQuerySchema>;