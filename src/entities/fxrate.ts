import { Static, Type } from "@sinclair/typebox";

export const FxRatesSchema = Type.Object({
  rates: Type.String(
    Type.Array(
      Type.Object({
        source_currency: Type.String(),
        target_currency: Type.String(),
        source_rate: Type.String(),
        target_rate: Type.String(),
        exchange_date: Type.String(),
      })
    )
  ),
  posting_date: Type.String(),
});

export type FxRates = Static<typeof FxRatesSchema>;

export const FxRatesJsonSchema = Type.Object({
  rates: Type.Object({
    source_currency: Type.String(),
    target_currency: Type.String(),
    source_rate: Type.String(),
    target_rate: Type.String(),
    exchange_date: Type.String(),
  }),
  posting_date: Type.String(),
});

export type FxRatesJson = Static<typeof FxRatesJsonSchema>;
