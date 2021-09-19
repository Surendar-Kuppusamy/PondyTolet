import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const AssetLikeDislikeSchema = new Schema({
    asset_id: {
        type: 'ObjectId',
        required: [true, "Asset ID is required."],
        ref: 'Assets'
    },
    like_or_dislike: {    //like_or_dislike (1 - Like, 2- Dislike)
        type: String,
        required: [true, 'Like or dislike is required.'],
        enum: {
            values: ["Like", "Dislike"],
            message: '{VALUE} is invalid value for like or dislike.'
        }
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

module.exports = mongoose.model("AssetLikeDislikes", AssetLikeDislikeSchema);