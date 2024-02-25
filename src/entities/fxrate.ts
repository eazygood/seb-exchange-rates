import { Static, Type } from "@sinclair/typebox";

// export const FxRatesSchema = Type.Object({
//   rates: Type.String(
//     Type.Array(
//       Type.Object({
//         source_currency: Type.String(),
//         target_currency: Type.String(),
//         source_rate: Type.String(),
//         target_rate: Type.String(),
//         exchange_date: Type.String(),
//       })
//     )
//   ),
//   posting_date: Type.String(),
// });



// export const FxRatesDbSchema = Type.Object({
//   rates: Type.Object({
//     source_currency: Type.String(),
//     target_currency: Type.String(),
//     source_rate: Type.String(),
//     target_rate: Type.String(),
//     exchange_date: Type.String(),
//   }),
//   posting_date: Type.String(),
// });

// export type FxRatesDb = Static<typeof FxRatesDbSchema>;

export const StucturedFxRatesSchema = Type.Object({
  source_currency: Type.String(),
  target_currency: Type.String(),
  source_rate: Type.String(),
  target_rate: Type.String(),
  exchange_date: Type.String(),
});

export type StucturedFxRates = Static<typeof StucturedFxRatesSchema>

export const SourceTargetCurrencyMapSchema = Type.Object({
  source_value: Type.String(),
  target_value: Type.String(),
});

export type SourceTargetCurrencyMap = Static<typeof SourceTargetCurrencyMapSchema>;

export const CurrencyByDateMapSchema = Type.Object(Type.String(), SourceTargetCurrencyMapSchema)
export type CurrencyByDateMap = Static<typeof CurrencyByDateMapSchema>

export const CurrencyDataSchemas = Type.Object(Type.String(), CurrencyByDateMapSchema)
export type CurrencyData = Static<typeof CurrencyDataSchemas>

export const FxRatesDbSchema = Type.Object({
  rates: Type.String(CurrencyDataSchemas),
  posting_date: Type.String(),
});
export type FxRatesDb = Static<typeof FxRatesDbSchema>;

export const FxRatesJsonSchema =  Type.String(CurrencyDataSchemas);
export type FxRatesJson = Static<typeof FxRatesJsonSchema>;


// interface MapItem {
//   source_value: string;
//   target_value: string;
// }

// interface CurrencyData {
//   [date: string]: {
//       source_value: string;
//       target_value: string;
//   };
// }

// interface CurrencyMap {
//   [currency: string]: CurrencyData;
// }
