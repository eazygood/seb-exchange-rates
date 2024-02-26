import { Static, Type } from "@sinclair/typebox";

// interface CcyAmt {
//   Ccy: string;
//   Amt: string;
// }
// interface Rate {
//   Tp: String;
//   Dt: string;
//   CcyAmt: CcyAmt[];
// }

// interface ExternalFxRate {
//   $: { xmlns: string };
//   FxRate: Rate[];
// }
// interface ExternalFxRates {
//   FxRates: ExternalFxRate;
// }

export const CcyAmtSchema = Type.Object({
  Ccy: Type.String(),
  Amt: Type.String(),
})

export const RateSchema = Type.Object({
  Tp: Type.String(),
  Dt: Type.String(),
  CcyAmt: Type.Array(CcyAmtSchema),
})
export type Rate = Static<typeof RateSchema>

export const ExternalFxRateSchema = Type.Object({
  $: Type.Object({ xmlns: Type.String() }),
  FxRate: Type.Array(RateSchema),
})

export const ExternalFxRatesSchemas = Type.Object({
  FxRates: ExternalFxRateSchema
})
export type ExternalFxRates = Static<typeof ExternalFxRatesSchemas>


export const StucturedFxRatesSchema = Type.Object({
  source_currency: Type.String(),
  target_currency: Type.String(),
  source_rate: Type.String(),
  target_rate: Type.String(),
  exchange_date: Type.String(),
});

export type StucturedFxRates = Static<typeof StucturedFxRatesSchema>

export const SourceTargetFxRateMapSchema = Type.Object({
  date: Type.String(),
  source_rate: Type.String(),
  target_rate: Type.String(),
});

export type SourceTargetFxRateData = Static<typeof SourceTargetFxRateMapSchema>;

export const FxRateByDateMapSchema = Type.Record(Type.String(), Type.Array(SourceTargetFxRateMapSchema))
export type FxRateByDateData = Static<typeof FxRateByDateMapSchema>

export const FxRateDataSchemas = Type.Object(Type.String(), FxRateByDateMapSchema)
export type FxRateData = Static<typeof FxRateDataSchemas>

export const FxRatesDbSchema = Type.Object({
  rates: Type.String(Type.Array(StucturedFxRatesSchema)),
  posting_date: Type.String(),
});
export type FxRatesDb = Static<typeof FxRatesDbSchema>;

export const FxRatesJsonSchema = Type.String(FxRateDataSchemas);
export type FxRatesJson = Static<typeof FxRatesJsonSchema>;

export const CalculatedFxRateSchema = Type.Object({
  source_rate: Type.String(),
  target_rate: Type.String(),
  rate: Type.String(),
  amount: Type.String(),
})
export type CalculatedFxRate = Static<typeof CalculatedFxRateSchema>;
