import mongoose from "mongoose";

const listAssetSchema = mongoose.Schema(
    {
        symbol: { type: String },
        type: { type: String },
        invested_amount: { type: Number },
        durationDate: {
            from: { type: Date },
            to: { type: Date },
        },
        invested_currency: { type: String },
        value: { type: String },
        price: {
            toPrice: {
                date: { type: Date },
                price: { type: Number }
            },
            fromPrice: {
                date: { type: Date },
                price: { type: Number }
            }
        },
        name: { type: String },
        exchangeTo: { type: String },
        curPrice: { type: Number },
        list: { type: String },
        user: { type: String },
    },
    {
        timestamps: true
    }
);

listAssetSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

listAssetSchema.set("toJSON", {
    virtuals: true,
});

listAssetSchema.set("toObject", {
    virtuals: true,
});

export default mongoose.model("ListAsset", listAssetSchema);