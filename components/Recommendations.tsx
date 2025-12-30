'use client'

import { useState, useEffect } from 'react'
import { getRecommendedLands, getRecommendedFarmers } from '@/utils/recommendation'
import { FarmerProfile, LandPlot, FarmerMatch, LandMatch } from '@/types/recommendation'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Recommendations() {
    const router = useRouter()
    const [matches, setMatches] = useState<(FarmerMatch | LandMatch)[]>([])
    const [userProfile, setUserProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        // 0. Check Login Status
        const currentUserData = localStorage.getItem('currentUser')
        if (!currentUserData) {
            setLoading(false)
            return
        }
        setIsLoggedIn(true)
        const currentUser = JSON.parse(currentUserData)

        if (currentUser) {
            // Convert localStorage data to the Shape required by recommendation engine
            // We need to map the form data to the Typed Interface

            if (currentUser.type === 'farmer') {
                // It's a farmer, looking for LAND
                const farmerProfile: FarmerProfile = {
                    id: currentUser.id,
                    name: currentUser.name,
                    location: currentUser.location, // "City, State"
                    email: currentUser.email,
                    yearsOfExperience: parseInt(currentUser.yearsOfExperience) || 0,
                    specialtyCrops: currentUser.crops ? currentUser.crops.split(',').map((c: string) => c.trim()) : [],
                    experienceLevel: currentUser.experienceLevel || 'Intermediate',
                    availability: currentUser.availability || 'Full-time',
                    expectedRate: currentUser.expectedRate || '',
                    latitude: currentUser.latitude,
                    longitude: currentUser.longitude
                }
                setUserProfile({ ...farmerProfile, userType: 'farmer' })

                // Fetch all lands
                const allLandsRaw = JSON.parse(localStorage.getItem('landListings') || '[]')
                const allLands: LandPlot[] = allLandsRaw.map((l: any) => ({
                    id: l.id,
                    ownerName: l.name,
                    location: l.landLocation || l.location,
                    sizeAcres: parseFloat(l.landSize) || 0,
                    soilType: l.soilType,
                    preferredCrops: l.preferredCrops ? l.preferredCrops.split(',').map((c: string) => c.trim()) : [],
                    availabilityPeriod: l.availabilityPeriod || 'Year-round',
                    priceExpectation: l.priceExpectation || l.expectedPrice || '',
                    latitude: l.latitude,
                    longitude: l.longitude
                }))

                const recommendations = getRecommendedLands(farmerProfile, allLands)
                setMatches(recommendations)

            } else {
                // It's a landowner, looking for FARMERS
                // Note: Ideally we'd need to know WHICH land plotting they want to match for.
                // For MVP demo, lets take their LAST created land listing.

                const allListings = JSON.parse(localStorage.getItem('landListings') || '[]')
                // FIND THE CORRECT LISTING FOR THIS USER
                // 1. Try matching by Owner ID (most robust)
                // 2. Fallback to Email matching (legacy/simple)
                const myListing = allListings.filter((l: any) => {
                    if (currentUser.id && l.ownerId) {
                        return l.ownerId === currentUser.id
                    }
                    // Fallback to email
                    return l.email?.toLowerCase().trim() === currentUser.email?.toLowerCase().trim()
                }).pop() // Taking the last created one as the "active" need

                if (myListing) {
                    const landPlot: LandPlot = {
                        id: myListing.id,
                        ownerName: myListing.name,
                        location: myListing.landLocation,
                        sizeAcres: parseFloat(myListing.landSize) || 0,
                        soilType: myListing.soilType || 'Loamy',
                        preferredCrops: myListing.preferredCrops ? myListing.preferredCrops.split(',').map((c: string) => c.trim()) : [],
                        availabilityPeriod: myListing.availabilityPeriod || 'Year-round',
                        priceExpectation: myListing.priceExpectation || '',
                        latitude: myListing.latitude,
                        longitude: myListing.longitude
                    }
                    setUserProfile({ ...landPlot, userType: 'landowner' }) // Just for context

                    // Fetch all farmers
                    const allProfiles = JSON.parse(localStorage.getItem('profiles') || '[]')
                    const allFarmers: FarmerProfile[] = allProfiles
                        .filter((p: any) => p.type === 'farmer')
                        .map((p: any) => ({
                            id: p.id,
                            name: p.name,
                            location: p.location,
                            email: p.email,
                            yearsOfExperience: parseInt(p.yearsOfExperience) || 0,
                            specialtyCrops: p.crops ? p.crops.split(',').map((c: string) => c.trim()) : [],
                            experienceLevel: p.experienceLevel || 'Intermediate',
                            availability: p.availability || 'Full-time',
                            expectedRate: p.expectedRate || p.priceExpectation || '',
                            latitude: p.latitude,
                            longitude: p.longitude
                        }))

                    const recommendations = getRecommendedFarmers(landPlot, allFarmers)
                    setMatches(recommendations)
                }
            }
        }
        setLoading(false)
    }, [])

    if (loading) return null

    // Login Overlay State
    if (!isLoggedIn) return (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mt-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[1px] z-0"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock Your Recommendations</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Log in to see personalized matches for your land or farming profile.
                    We match you based on location, crops, and availability.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/login" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition">
                        Login
                    </Link>
                    <Link href="/profile/create" className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )

    if (!userProfile) return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Your Profile</h3>
            <p className="text-gray-500 mb-4">We need a bit more info to find your perfect match.</p>
            <div className="flex justify-center gap-4">
                <Link href="/listings/lands/create" className="text-primary-600 font-medium hover:underline">List Land</Link>
                <span className="text-gray-300">|</span>
                <Link href="/profile/create?type=farmer" className="text-primary-600 font-medium hover:underline">Create Farmer Profile</Link>
            </div>
        </div>
    )

    if (matches.length === 0) return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8 text-center">
            <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Matches Found Yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                We couldn't find any listings that match your criteria perfectly right now.
                Be the first to browse all listings!
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/listings/farmers" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50">
                    Browse Farmers
                </Link>
                <Link href="/listings/lands" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50">
                    Browse Lands
                </Link>
            </div>
        </div>
    )

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Recommended Matches</h3>
                    <span className="text-sm text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full mt-2 inline-block">
                        Based on your {userProfile.userType === 'farmer' ? 'Skills' : 'Land Requirements'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match: any, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition bg-gray-50 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">
                                    {match.landLocation ? `Land in ${match.landLocation}` : match.name}
                                </h4>
                                {match.landSize && <p className="text-sm text-gray-600">{match.landSize} Acres</p>}
                                {match.userType === 'farmer' && <p className="text-sm text-gray-600">{match.location}</p>}
                            </div>
                            <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg h-fit">
                                {match.score}% Match
                            </div>
                        </div>

                        <div className="space-y-2 flex-grow">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Why this matches:</p>
                            <ul className="text-sm space-y-1">
                                {match.matchReasons.map((reason: string, rIdx: number) => (
                                    <li key={rIdx} className="flex items-start gap-2 text-gray-700">
                                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        <span>{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => {
                                const route = match.landLocation
                                    ? `/listings/lands/${match.id}`
                                    : `/listings/farmers/${match.id}`
                                router.push(route)
                            }}
                            className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition text-sm"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
