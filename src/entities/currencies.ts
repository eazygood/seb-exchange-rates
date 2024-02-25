import { Type, Static } from "@sinclair/typebox";

export const CurrencySchema = Type.String();

export type Currency = Static<typeof CurrencySchema>;
