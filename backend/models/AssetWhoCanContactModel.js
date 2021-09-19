import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const AssetWhoCanContactSchema = new Schema({
    asset_id: {
        type: 'ObjectId',
        required: [true, "Asset ID is required."],
        ref: 'Assets'
    },
    who_can_contact_us_id: {
        type: 'ObjectId',
        required: [true, "Type of tenant ID is required."],
        ref: 'WhoCanContactUs'
    },
    added_by: {
        type: 'ObjectId',
        required: [true, "User ID is required."],
        ref: 'Users'
    },
    added_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AssetWhoCanContacts", AssetWhoCanContactSchema);