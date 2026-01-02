import mongoose from 'mongoose';

const LandSchema = new mongoose.Schema({
    landSize: {
        type: Number,
        required: [true, 'Please provide land size'],
    },
    landLocation: {
        type: String,
        required: [true, 'Please provide land location'],
    },
    soilType: {
        type: String,
        required: [true, 'Please provide soil type'],
    },
    availabilityPeriod: {
        type: String,
        required: [true, 'Please provide availability period'],
    },
    landDescription: {
        type: String,
    },
    priceExpectation: {
        type: String,
    },
    preferredCrops: {
        type: String,
    },
    climate: {
        type: String,
    },
    temperature: {
        type: String,
    },
    pastYield: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'Please provide owner name'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    image: {
        type: String,
    },
    images: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Land || mongoose.model('Land', LandSchema);
