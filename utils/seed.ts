export const MOCK_FARMERS = [
    {
        id: 'f1',
        type: 'farmer',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        location: 'Amritsar, Punjab',
        experienceLevel: 'Expert',
        yearsOfExperience: '15',
        specialties: 'Wheat, Rice', // string format to match form
        crops: 'Wheat, Rice, Potato',
        availability: 'Full-time',
        description: 'Experienced farmer specializing in large scale wheat and rice cultivation.'
    },
    {
        id: 'f2',
        type: 'farmer',
        name: 'Suresh Patil',
        email: 'suresh@example.com',
        location: 'Nashik, Maharashtra',
        experienceLevel: 'Experienced',
        yearsOfExperience: '8',
        specialties: 'Grapes, Onions',
        crops: 'Grapes, Onions, Pomegranate',
        availability: 'Seasonal',
        description: 'Expert in horticulture and seasonal fruit crops.'
    },
    {
        id: 'f3',
        type: 'farmer',
        name: 'Anita Desai',
        email: 'anita@example.com',
        location: 'Pune, Maharashtra',
        experienceLevel: 'Intermediate',
        yearsOfExperience: '4',
        specialties: 'Organic Vegetables',
        crops: 'Tomato, Spinach, Methi',
        availability: 'Part-time',
        description: 'Passionate about organic farming and sustainable practices.'
    }
];

export const MOCK_LANDS = [
    {
        id: 'l1',
        type: 'landowner',
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        landLocation: 'Amritsar, Punjab',
        landSize: '10',
        soilType: 'Loamy',
        preferredCrops: 'Wheat, Rice',
        availabilityPeriod: 'Year-round',
        priceExpectation: '20000/acre',
        landDescription: 'Flat fertile land with canal water access.'
    },
    {
        id: 'l2',
        type: 'landowner',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        landLocation: 'Nashik, Maharashtra',
        landSize: '3',
        soilType: 'Black Soil',
        preferredCrops: 'Grapes, Onions',
        availabilityPeriod: 'Rabi Season',
        priceExpectation: 'Share 40%',
        landDescription: 'Perfect for vineyards, drip irrigation installed.'
    },
    {
        id: 'l3',
        type: 'landowner',
        name: 'Arun Verma',
        email: 'arun@example.com',
        landLocation: 'Pune, Maharashtra',
        landSize: '1',
        soilType: 'Red Soil',
        preferredCrops: 'Vegetables',
        availabilityPeriod: 'Year-round',
        priceExpectation: '10000/month',
        landDescription: 'Small plot near city, ideal for organic vegetables.'
    }
];

export function seedData() {
    localStorage.setItem('profiles', JSON.stringify(MOCK_FARMERS));
    localStorage.setItem('landListings', JSON.stringify(MOCK_LANDS));
    window.location.reload();
}
