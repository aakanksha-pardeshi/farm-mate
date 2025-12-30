export interface FarmerProfile {
    id: string;
    name: string;
    location: string;
    email: string;
    yearsOfExperience: number;
    specialtyCrops: string[];
    experienceLevel: 'Beginner' | 'Intermediate' | 'Experienced' | 'Expert';
    availability: 'Full-time' | 'Part-time' | 'Seasonal';
    latitude?: number;
    longitude?: number;
    expectedRate?: string; // e.g. "15000/month"
}

export interface LandPlot {
    id: string;
    ownerName: string;
    location: string;
    sizeAcres: number;
    soilType: string;
    preferredCrops: string[];
    priceExpectation?: string; // e.g. "20000/month"
    availabilityPeriod: string;
    latitude?: number;
    longitude?: number;
}

export interface MatchResult {
    score: number;
    matchReasons: string[];
}

export interface FarmerMatch extends FarmerProfile, MatchResult { }
export interface LandMatch extends LandPlot, MatchResult { }
