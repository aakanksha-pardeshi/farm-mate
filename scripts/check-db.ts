import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
}

const LandSchema = new mongoose.Schema({
    landSize: Number,
    landLocation: String,
    soilType: String,
    availabilityPeriod: String,
    landDescription: String,
    priceExpectation: String,
    preferredCrops: String,
    climate: String,
    temperature: String,
    pastYield: String,
    name: String,
    email: String,
    phone: String,
    images: [String],
    createdAt: { type: Date, default: Date.now }
});

const Land = mongoose.models.Land || mongoose.model('Land', LandSchema);

async function checkDb() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected successfully!');

        const count = await Land.countDocuments();
        console.log(`Found ${count} land listings.`);

        if (count === 0) {
            console.log('Database is empty. Seeding one test listing...');
            await Land.create({
                landSize: 5,
                landLocation: 'Nashik',
                soilType: 'Black',
                availabilityPeriod: '12 months',
                landDescription: 'Fertile black soil land suitable for grapes and onions.',
                priceExpectation: '50000/acre/year',
                preferredCrops: 'Grapes, Onion',
                climate: 'Moderate',
                temperature: '25C',
                pastYield: 'Good',
                name: 'Test Farmer',
                email: 'test@example.com',
                phone: '1234567890',
                images: []
            });
            console.log('Test listing created.');
        } else {
            const lands = await Land.find({}).limit(1);
            console.log('Sample listing:', JSON.stringify(lands[0], null, 2));
        }

    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkDb();
