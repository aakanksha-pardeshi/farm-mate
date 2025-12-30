import { getPincodeDetails } from '../utils/location';

console.log('--- Verifying Pincode Utility ---\n');

const testCases = [
    '110001', // Existing Mock
    '400001', // Existing Mock
    '999999', // Random generated
    '123456', // Random generated
    '555555', // Random generated
    'invalid',
    '123',
    ''
];

testCases.forEach(pin => {
    console.log(`Checking ${pin}...`);
    getPincodeDetails(pin).then(details => {
        if (details) {
            console.log(`✅ Found: ${details.city}, ${details.state}`);
            if (!['110001', '400001'].includes(pin)) {
                console.log(`    (Generated: ${JSON.stringify(details)})`);
            }
        } else {
            console.log('❌ Invalid Pincode');
        }
    });
});
