import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const LoggedDetailSchema = new Schema({
    user_id: {
        type: 'ObjectId',
        required: [true, "User ID is required"],
        ref: 'Users'
    },
    ip: {
        type: String,
        trim: true,
        required: [true, "IP address is required"]
    },
    browser: {
        type: String,
        trim: true,
        required: [true, "Browser data is required"]
    },
    logged_via: {        //logged_via(1 - site, 2 - Oauth)
        type: String,
        required: [true, 'Logged type is required.'],
        enum: {
            values: ["Site", "Oauth"],
            message: '{VALUE} is invalid logged type.'
        }
    },
    logged_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("LoggedDetails", LoggedDetailSchema);