import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const AssetAmenitiesSchema = new Schema({
    asset_id: {
        type: 'ObjectId',
        required: [true, "Asset ID is required."],
        ref: 'Assets'
    },
    amenities_id: {
        type: 'ObjectId',
        required: [true, "Type of amenities ID is required."],
        ref: 'Amenities'
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


module.exports = mongoose.model("AssetAmenities", AssetAmenitiesSchema);