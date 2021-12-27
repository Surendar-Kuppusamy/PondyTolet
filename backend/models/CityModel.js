import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const CitySchema = new Schema({
    city_name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'City name required.'],
        minLength: [3, 'City name must have minimum 3 characters.'],
        maxLength: [100, 'Maximum character for city name should be 100 characters.']
    },
    status: {
        type: Number,
        trim: true,
    },
    created_by: {
        type: 'ObjectId',
        ref: 'Users'
    },
    modified_by: {
        type: 'ObjectId',
        ref: 'Users'
    },
    created_on: {
        type: Date
    },
    modified_on: {
        type: Date
    }
});

const Cities = mongoose.model("Cities", CitySchema);

export default Cities;