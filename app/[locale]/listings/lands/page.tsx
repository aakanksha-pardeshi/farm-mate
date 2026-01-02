'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function LandListings() {
    const t = useTranslations('LandListing')
    const [listings, setListings] = useState<any[]>([])
    const [recommendedListings, setRecommendedListings] = useState<any[]>([])
    const [otherListings, setOtherListings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterLocation, setFilterLocation] = useState('')

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch('/api/lands')
                const data = await res.json()
                console.log('API Response:', data)
                let fetchedListings = []

                if (data.success) {
                    fetchedListings = data.data
                    console.log('Fetched Listings:', fetchedListings)
                } else {
                    // Fallback to localStorage
                    const localListings = JSON.parse(localStorage.getItem('landListings') || '[]')
                    fetchedListings = localListings
                }

                // Apply Location-based Recommendation Sorting
                // Apply Location-based Recommendation Sorting
                let recommended: any[] = []
                let others: any[] = [...fetchedListings]

                try {
                    const currentUserData = localStorage.getItem('currentUser')
                    if (currentUserData) {
                        const currentUser = JSON.parse(currentUserData)
                        // If user has a location, prioritize listings from that location
                        if (currentUser.location) {
                            const userLocation = currentUser.location.toLowerCase()

                            recommended = fetchedListings.filter((l: any) => {
                                const loc = (l.landLocation || '').toLowerCase()
                                return loc.includes(userLocation) || userLocation.includes(loc)
                            })

                            others = fetchedListings.filter((l: any) => {
                                const loc = (l.landLocation || '').toLowerCase()
                                return !(loc.includes(userLocation) || userLocation.includes(loc))
                            })
                        }
                    }
                } catch (err) {
                    console.error('Error parsing user data for recommendations:', err)
                }

                console.log('State Updates -> Listings:', fetchedListings.length, 'Recommended:', recommended.length, 'Others:', others.length)
                setListings(fetchedListings)
                setRecommendedListings(recommended)
                setOtherListings(others)
            } catch (error) {
                console.error('Error fetching listings:', error)
                const localListings = JSON.parse(localStorage.getItem('landListings') || '[]')
                setListings(localListings)
            } finally {
                setLoading(false)
            }
        }

        fetchListings()
    }, [])

    const filterListings = (list: any[]) => {
        return list.filter(listing => {
            const matchesSearch =
                (listing.landLocation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (listing.landDescription?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (listing.soilType?.toLowerCase() || '').includes(searchTerm.toLowerCase())

            const matchesLocation = filterLocation === '' || listing.landLocation === filterLocation

            return matchesSearch && matchesLocation
        })
    }

    const filteredRecommended = filterListings(recommendedListings)
    const filteredOthers = filterListings(otherListings)
    // Keep original filteredListings for backward compatibility or "all" view if needed, 
    // but we will use the split lists for rendering.
    const filteredListings = filterListings(listings)

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('availableListings')}</h1>
                        <p className="text-gray-600">{t('listingsSubtitle')}</p>
                    </div>
                    <Link
                        href="/listings/lands/create"
                        className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition shadow-md flex items-center gap-2"
                    >
                        <span>+</span> {t('listYourLand')}
                    </Link>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="md:w-1/4">
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-white"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                        >
                            <option value="">{t('allLocations')}</option>
                            {Array.from(new Set(listings.map(l => l.landLocation))).filter(Boolean).map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Recommended Section */}
                        {filteredRecommended.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="text-yellow-500">★</span> {t('recommendedSection')}
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredRecommended.map((listing) => (
                                        <ListingCard key={listing._id || listing.id} listing={listing} t={t} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* All/Other Listings Section */}
                        <section>
                            {filteredRecommended.length > 0 && (
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('availableListings')}</h2>
                            )}

                            {filteredOthers.length === 0 && filteredRecommended.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                                    <div className="text-6xl mb-4">🌾</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noListings')}</h3>
                                    <p className="text-gray-500 mb-6">{t('noListingsSubtitle')}</p>
                                    <button
                                        onClick={() => { setSearchTerm(''); setFilterLocation('') }}
                                        className="text-primary-600 font-medium hover:text-primary-700 underline"
                                    >
                                        {t('clearFilters')}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredOthers.map((listing) => (
                                        <ListingCard key={listing._id || listing.id} listing={listing} t={t} />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}

function ListingCard({ listing, t }: { listing: any, t: any }) {
    return (
        <Link
            href={`/listings/lands/${listing._id || listing.id}`}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-gray-100 overflow-hidden flex flex-col group cursor-pointer"
        >
            {/* Card Header / Image */}
            <div className="h-48 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-xl font-bold">{listing.landSize} Acres</h3>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                        <span>📍</span> {listing.landLocation}
                    </p>
                </div>

                {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0]} alt="Land" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : listing.image ? (
                    <img src={listing.image} alt="Land" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-300 text-4xl group-hover:scale-105 transition-transform duration-500">
                        🌱
                    </div>
                )}

                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-700 flex items-center gap-1 shadow-sm">
                    <span>✓</span> {t('verifiedOwner')}
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                    {listing.soilType && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                            🪨 {t(`soilTypes.${listing.soilType}`)}
                        </span>
                    )}
                    {listing.availabilityPeriod && (
                        <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-100">
                            📅 {listing.availabilityPeriod}
                        </span>
                    )}
                </div>

                <div className="space-y-4 mb-6 flex-1">
                    <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('description')}</label>
                        <p className="text-gray-600 text-sm line-clamp-3">{listing.landDescription}</p>
                    </div>

                    {listing.priceExpectation && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <label className="text-xs font-semibold text-green-800 uppercase tracking-wider block mb-1">{t('expectedPrice')}</label>
                            <p className="text-green-700 font-bold">{listing.priceExpectation}</p>
                        </div>
                    )}
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                                {listing.name?.charAt(0) || 'U'}
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">{listing.name}</p>
                                <p className="text-xs text-gray-500">{t('landowner')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

