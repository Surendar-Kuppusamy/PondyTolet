import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const AssetSchema = new Schema({
    user_id: {
        type: 'ObjectId',
        required: [true, "User ID is required"],
        ref: 'Users'
    },
    type_of_asset: {        //type_of_asset(1 - House, 2 - Appartment, 3 - Store, 4 - Koddon, 5 - Land)
        type: Number,
        required: [true, 'Asset type required.'],
        ref: 'TypeOfAssets'
    },
    asset_for: {        //asset_for(1 - Rent, 2 - for lease, 3 - "Sale")
        type: Number,
        required: [true, 'Asset for required.'],
        enum: {
            values: [1, 2, 3],
            message: 'Invalid asset for.'
        }
    },
    asset_name: {
        type: String,
        trim: true,
        required: [true, 'Asset name required.'],
        minLength: [3, 'Asset name must have minimum 3 characters.'],
        maxLength: [30, 'Maximum character for asset name should be 30 characters.']
    },
    door_number: {
        type: Number,
        trim: true
    },
    address_hint: {
        type: String,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    nagar: {
        type: String,
        trim: true
    },
    city: {
        type: Number,
        trim: true,
        ref: 'Cities'
    },
    pincode: {
        type: Number,
        trim: true
    },
    state: {
        type: Number,
        trim: true,
        ref: 'States'
    },
    landmark: {
        type: String,
        trim: true
    },
    age_of_asset: {
        type: Number,
        trim: true,
        required: [true, 'Asset age is required.'],
    },
    age_of_asset_type: {
        type: String,
        trim: true,
        required: [true, 'Asset age type is required.'],
    },
    asset_main_image: {
        type: String,
        trim: true
    },
    asset_size_in_length: {
        type: Number,
        trim: true
    },
    asset_size_in_length_type: {
        type: String,
        trim: true
    },
    asset_size_in_width: {
        type: Number,
        trim: true
    },
    asset_size_in_width_type: {
        type: String,
        trim: true
    },
    advance_amount_for_asset: {
        type: Number,
        trim: true
    },
    monthly_rent_for_asset: {
        type: Number,
        trim: true
    },
    lease_amount_for_asset: {
        type: Number,
        trim: true
    },
    lease_period_for_asset: {
        type: Number,
        trim: true
    },
    lease_period_for_asset_type: {
        type: String,
        trim: true
    },
    asset_price: {
        type: Number,
        trim: true
    },
    asset_notes_by_owner: {
        type: String,
        trim: true
    },
    who_can_contact: {        //who_can_contact(1 - bachelor 2 - Family 3 - Anyone)
        type: [
                {
                    type: Number,
                    ref: 'AssetWhoCanContacts'
                }
            ],
        validate: {
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    if(value.length == 0) {
                        resolve(false);
                    }
                    resolve(true);
                });
            },
            message: 'Select anyone of the tenant type'
        }
    },
    asset_amenities: {
        type: [
                {
                    type: Number,
                    ref: 'Amenities'
                }
            ],
        validate: {
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    if(value.length == 0) {
                        resolve(false);
                    }
                    resolve(true);
                });
            },
            message: 'Select anyone of the amenities'
        }
    },
    asset_available_on_from: {
        type: Date,
        trim: true,
        required: [true, 'Asset available on date required.']
    },
    notice_period_for_vocate_asset: {
        type: String,
        trim: true
    },
    asset_status_now: {            //asset_status_now (1 - free(available), 2 - booked(unavailable), 3 - tenant_on_notice_period(tentant on his notice period)),
        type: String,
        trim: true,
        required: [true, 'Asset status is required.']
    },
    show_my_asset_for_tenants: {        //show_my_asset_for_tenants (1- Show, 2-Hide),
        type: String,
        required: [true, 'Tenant show status is required.'],
        enum: {
            values: ["Show", "Hide"],
            message: '{VALUE} is invalid value for tenant show status.'
        }
    },
    number_of_rooms: {
        type: Number,
        trim: true
    },
    bhk: {
        type: Number,
        trim: true
    },
    created_by: {
        type: 'ObjectId',
        required: [true, "User ID is required"],
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

const Assets = mongoose.model("Assets", AssetSchema);
export default Assets;