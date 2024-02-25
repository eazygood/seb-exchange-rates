import console from "console";
import xmlToJson from "./src/utils/xml-to-json";
import _ from "lodash";

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
  const response = await fetch(
    // "https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates",
    "https://www.lb.lt/webservices/FxRates/FxRates.asmx/getFxRates",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: "tp=EU&dt=2024-01-02",
    }
  );
  const xml = await response.text();
  const exchangeRatesJson = (await xmlToJson(xml)) as any;

  const currencies = exchangeRatesJson.FxRates.FxRate.map((rate: any) => {
    console.log(rate);
    const [_, to] = rate.CcyAmt;
    const { Ccy: currency } = to;

    return currency;
  });

  // currencies.push("EUR");
  // const uniqueCurrencies = [...new Set(currencies)];
  // // console.log(uniqueCurrencies);
}
// fetch("https://www.lb.lt/webservices/FxRates/FxRates.asmx/getFxRates", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//     "cache-control": "max-age=0",
//     "content-type": "application/x-www-form-urlencoded",
//     "sec-ch-ua": "\"Chromium\";v=\"121\", \"Not A(Brand\";v=\"99\"",
//     "sec-ch-ua-arch": "\"arm\"",
//     "sec-ch-ua-bitness": "\"64\"",
//     "sec-ch-ua-full-version": "\"121.0.6167.160\"",
//     "sec-ch-ua-full-version-list": "\"Chromium\";v=\"121.0.6167.160\", \"Not A(Brand\";v=\"99.0.0.0\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-model": "\"\"",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-ch-ua-platform-version": "\"14.3.1\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1"
//   },
//   "referrer": "https://www.lb.lt/webservices/FxRates/FxRates.asmx?op=getFxRates",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "tp=EU&dt=2024-01-02",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

// getData().catch(console.log);

const structure = [
  {
    RUB: [
      {
        date: "1",
        source_value: "ok",
        target_value: "",
      },
    ],
    JPY: [
      {
        date: "",
        source_value: "",
        target_value: "",
      },
    ],
  },
  {
    RUB: [
      {
        date: "2",
        source_value: "ok",
        target_value: "",
      },
    ],
    JPY: [
      {
        date: "",
        source_value: "",
        target_value: "",
      },
    ],
  },
];

const data2 = [
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2024-01-30",
  },
  {
    source_currency: "EUR",
    target_currency: "SAR",
    source_rate: "1",
    target_rate: "4.067360",
    exchange_date: "2024-01-29",
  },
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2024-01-28",
  },
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2024-01-27",
  },
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2024-01-20",
  },
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2023-01-20",
  },
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2023-01-20",
  },
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2023-01-20",
  },
  {
    source_currency: "EUR",
    target_currency: "RSD",
    source_rate: "1",
    target_rate: "117.201880",
    exchange_date: "2023-01-20",
  },
];

interface CurrencyItem {
  date: string;
  source_value: string;
  target_value: string;
}

interface CurrencyData {
  [currency: string]: CurrencyItem[];
}

interface DataStructure {
  [currency: string]: CurrencyData;
}
interface MapItem {
  source_value: string;
  target_value: string;
}

interface Data {
  target_currency: string;
  source_rate: string;
  target_rate: string;
  exchange_date: string;
  source_currency: string;
}

function transformData(data: any[]): { [currency: string]: any } {
  // Group the data by target_currency
  const groupedData  = _.groupBy(data, 'target_currency');
  console.log(groupedData);

  // Map over the grouped data and transform each group
  const transformedData = _.mapValues(groupedData, (group) => {
      // Remove duplicates based on exchange_date
      const uniqueGroup = _.uniqBy(group, 'exchange_date');

      // Transform the group into the desired format
      return _.map(uniqueGroup, (item) => ({
          date: item.exchange_date,
          source_rate: item.source_rate,
          target_rate: item.target_rate
      }));
  });

  console.log(transformedData);

  return transformedData;
}

transformData(data2)

