import "dotenv/config";

export const exchangerateKEY = process.env.EXCHANGE_RATE_API_KEY;
export const coingeckoKEY = process.env.COINGECKO_API_KEY;
export const rapidKEY = process.env.RAPID_API_KEY;
export const alphavantageKEY = process.env.ALPHAVANTAGE_API_KEY;
export const finnhubKEY = process.env.FINNHUB_API_KEY;
export const twelvedataKEY = process.env.TWELVEDATA_API_KEY;

export const exchangeRateURI = "https://v6.exchangerate-api.com/v6";
// exchangeCurrency (single+exchange), 
// Per day (approx): 50

export const frankfurterURI = "https://api.frankfurter.dev/v2";
// exchangeCurrency (single+exchange), 
// Undefined

export const coingeckoURI = "https://api.coingecko.com/api/v3";
// trending crypto, get crypto, search crypto
// 100 Rate limit /min

export const finnhubURI = "https://finnhub.io/api/v1";
// news 
// 60 API calls/minute

export const twelvedataURI = "https://api.twelvedata.com";
// search stock
// 500 API calls/day

export const alphavantageURI = "https://www.alphavantage.co";
// get commodity, get stock-(i), history (currency+stock+crypto+commodity)
// 25 API requests per day
// 5 API requests per minute

export const yahooFinanceV3URI = "https://apidojo-yahoo-finance-v1.p.rapidapi.com";
// get stock-(ii)
// Requests 500 / Month
// Rate Limit 5 requests per second

export const yahooFinanceV2URI = "https://yh-finance.p.rapidapi.com/market/v2";
// trending stocks,
// Requests 500 / Month
// Rate Limit 5 requests per second