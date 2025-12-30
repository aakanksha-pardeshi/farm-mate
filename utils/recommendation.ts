import { FarmerProfile, LandPlot, MatchResult, FarmerMatch, LandMatch } from '@/types/recommendation';

const WEIGHTS = {
    LOCATION: 0.45,   // Priority 1: Distance
    PRICE: 0.25,      // Priority 2: Price
    CROP_MATCH: 0.20,
    EXPERIENCE: 0.05,
    AVAILABILITY: 0.05,
};

function parsePrice(priceStr?: string): { value: number, isShare: boolean } | null {
    if (!priceStr) return null;
    const str = priceStr.toLowerCase();
    const isShare = str.includes('%') || str.includes('share');
    const numbers = str.match(/(\d+)/);
    if (numbers) {
        return { value: parseInt(numbers[0]), isShare };
    }
    return null;
}

function calculateMatchScore(
    farmer: FarmerProfile,
    land: LandPlot
): MatchResult {
    let score = 0;
    const reasons: string[] = [];

    // 1. Location Match (Geospatial or String Fallback) - HIGHEST PRIORITY
    const hasCoordinates = farmer.latitude && farmer.longitude && land.latitude && land.longitude;

    if (hasCoordinates) {
        // Haversine Formula
        const R = 6371; // km
        const dLat = (land.latitude! - farmer.latitude!) * Math.PI / 180;
        const dLon = (land.longitude! - farmer.longitude!) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(farmer.latitude! * Math.PI / 180) * Math.cos(land.latitude! * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance <= 20) { // Very Close
            score += WEIGHTS.LOCATION * 100;
            reasons.push(`Top Location: Only ~${Math.round(distance)}km away`);
        } else if (distance <= 50) { // Close
            score += WEIGHTS.LOCATION * 80;
            reasons.push(`Close proximity: ~${Math.round(distance)}km away`);
        } else if (distance <= 150) { // Reasonable
            score += WEIGHTS.LOCATION * 40;
            reasons.push(`Reasonable distance: ~${Math.round(distance)}km away`);
        }
    } else {
        // Fallback to string matching
        if (
            farmer.location.toLowerCase().includes(land.location.toLowerCase()) ||
            land.location.toLowerCase().includes(farmer.location.toLowerCase())
        ) {
            score += WEIGHTS.LOCATION * 60;
            reasons.push(`Location match: ${farmer.location}`);
        }
    }

    // 2. Price Match - SECOND PRIORITY
    const farmerPrice = parsePrice(farmer.expectedRate);
    const landPrice = parsePrice(land.priceExpectation);

    if (farmerPrice && landPrice) {
        if (farmerPrice.isShare === landPrice.isShare) {
            // Both are percentage share OR both are fixed rate
            const ratio = Math.min(farmerPrice.value, landPrice.value) / Math.max(farmerPrice.value, landPrice.value);

            // If values are within 20% of each other
            if (ratio >= 0.8) {
                score += WEIGHTS.PRICE * 100;
                reasons.push(`Price match: Budget aligns perfectly`);
            } else if (ratio >= 0.6) {
                score += WEIGHTS.PRICE * 60;
                reasons.push(`Price within negotiable range`);
            }
        }
    } else if (!farmer.expectedRate && !land.priceExpectation) {
        // Both negotiable/unspecified
        score += WEIGHTS.PRICE * 100;
        reasons.push('Price: Open for negotiation');
    }

    // 3. Crop Match
    const commonCrops = farmer.specialtyCrops.filter(crop =>
        land.preferredCrops.some(
            pc => pc.toLowerCase().trim() === crop.toLowerCase().trim()
        )
    );

    if (commonCrops.length > 0) {
        score += WEIGHTS.CROP_MATCH * 100;
        reasons.push(`Matches crops: ${commonCrops.join(', ')}`);
    }

    // 4. Experience Match
    // Simple heuristic: Larger lands prefer more experienced farmers
    if (land.sizeAcres > 5 && ['Experienced', 'Expert'].includes(farmer.experienceLevel)) {
        score += WEIGHTS.EXPERIENCE * 100;
        reasons.push('Experience level suitable for land size');
    } else if (land.sizeAcres <= 5) {
        // Any experience is fine for smaller plots, but beginner is perfectly adequate
        score += WEIGHTS.EXPERIENCE * 100; // Full points for not mismatched
    }

    // 5. Availability Match
    // Heuristic: "Year-round" land needs "Full-time" farmer
    if (land.availabilityPeriod === 'Year-round' && farmer.availability === 'Full-time') {
        score += WEIGHTS.AVAILABILITY * 100;
        reasons.push('Availability aligns (Full-time needed)');
    } else if (land.availabilityPeriod !== 'Year-round' && farmer.availability === 'Seasonal') {
        score += WEIGHTS.AVAILABILITY * 100;
        reasons.push('Availability aligns (Seasonal)');
    } else {
        // Partial points for flexibility
        score += WEIGHTS.AVAILABILITY * 50;
    }

    return {
        score: Math.round(score),
        matchReasons: reasons
    };
}

export function getRecommendedLands(
    farmer: FarmerProfile,
    lands: LandPlot[],
    limit: number = 3
): LandMatch[] {
    return lands
        .map(land => {
            const match = calculateMatchScore(farmer, land);
            return { ...land, ...match };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

export function getRecommendedFarmers(
    land: LandPlot,
    farmers: FarmerProfile[],
    limit: number = 3
): FarmerMatch[] {
    return farmers
        .map(farmer => {
            const match = calculateMatchScore(farmer, land);
            return { ...farmer, ...match };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}