function test(): any[] {
  const data = data2.reduce(
    (acc: Map<string, Map<string, MapItem>>, curr: Data) => {
      const rate = acc.get(curr.target_currency);
      const d = {
        source_value: curr.source_rate,
        target_value: curr.target_rate,
      };

      if (!rate) {
        const m = new Map();
        m.set(curr.exchange_date, d);
        acc.set(curr.target_currency, m);
        // console.log(acc);

        return acc;
      }

      if (!rate.has(curr.exchange_date)) {
        rate.set(curr.exchange_date, d);

        return acc;
      }

      return acc;
    },
    new Map<string, Map<string, MapItem>>()
  );

  return [mapToObject(data)];
}

function mapToObject<T, K, R>(map: Map<T, K>): R {
  const obj: any = {};
  for (const [key, value] of map.entries()) {
    obj[key] = value instanceof Map ? mapToObject(value) : value;
  }
  return obj;
}

const data3 = [
  {
    RSD: { "2024-01-30": { source_value: "1", target_value: "117.201880" } },
    SAR: { "2024-01-29": { source_value: "1", target_value: "4.067360" } },
  },
  {
    RSD: { "2024-01-29": { source_value: "1", target_value: "117.201880" } },
    SAR: { "2024-01-28": { source_value: "1", target_value: "4.067360" } },
  },
  {
    RSD: { "2024-01-29": { source_value: "1", target_value: "117.201880" } },
    SAR: { "2024-01-28": { source_value: "1", target_value: "4.067360" } },
  },
  {
    RSD: { "2024-01-29": { source_value: "1", target_value: "118.201880" } },
    SAR: { "2024-01-28": { source_value: "1", target_value: "4.067360" } },
  },

  {
    RSD: { "2024-01-20": { source_value: "1", target_value: "118.201880" } },
    SAR: { "2024-01-20": { source_value: "1", target_value: "4.067360" } },
  },
];

// test();

type CurrencyMap = Map<string, Map<string, CurrencyData>>;

/*
{
  RSD: {
    '2024-01-30': { source_value: '1', target_value: '117.201880' },
    '2024-01-29': { source_value: '1', target_value: '117.201880' },
    '2024-01-27': { source_value: '1', target_value: '117.201880' }
  },
  SAR: {
    '2024-01-29': { source_value: '1', target_value: '4.067360' },
    '2024-01-28': { source_value: '1', target_value: '4.067360' }
  }
*/
function processData(data: any[]): CurrencyMap {
  const result: any = {};

  data.forEach((obj) => {
    Object.entries(obj).forEach(([currency, currencyData]: [string, any]) => {
      if (!result[currency]) {
        result[currency] = [];
      }
      Object.entries(currencyData).forEach(([date, values]: [string, any]) => {
        const existingData = result[currency].find((existing: any) =>
          _.isEqual(existing[date], values)
        );
        if (!existingData) {
          // If date doesn't exist, push it to the array
          result[currency].push({ [date]: values });
        }
        // if (result[currency][date]) {
        //   return result;
        // }

        // result[currency][date] = values;
      });
    });
  });

  // const dataArray = _.map(result, (currencyData, currency) => ({
  //   [currency]: _.sortBy(
  //     _.map(currencyData, (values, date) => ({ [date]: values })),
  //     (obj) => Object.keys(obj)[0]
  //   ),
  // }));

  // console.log(JSON.stringify(dataArray));
  console.log(JSON.stringify(result));

  return result;
}

// processData(test());
// function mapToObject(map: Map<any, any>): any {
//   const obj: any = {};
//   for (const [key, value] of map.entries()) {
//       obj[key] = value instanceof Map ? mapToObject(value) : value;
//   }
//   return obj;
// }

/*
test Map(2) {
  'RSD' => Map(3) {
    '2024-01-30' => { source_value: '1', target_value: '117.201880' },
    '2024-01-28' => { source_value: '1', target_value: '117.201880' },
    '2024-01-27' => { source_value: '1', target_value: '117.201880' }
  },
  'SAR' => Map(1) {
    '2024-01-29' => { source_value: '1', target_value: '4.067360' }
  }
}
*/
