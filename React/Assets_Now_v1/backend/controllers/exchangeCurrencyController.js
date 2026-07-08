import { frankfurterURI, exchangerateKEY, exchangeRateURI } from "../config/api.js";

const exchangeCurrency = async (req, res) => {
    const { currency, to } = req.query;
    const frankfurtOK = true;
    if (!currency) {
        return res.status(400).json({ error: "required field missing" });
    }
    try {
        let response = await fetch(`${frankfurterURI}/rates?base=${currency}${to ? `&quotes=${to}` : ""}`);
        if (!response.ok) {
            frankfurtOK = false;
            response = await fetch(`${exchangeRateURI}/${exchangerateKEY}${to ? `/pair/${currency}/${to}` : `/latest/${currency}`}`);
            if (!response.ok) {
                throw new Error("External API failed");
            }
        }
        let data = await response.json();
        if (frankfurtOK ? !data[0].rate : !data[to ? "conversion_rate" : "conversion_rates"]) {
            throw new Error("Invalid API response");
        }
        if (frankfurtOK) {
            if (!to) {
                data.conversion_rates = {};
                for (const entry of data) {
                    data.conversion_rates[entry.quote] = entry.rate;
                }
            } else {
                data.conversion_rate = data[0].rate;
            }
        }
        res.status(200).json(to ? { conversion_rate: data.conversion_rate } : { conversion_rates: data.conversion_rates });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch currencies.", details: err.message });
    }
};

export { exchangeCurrency };