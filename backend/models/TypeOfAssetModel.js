import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const TypeOfAssetSchema = new Schema({
    asset_type: {
        type: String,
        trim: true,
        required: [true, 'Asset type is required.'],
        minLength: [3, 'Asset type must have minimum 3 characters.'],
        maxLength: [100, 'Maximum character for asset type should be 100 characters.']
    },
    created_by: {
        type: 'ObjectId',
        required: [true, "User ID is required."],
        ref: 'Users'
    },
    modified_by: {
        type: 'ObjectId',
        required: [true, "User ID is required"],
        ref: 'Users'
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    modified_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("TypeOfAssets", TypeOfAssetSchema);