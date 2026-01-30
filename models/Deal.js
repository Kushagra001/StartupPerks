const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Cloud', 'Marketing', 'Analytics', 'Productivity', 'Finance', 'Design']
    },
    discountValue: {
        type: String,
        required: true // e.g., "50% OFF", "$1000 Credit"
    },
    partnerLogoUrl: {
        type: String,
        required: true
    },
    websiteUrl: {
        type: String,
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    promoCode: {
        type: String,
        // Only visible if not locked or user is verified (logic handled in route)
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Deal', DealSchema);
