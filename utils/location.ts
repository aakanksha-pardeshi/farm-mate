
interface LocationData {
  city: string;
  state: string;
  climate: string;
  recommendedPricePerAcre: string;
  temperature: string;
}

const MOCK_LOCATION_DATA: Record<string, LocationData> = {
  '110001': {
    city: 'New Delhi',
    state: 'Delhi',
    climate: 'Semi-arid',
    recommendedPricePerAcre: '₹50,00,000',
    temperature: '25°C'
  },
  '400001': {
    city: 'Mumbai',
    state: 'Maharashtra',
    climate: 'Tropical wet and dry',
    recommendedPricePerAcre: '₹80,00,000',
    temperature: '28°C'
  },
  '560001': {
    city: 'Bangalore',
    state: 'Karnataka',
    climate: 'Tropical savanna',
    recommendedPricePerAcre: '₹60,00,000',
    temperature: '22°C'
  },
  '600001': {
    city: 'Chennai',
    state: 'Tamil Nadu',
    climate: 'Tropical wet and dry',
    recommendedPricePerAcre: '₹45,00,000',
    temperature: '30°C'
  },
  '700001': {
    city: 'Kolkata',
    state: 'West Bengal',
    climate: 'Tropical wet and dry',
    recommendedPricePerAcre: '₹40,00,000',
    temperature: '27°C'
  },
  // Default fallback
  'default': {
    city: 'Unknown City',
    state: 'Unknown State',
    climate: 'Moderate',
    recommendedPricePerAcre: '₹30,00,000',
    temperature: '24°C'
  }
};

export function getPincodeDetails(pincode: string): LocationData {
  // Simulate API delay if needed, but synchronous for now
  return MOCK_LOCATION_DATA[pincode] || MOCK_LOCATION_DATA['default'];
}
