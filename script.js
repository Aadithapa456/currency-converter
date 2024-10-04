import { API_KEY } from "/api_key.js";
const url = "https://v6.exchangerate-api.com/v6/";
let country_list = {
   AED: "AE",
   AFN: "AF",
   XCD: "AG",
   ALL: "AL",
   AMD: "AM",
   ANG: "AN",
   AOA: "AO",
   AQD: "AQ",
   ARS: "AR",
   AUD: "AU",
   AZN: "AZ",
   BAM: "BA",
   BBD: "BB",
   BDT: "BD",
   XOF: "BE",
   BGN: "BG",
   BHD: "BH",
   BIF: "BI",
   BMD: "BM",
   BND: "BN",
   BOB: "BO",
   BRL: "BR",
   BSD: "BS",
   NOK: "BV",
   BWP: "BW",
   BYR: "BY",
   BZD: "BZ",
   CAD: "CA",
   CDF: "CD",
   XAF: "CF",
   CHF: "CH",
   CLP: "CL",
   CNY: "CN",
   COP: "CO",
   CRC: "CR",
   CUP: "CU",
   CVE: "CV",
   CYP: "CY",
   CZK: "CZ",
   DJF: "DJ",
   DKK: "DK",
   DOP: "DO",
   DZD: "DZ",
   ECS: "EC",
   EEK: "EE",
   EGP: "EG",
   ETB: "ET",
   EUR: "FR",
   FJD: "FJ",
   FKP: "FK",
   GBP: "GB",
   GEL: "GE",
   GGP: "GG",
   GHS: "GH",
   GIP: "GI",
   GMD: "GM",
   GNF: "GN",
   GTQ: "GT",
   GYD: "GY",
   HKD: "HK",
   HNL: "HN",
   HRK: "HR",
   HTG: "HT",
   HUF: "HU",
   IDR: "ID",
   ILS: "IL",
   INR: "IN",
   IQD: "IQ",
   IRR: "IR",
   ISK: "IS",
   JMD: "JM",
   JOD: "JO",
   JPY: "JP",
   KES: "KE",
   KGS: "KG",
   KHR: "KH",
   KMF: "KM",
   KPW: "KP",
   KRW: "KR",
   KWD: "KW",
   KYD: "KY",
   KZT: "KZ",
   LAK: "LA",
   LBP: "LB",
   LKR: "LK",
   LRD: "LR",
   LSL: "LS",
   LTL: "LT",
   LVL: "LV",
   LYD: "LY",
   MAD: "MA",
   MDL: "MD",
   MGA: "MG",
   MKD: "MK",
   MMK: "MM",
   MNT: "MN",
   MOP: "MO",
   MRO: "MR",
   MTL: "MT",
   MUR: "MU",
   MVR: "MV",
   MWK: "MW",
   MXN: "MX",
   MYR: "MY",
   MZN: "MZ",
   NAD: "NA",
   XPF: "NC",
   NGN: "NG",
   NIO: "NI",
   NPR: "NP",
   NZD: "NZ",
   OMR: "OM",
   PAB: "PA",
   PEN: "PE",
   PGK: "PG",
   PHP: "PH",
   PKR: "PK",
   PLN: "PL",
   PYG: "PY",
   QAR: "QA",
   RON: "RO",
   RSD: "RS",
   RUB: "RU",
   RWF: "RW",
   SAR: "SA",
   SBD: "SB",
   SCR: "SC",
   SDG: "SD",
   SEK: "SE",
   SGD: "SG",
   SKK: "SK",
   SLL: "SL",
   SOS: "SO",
   SRD: "SR",
   STD: "ST",
   SVC: "SV",
   SYP: "SY",
   SZL: "SZ",
   THB: "TH",
   TJS: "TJ",
   TMT: "TM",
   TND: "TN",
   TOP: "TO",
   TRY: "TR",
   TTD: "TT",
   TWD: "TW",
   TZS: "TZ",
   UAH: "UA",
   UGX: "UG",
   USD: "US",
   UYU: "UY",
   UZS: "UZ",
   VEF: "VE",
   VND: "VN",
   VUV: "VU",
   YER: "YE",
   ZAR: "ZA",
   ZMK: "ZM",
   ZWD: "ZW",
};
async function fetchCurrencyData() {
   try {
      const response = await fetch(
         url + `${API_KEY}/latest/${currentCurrency.value}`
      );
      const data = await response.json();
      showConvertedCurrency(data);
   } catch (error) {
      console.error(error);
   }
}
// DOM Elements
let options = document.querySelectorAll("select");
let submitBtn = document.querySelector("#submit");
let inputAmount = document.querySelector("#user-input");
let currentCurrency = document.querySelector("#current-currency");
let requiredCurrency = document.querySelector("#required-currency");
let requiredCurrencyVal;
//Default Input value
let result = document.querySelector(".result");
inputAmount.value = "1";
function currencyList(country_list) {
   for (let i = 0; i < options.length; i++) {
      for (const currency_code in country_list) {
         let optionTag = `<option value= "${currency_code}">${currency_code}</option>`;
         options[i].insertAdjacentHTML("beforeend", optionTag); //Adds the country code in the select drop-down
      }
   }
}
submitBtn.addEventListener("click", () => {
   fetchCurrencyData();
});
inputAmount.addEventListener("keydown", (event) => {
   if (event.key == "Enter") {
      fetchCurrencyData();
      event.preventDefault(); // Prevents the default form submission action
   }
});
function showConvertedCurrency(data) {
   requiredCurrencyVal = requiredCurrency.value;
   let conversionRate = data.conversion_rates[requiredCurrencyVal].toFixed(2); // Exctracts the rate of req currency from the API
   let convertedValue = (conversionRate * inputAmount.value).toFixed(2); // Converts the given amount to amount in required currency
   //Checks if the select tag of both req and current currency is same
   if (options[0].value == options[1].value) {
      let nextIndex = (options[1].selectedIndex + 1) % options.length; // Moves the selected drop-down item by 1
      options[1].selectedIndex = nextIndex;
      result.innerHTML = `You chose the same Currency`;
   } else {
      result.innerHTML = `${inputAmount.value} ${currentCurrency.value} = ${convertedValue} ${requiredCurrency.value}`;
   }
}
currencyList(country_list);
