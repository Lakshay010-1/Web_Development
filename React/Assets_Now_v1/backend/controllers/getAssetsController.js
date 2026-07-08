import { alphavantageKEY, alphavantageURI, coingeckoKEY, coingeckoURI, rapidKEY, yahooFinanceV3URI } from "../config/api.js";

const getCommodity = async (req, res) => {
    const { commodity } = req.query;
    if (!commodity) {
        return res.status(400).json({ error: "Stock is required" });
    }
    try {
        const response = await fetch(`${alphavantageURI}/query?function=GOLD_SILVER_HISTORY&symbol=${commodity}&interval=daily&apikey=${alphavantageKEY}`);
        if (!response.ok) {
            throw new Error("External API failed");
        }
        const data = await response.json();
        if ("Information" in data) {
            return res.status(200).json({ data: { apiLimit: "Consumed" } });
        }
        res.status(200).json({ data: { curPriceUSD: data.data[0], prePriceUSD: data.data[1] } });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch commodity price.", details: err.message });
    }
};


const getStock = async (req, res) => {
    const { stock } = req.query;
    const details = {};

    if (!stock) {
        return res.status(400).json({ error: "Stock is required" });
    }
    try {

        const response = await fetch(`${alphavantageURI}/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${alphavantageKEY}`);
        if (!response.ok) {
            throw new Error("External API failed");
        }
        let data = await response.json();
        if ("Information" in data) {
            return res.status(200).json({ data: { apiLimit: "Consumed" } });
        }
        data = data["Global Quote"];
        if (Object.keys(data).length > 0) {
            details.curPrice = data["05. price"] ?? null;
            details.prePrice = data["08. previous close"] ?? null;
            details.diffPrice = data["09. change"] ?? null;
            details.perDiff = data["10. change percent"] ?? null;
        }
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch stock price.", details: err.message });
    }
    try {
        const response = await fetch(`${yahooFinanceV3URI}/stock/v3/get-profile?symbol=${stock}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'X-Rapidapi-Host': "apidojo-yahoo-finance-v1.p.rapidapi.com",
                'X-Rapidapi-Key': rapidKEY
            }
        });
        if (!response.ok) {
            throw new Error("External API failed!");
        }
        const data = await response.json();
        if (data.quoteSummary.result !== null) {
            const stockProfile = data.quoteSummary.result[0].summaryProfile;
            details.address1 = stockProfile?.address1 && stockProfile.address1;
            details.address2 = stockProfile?.address2 && stockProfile.address2;
            details.country = stockProfile?.country && stockProfile.country;
            details.website = stockProfile?.website && stockProfile.website;
            details.industry = stockProfile?.industry && stockProfile.industry;
            details.sector = stockProfile?.sector && stockProfile.sector;
            details.fullTimeEmployees = stockProfile?.fullTimeEmployees && stockProfile.fullTimeEmployees;
            details.desc = stockProfile?.longBusinessSummary && stockProfile.longBusinessSummary;
        }
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch stock profile.", details: err.message });
    }
    res.status(200).json({ data: details });
};


const getCrypto = async (req, res) => {
    const { crypto } = req.query;

    if (!crypto) {
        return res.status(400).json({ error: "Crypto currency required!" });
    }
    try {
        const response = await fetch(`${coingeckoURI}/coins/${crypto}`, {
            method: "GET",
            headers: {
                "x-cg-demo-api-key": coingeckoKEY
            }
        });
        if (!response.ok) {
            throw new Error("External API Failed!");
        }
        const data = await response.json();
        res.status(200).json({
            data: {
                name: data.name,
                curPrice: data.market_data.current_price.inr,
                diffPrice: data.market_data.price_change_24h_in_currency.inr,
                perDiff: data.market_data.price_change_percentage_24h_in_currency.inr + "%",
                categories: data.categories,
                website: data.links.homepage[0],
                image: data.image.large,
                desc: data.description.en,

            }
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to search crypto.", details: err.message, data: {} });
    }
};


export {
    getCommodity,
    getCrypto,
    getStock
}