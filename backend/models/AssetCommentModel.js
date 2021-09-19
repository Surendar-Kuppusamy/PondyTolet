import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const AssetCommentSchema = new Schema({
    asset_id: {
        type: 'ObjectId',
        required: [true, "Asset ID is required."],
        ref: 'Assets'
    },
    comments: {    
        type: String,
        trim: true,
        required: [true, 'Comment is required.'],
        
    },
    user_id: {
        type: 'ObjectId',
        required: [true, "User ID is required."],
        ref: 'Users'
    },
    action_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AssetComments", AssetCommentSchema);