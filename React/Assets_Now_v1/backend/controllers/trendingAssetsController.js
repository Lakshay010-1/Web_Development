import { coingeckoKEY, coingeckoURI, rapidKEY, yahooFinanceV2URI } from "../config/api.js";

const trendingCrypto = async (req, res) => {
    try {
        const response = await fetch(`${coingeckoURI}/search/trending`, {
            method: "GET",
            headers: { 'x-cg-demo-api-key': coingeckoKEY }
        });
        const cryptosData = await response.json();
        const cryptoCurs = cryptosData.coins.map(crypto => {
            const item = crypto.item;
            if (!item || !item.data) {
                return null;
            }
            return {
                name: item.name,
                curPriceUSD: item.data.price ?? null,
                changePerUSD: item.data.price_change_percentage_24h.usd ?? null
            }
        }).filter(Boolean);
        res.status(200).json(cryptoCurs);
    } catch (err) {
        res.status(500).json({ error: "Failed to trending crypto currencies.", details: err.message });
    }
};


const trendingStocks = async (req, res) => {
    try {
        const response = await fetch(`${yahooFinanceV2URI}/get-summary?region=IN`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'X-Rapidapi-Host': "yh-finance.p.rapidapi.com",
                'X-Rapidapi-Key': rapidKEY
            }
        });
        const stocksData = await response.json();
        const stocks = stocksData.marketSummaryAndSparkResponse.result.map(stock => {
            if (!stock.shortName || !stock.regularMarketPrice || !stock.regularMarketPreviousClose) {
                return null;
            }
            return {
                name: stock.shortName,
                curPrice: stock.regularMarketPrice.raw ?? null,
                prePrice: stock.regularMarketPreviousClose.raw ?? null
            }
        }).filter(Boolean);
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json({ error: "Failed to trending stocks.", details: err.message });
    }
};

export {
    trendingCrypto,
    trendingStocks
}