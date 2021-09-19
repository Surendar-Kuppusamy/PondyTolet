import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const OauthUserSchema = new Schema({
    first_name:  {
        type: String,
        trim: true
    },
    last_name:  {
        type: String,
        trim: true
    },
    dob:  {
        type: Date,
        trim: true
    },
    email:  {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    resolve(email_pattern.test(value));
                });
            },
            message: props => `${props.value} is not a valid emial!`
        }
    },
    password:  {
        type: String,
        trim: true
    },
    mobile_number:  {
        type: Number,
        trim: true
    },
    telephone_number:  {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
	profile_image: {
        type: String,
        trim: true
    },
    user_type: {        //user_type(1 - Admin, 2 - house owner, 3 - tenant)
        type: Number,
        required: [true, 'User type required.'],
        enum: {
            values: [1, 2, 3],
            message: '{VALUE} is invalid type.'
        }
    },
    user_status: {        //user_status (1 - active, 0 - disabled)
        type: Number,
        required: [true, 'User status required.'],
        enum: {
            values: [1, 2],
            message: '{VALUE} is invalid status.'
        }
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    modified_on: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("OauthUsers", OauthUserSchema);