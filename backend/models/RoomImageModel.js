import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const RoomImageSchema = new Schema({
    room_id: {
        type: 'ObjectId',
        required: [true, "Room ID is required."],
        ref: 'Rooms'
    },
    image: {
        type: String,
        trim: true,
        required: [true, "Image required."],
        validate: {
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    fs.access(path, fs.F_OK, (err) => {
                      if (err) {
                        console.error(err);
                        resolve(false);
                      }
                      resolve(true);
                    })
                });
            },
            message: 'Image is not exists.'
        }
    },
    created_by: {
        type: 'ObjectId',
        required: [true, "User ID is required."],
        ref: 'Users'
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("RoomImages", RoomImageSchema);