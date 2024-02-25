import console from "console";
import xmlToJson from "./src/utils/xml-to-json";

const data = `
<FxRates xmlns="http://www.lb.lt/WebServices/FxRates">
<script/>
<FxRate>
<Tp>EU</Tp>
<Dt>2024-02-23</Dt>
<CcyAmt>
<Ccy>EUR</Ccy>
<Amt>1</Amt>
</CcyAmt>
<CcyAmt>
<Ccy>AUD</Ccy>
<Amt>1.6467</Amt>
</CcyAmt>
</FxRate>
<FxRate>
<Tp>EU</Tp>
<Dt>2024-02-23</Dt>
<CcyAmt>
<Ccy>EUR</Ccy>
<Amt>1</Amt>
</CcyAmt>
<CcyAmt>
<Ccy>BGN</Ccy>
<Amt>1.9558</Amt>
</CcyAmt>
</FxRate>
</FxRates>
`;
// const a: any = parse(data);
// console.log(a.root?.children[1]);
// async function toJson(xml: string) {
//   return new Promise((resolve, reject) => {
//     parseString(xml, { explicitArray: false }, function (error, result) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }

// const b: any = toJson(data);
// console.log(b.FxRates.FxRate[0].CcyAmt);

async function getData() {
  const response = await fetch('https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates', {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: "tp=EU",
  });
  const xml = await response.text();
  const exchangeRatesJson = (await xmlToJson(xml)) as any;

  const currencies = exchangeRatesJson.FxRates.FxRate.map((rate: any) => {
    const [_, to] = rate.CcyAmt;
    const { Ccy: currency } = to;
    
    return currency
  });

  currencies.push('EUR');
  const uniqueCurrencies = [...new Set(currencies)];
  console.log(uniqueCurrencies);

}

getData().catch(console.log);

