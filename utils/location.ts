export interface LocationData {
  city: string;
  state: string;
  climate: string;
  recommendedPrice: string;
  temperature: string;
  latitude?: number;
  longitude?: number;
}

const MOCK_LOCATION_DATA: Record<string, LocationData> = {
  // Keep mocks for fallback or fast demos
  '110001': { city: 'New Delhi', state: 'Delhi', climate: 'Semi-arid', recommendedPrice: '₹50,00,000', temperature: '25°C', latitude: 28.6139, longitude: 77.2090 },
  '400001': { city: 'Mumbai', state: 'Maharashtra', climate: 'Tropical wet and dry', recommendedPrice: '₹80,00,000', temperature: '28°C', latitude: 18.9388, longitude: 72.8353 },
  '560001': { city: 'Bangalore', state: 'Karnataka', climate: 'Tropical savanna', recommendedPrice: '₹60,00,000', temperature: '22°C', latitude: 12.9716, longitude: 77.5946 },
};

function getStateFromPincode(pincode: string): string {
  const firstDigit = pincode.charAt(0);
  const stateMap: Record<string, string> = {
    '1': 'Delhi', '2': 'Uttar Pradesh', '3': 'Gujarat', '4': 'Maharashtra',
    '5': 'Karnataka', '6': 'Tamil Nadu', '7': 'West Bengal', '8': 'Bihar', '9': 'Punjab'
  };
  return stateMap[firstDigit] || 'Unknown State';
}

function generateMockDetails(pincode: string): LocationData {
  const state = getStateFromPincode(pincode);
  const lastDigit = parseInt(pincode.charAt(5));
  const temps = ['24°C', '28°C', '32°C', '20°C', '35°C'];
  const climates = ['Semi-arid', 'Tropical', 'Humid Subtropical', 'Arid', 'Monsoon'];
  const prices = ['₹30,00,000', '₹45,00,000', '₹60,00,000', '₹25,00,000', '₹80,00,000'];

  return {
    city: `City-${pincode.substring(0, 3)}`,
    state: state,
    climate: climates[lastDigit % climates.length],
    recommendedPrice: prices[lastDigit % prices.length],
    temperature: temps[lastDigit % temps.length],
    // Approximate lat/long for India if unknown, centered roughly
    latitude: 20 + (lastDigit),
    longitude: 78 + (lastDigit)
  };
}

export async function getPincodeDetails(pincode: string): Promise<LocationData | null> {
  // 1. Validation
  if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
    return null;
  }

  // 2. Try Geocoding first (Async)
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&limit=1`, {
      headers: {
        'User-Agent': 'FarmMate-Student-Project/1.0' // Good practice for OSM
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const address = result.display_name.split(', ');
        // Heuristic to parse city/state from OSM display_name
        // Format usually: "Postal Code, Suburb, City, District, State, ISO, Country"
        const state = address[address.length - 3] || getStateFromPincode(pincode);
        const city = address[address.length - 4] || address[1] || 'Unknown City'; // Rough guess

        const mock = generateMockDetails(pincode); // For price/climate/temp

        return {
          ...mock,
          city: city,
          state: state,
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon)
        };
      }
    }
  } catch (error) {
    console.warn('Geocoding failed, falling back to mock data', error);
  }

  // 3. Fallback to Mock Data
  if (MOCK_LOCATION_DATA[pincode]) {
    return MOCK_LOCATION_DATA[pincode];
  }

  return generateMockDetails(pincode);
}
