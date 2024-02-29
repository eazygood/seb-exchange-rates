import { parseString } from "xml2js";

export default async (xml: string) => {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false }, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
