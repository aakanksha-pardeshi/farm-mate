import mongoose from 'mongoose';
import Land from '../models/Land'; // Use .js extension for ES modules if needed, or just Land
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function testDB() {
    if (!MONGODB_URI) {
        console.error('MONGODB_URI is not defined');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create a test land
        const testLand = await Land.create({
            landSize: 10,
            landLocation: 'Test Location',
            soilType: 'Black',
            availabilityPeriod: '6 months',
            name: 'Test Owner',
            phone: '1234567890'
        });
        console.log('Created test land:', testLand._id);

        // Fetch the test land
        const fetchedLand = await Land.findById(testLand._id);
        console.log('Fetched test land:', fetchedLand?.landLocation);

        // Delete the test land
        await Land.findByIdAndDelete(testLand._id);
        console.log('Deleted test land');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Database test failed:', error);
        process.exit(1);
    }
}

testDB();
