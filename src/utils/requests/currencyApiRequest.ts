import axios from "axios";
import { newLine, sleep } from "../helper";
import { InstrumentIso } from "./currenciesList";

// https://github.com/fawazahmed0/exchange-api
// date requires YYYY-MM-DD format
// (!) api only has data up to about half a year
export const currencyApiRequest = async (instrumentIso: InstrumentIso, date = 'latest') => {
  await sleep(500);
  const endpoint = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@`;

  const mainUrl = `${endpoint}${date}/v1/currencies/${instrumentIso}.json`;
  // const altUrl = `https://${date}.currency-api.pages.dev/v1/currencies/${instrumentIso}.json`;
  // ^ CORS issue

  try {
    const response = await axios.request({ method: 'GET', url: mainUrl });
    const data = response.data[instrumentIso] as Record<string, number>;
    // console.log(`Fetched exchange rates (${date}):`, `${newLine}${JSON.stringify(data)}`);
    return { data, success: true };
  } catch (e) {
    console.log(
      'Error fetching exchange rates:',
      `${newLine}${JSON.stringify(e)}$`,
    );

    return { success: false };
  }
}