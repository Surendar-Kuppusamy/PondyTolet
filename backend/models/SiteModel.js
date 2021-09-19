import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const SiteSchema = new Schema({
    site_total_view_count: {
        type: Number,
        trim: true,
        required: [true, 'Total count required.']
    },
    ip: {
        type: String,
        trim: true,
        required: [true, 'IP address required.']
    },
    browser: {
        type: String,
        trim: true,
        required: [true, 'Browser required.']
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Sites", SiteSchema);