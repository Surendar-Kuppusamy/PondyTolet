import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const RoomSchema = new Schema({
    asset_id: {
        type: 'ObjectId',
        required: [true, "Asset ID is required."],
        ref: 'Assets'
    },
    room_type: {
        type: 'ObjectId',
        required: [true, "Room type is required."],
        ref: 'RoomTypes'
    },
    room_size_in_length: {
        type: Number,
        trim: true
    },
    room_size_in_length_type: {
        type: String,
        trim: true
    },
    room_size_in_width: {
        type: Number,
        trim: true
    },
    room_size_in_width_type: {
        type: String,
        trim: true
    },
    room_image: {
        type: String,
        trim: true
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

module.exports = mongoose.model("Rooms", RoomSchema);