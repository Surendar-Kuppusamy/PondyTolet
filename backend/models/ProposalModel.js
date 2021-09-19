import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const ProposalSchema = new Schema({
    from_user_id: {
        type: 'ObjectId',
        required: [true, "User ID is required."],
        ref: 'Users'
    },
    to_user_id: {
        type: 'ObjectId',
        required: [true, "User ID is required."],
        ref: 'Users'
    },
    asset_id: {
        type: 'ObjectId',
        required: [true, "Asset ID is required."],
        ref: 'Assets'
    },
    is_proposal_cancelled: {    //cancel_proposal (1 - Not Cancelled, 2 - Cancelled)
        type: String,
        default: "Not Cancelled",
        enum: {
            values: ["Not Cancelled", "Cancelled"],
            message: '{VALUE} is invalid value for cancel proposal.'
        }
    },
    proposal_on: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Proposals", ProposalSchema);