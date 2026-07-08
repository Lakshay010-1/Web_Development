import { coingeckoKEY, coingeckoURI, twelvedataKEY, twelvedataURI } from "../config/api.js";

const searchStock = async (req, res) => {
    const { stock } = req.query;

    if (!stock) {
        return res.status(400).json({ error: "Stock is required" });
    }
    try {
        const response = await fetch(`${twelvedataURI}/symbol_search?symbol=${stock}&apikey=${twelvedataKEY}`);
        if (!response.ok) {
            throw new Error("External API failed");
        }
        const data = await response.json();
        res.status(200).json(data.data);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch stock latest price.", details: err.message });
    }
};


const searchCrypto = async (req, res) => {
    const { crypto } = req.query;

    if (!crypto) {
        return res.status(400).json({ error: "Crypto currency required!" });
    }
    try {
        const response = await fetch(`${coingeckoURI}/search?query=${crypto}`, {
            method: "GET",
            headers: {
                "x-cg-demo-api-key": coingeckoKEY
            }
        });
        if (!response.ok) {
            throw new Error("External API Failed!");
        }
        const data = await response.json();
        res.status(200).json(data.coins);
    } catch (err) {
        res.status(500).json({ error: "Failed to search crypto.", details: err.message });
    }
};

export {
    searchCrypto,
    searchStock
}