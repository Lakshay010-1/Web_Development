import ListAsset from "../models/ListAsset.js";

const fetchListAssets = async (req, res) => {
    const { list } = req.params;
    const { user } = req.query;
    if (!user || !list) {
        return res.status(400).json({ message: "required fields are missing" });
    }
    try {
        const listAssets = await ListAsset.find({ list, user });
        res.status(200).json({ list, assets: listAssets });
    } catch (error) {
        res.status(500).json({ message: "Error fetching assets", error })
    }
};

const deleteListAsset = async (req, res) => {
    const { id } = req.params;
    if (id === undefined) {
        return res.status(400).json({ message: "required fields are missing" });
    }
    try {
        const deletedAsset = await ListAsset.findByIdAndDelete(id);
        const operationStatus = deletedAsset !== null;
        res.status(200).json({
            message: operationStatus ? "asset deleted successfully" : "failed to delete the asset",
            isDeleted: operationStatus,
            asset: deletedAsset
        })
    } catch (error) {
        res.status(500).json({ message: "Error deleting asset", error })
    }
};

const addListAsset = async (req, res) => {
    const { list } = req.params;
    const { symbol, name, type, invested_amount, durationDate, invested_currency, value, price, exchangeTo, curPrice, user } = req.body;
    if (list === "p") {
        if (!type ||
            invested_amount == null ||
            !durationDate?.from ||
            !durationDate?.to ||
            !invested_currency ||
            value == null ||
            !price?.toPrice?.date ||
            price?.toPrice?.price == null ||
            !price?.fromPrice?.date ||
            price?.fromPrice?.price == null
        ) {
            return res.status(400).json({ message: "required fields are missing" });
        }
    } else if (list === "w") {
        if (!type || !value || !curPrice) {
            return res.status(400).json({ message: "required fields are missing" });
        }
    } else {
        return res.status(400).json({ message: "Invalid URL" });
    }
    let assetExists;
    if (list === "p") {
        assetExists = await ListAsset.findOne({ list, user, type, "durationDate.from": durationDate.from, "durationDate.to": durationDate.to, value });
    } else if (list === "w") {
        const exchangeToOb = exchangeTo === undefined ? {} : { exchangeTo };
        assetExists = await ListAsset.findOne({ list, user, type, value, ...exchangeToOb });
    }
    if (assetExists === null) {
        try {
            const asset = await ListAsset.create({
                symbol,
                type,
                invested_amount,
                durationDate,
                invested_currency,
                value,
                price,
                name,
                curPrice,
                exchangeTo,
                user,
                list
            });
            return res.status(201).json({ asset })
        } catch (error) {
            return res.status(500).json({
                message: "Error adding asset", error: error.message
            })
        }
    }
    return res.status(409).json({ message: "Asset already exists" });
    
};

export { fetchListAssets, deleteListAsset, addListAsset };