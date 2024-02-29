import { describe } from "node:test";
import xmlToJson from "../../../src/utils/xml-to-json";

const mockData = `
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

beforeEach(async () => {
});

afterAll(async () => {
    jest.resetAllMocks();
})


describe("parse xml to json", () => {
    it("parsed fx rates xml to json", async () => {
        const jsonData = await xmlToJson(mockData);
        expect(jsonData).toEqual({
            FxRates: {
                $: { xmlns: "http://www.lb.lt/WebServices/FxRates" },
                script: "",
                FxRate: [
                    {
                        Tp: "EU",
                        Dt: "2024-02-23",
                        CcyAmt: [
                            { Ccy: "EUR", Amt: "1" },
                            { Ccy: "AUD", Amt: "1.6467" },
                        ],
                    },
                    {
                        Tp: "EU",
                        Dt: "2024-02-23",
                        CcyAmt: [
                            { Ccy: "EUR", Amt: "1" },
                            { Ccy: "BGN", Amt: "1.9558" },
                        ],
                    },
                ],
            },
        });
    });
});
