import { alphavantageKEY, alphavantageURI } from "../config/api.js";
import { findDateIdx } from "../utils/findDateIdx.js";
import { objectToArrayDates } from "../utils/objectToArrayDates.js";

const historyCurrency = async (req, res) => {
    const { from_cur, to_cur, from, to } = req.query;
    try {
        const response = await fetch(`${alphavantageURI}/query?function=FX_DAILY&from_symbol=${from_cur}&to_symbol=${to_cur}&outputsize=full&apikey=${alphavantageKEY}`);
        if (!response.ok) {
            throw new Error("External API Failed!")
        }
        const data = await response.json();

        if ("Information" in data) {
            return res.status(200).json({ data: { apiLimit: "Consumed" } });
        }
        if (data["Meta Data"] != null) {
            const datesArray = objectToArrayDates("Time Series FX (Daily)", "4. close", data);
            const fromDateIdx = findDateIdx(from, datesArray);
            const toDateIdx = findDateIdx(to, datesArray);
            return res.status(200).json({ data: { fromPrice: datesArray[fromDateIdx], toPrice: datesArray[toDateIdx] } });
        }
        res.status(404).json({ error: "Currency symbol(s) not valid!" })
    } catch (err) {
        res.status(500).json({ error: "Failed to .", details: err.message });
    }
};


const historyStock = async (req, res) => {
    const { stock, from, to } = req.query;
    try {
        const response = await fetch(`${alphavantageURI}/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${alphavantageKEY}`);
        if (!response.ok) {
            throw new Error("External API Failed!")
        }
        const data = await response.json();
        if ("Information" in data) {
            return res.status(200).json({ data: { apiLimit: "Consumed" } });
        }
        if (data["Meta Data"] != null) {
            const datesArray = objectToArrayDates("Time Series (Daily)", "4. close", data);
            const fromDateIdx = parseInt(findDateIdx(from, datesArray))
            const toDateIdx = parseInt(findDateIdx(to, datesArray))
            return res.status(200).json({ data: { fromPrice: datesArray[fromDateIdx], toPrice: datesArray[toDateIdx] } });
        }

        res.status(404).json({ error: "Stock symbol is invalid!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to .", details: err.message });
    }
};


const historyCrypto = async (req, res) => {
    const { crypto, from, to } = req.query;
    try {
        const response = await fetch(`${alphavantageURI}/query?function=DIGITAL_CURRENCY_DAILY&symbol=${crypto}&market=USD&apikey=${alphavantageKEY}`);
        if (!response.ok) {
            throw new Error("External API Failed!")
        }
        const data = await response.json();
        if ("Information" in data) {
            return res.status(200).json({ data: { apiLimit: "Consumed" } });
        }
        if (data["Meta Data"] != null) {
            const datesArray = objectToArrayDates("Time Series (Digital Currency Daily)", "4. close", data);
            const fromDateIdx = parseInt(findDateIdx(from, datesArray))
            const toDateIdx = parseInt(findDateIdx(to, datesArray))
            return res.status(200).json({ data: { fromPrice: datesArray[fromDateIdx], toPrice: datesArray[toDateIdx] } });
        }
        res.status(404).json({ error: "Crypto Symbol not found!" })
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch crypto historical data.", details: err.message });
    }
};


const historyCommodity = async (req, res) => {
    const { commodity, from, to } = req.query;
    if (!commodity || !from | !to) {
        return res.status(400).json({ error: "All fields are required!" })
    }
    try {
        const response = await fetch(`${alphavantageURI}/query?function=GOLD_SILVER_HISTORY&symbol=${commodity}&interval=daily&apikey=${alphavantageKEY}`);
        if (!response.ok) {
            throw new Error("External API Failed!");
        }
        const data = await response.json();
        if ("Information" in data) {
            return res.status(200).json({ data: { apiLimit: "Consumed" } });
        }
        if (data.nominal == "invalid") {
            return res.status(404).json({ error: "commodity not found!" });
        }
        const fromDateIdx = findDateIdx(from, data.data);
        const toDateIdx = findDateIdx(to, data.data);
        res.status(200).json({ data: { fromPrice: data.data[fromDateIdx], toPrice: data.data[toDateIdx] } });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch commodity's historical data.", details: err.message });
    }
};

export {
    historyCommodity,
    historyCrypto,
    historyCurrency,
    historyStock
}