import { finnhubKEY, finnhubURI } from "../config/api.js";

const fetchNews = async (req, res) => {
    try {
        const response = await fetch(`${finnhubURI}/news?category=general&token=${finnhubKEY}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch news.", details: err.message });
    }
};

export {
    fetchNews
}