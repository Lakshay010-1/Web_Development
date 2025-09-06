import mongoose, { Schema } from "mongoose";

const userMetaDataSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    key: String,
    iv: String,
    tag: String,
    aad: String,
});

export const UserMetaData = mongoose.model("UserMetaData", userMetaDataSchema);