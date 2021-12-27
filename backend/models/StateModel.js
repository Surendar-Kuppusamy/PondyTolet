import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;

const StateSchema = new Schema({
    state_name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'State name required.'],
        minLength: [3, 'State name must have minimum 3 characters.'],
        maxLength: [100, 'Maximum character for state name should be 100 characters.']
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

const States = mongoose.model("States", StateSchema);
export default States;