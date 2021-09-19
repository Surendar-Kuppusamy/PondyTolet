import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const CitySchema = new Schema({
    city_name: {
        type: String,
        trim: true,
        required: [true, 'City name required.'],
        minLength: [3, 'City name must have minimum 3 characters.'],
        maxLength: [100, 'Maximum character for city name should be 100 characters.']
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

module.exports = mongoose.model("Cities", CitySchema);