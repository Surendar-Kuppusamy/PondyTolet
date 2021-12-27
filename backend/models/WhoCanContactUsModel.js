import mongoose from 'mongoose';
import fs from 'fs';

var Schema = mongoose.Schema;


const WhoCanContactUsSchema = new Schema({
    tenant_type: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Tenant type is required.'],
        minLength: [3, 'Tenant type must have minimum 3 characters.'],
        maxLength: [100, 'Maximum character for tenant type should be 100 characters.']
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


const WhoCanContactUs = mongoose.model("WhoCanContactUs", WhoCanContactUsSchema);
export default WhoCanContactUs;