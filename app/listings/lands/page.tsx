'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LandListing {
  id: string
  type: 'landowner'
  name: string
  email: string
  phone: string
  location: string
  description?: string
  landSize: string
  landLocation: string
  landDescription: string
  farmerRequirements: string
  createdAt: string
  // New fields
  pincode?: string
  climate?: string
  temperature?: string
  priceExpectation?: string
  pastYield?: string
  image?: string
}

export default function LandListings() {
  const [listings, setListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLocation, setFilterLocation] = useState('')

  useEffect(() => {
    // Load listings from dedicated land listings only
    const dedicatedListings = JSON.parse(localStorage.getItem('landListings') || '[]')
    setListings(dedicatedListings)
    setLoading(false)
  }, [])

  const filteredListings = listings.filter(listing => {
    const matchesSearch =
      listing.landLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.landDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.climate && listing.climate.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLocation = filterLocation === '' || listing.landLocation.toLowerCase().includes(filterLocation.toLowerCase())

    return matchesSearch && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Land Listings</h1>
            <p className="text-gray-600">Discover premium agricultural land opportunities verified for partnership.</p>
          </div>
          <Link
            href="/listings/lands/create"
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition shadow-md flex items-center gap-2"
          >
            <span>+</span> List Your Land
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by location, description, or climate..."
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
              <option value="">All Locations</option>
              {Array.from(new Set(listings.map(l => l.landLocation))).map(loc => (
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
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters to find more results.</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterLocation('') }}
              className="text-primary-600 font-medium hover:text-primary-700 underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <Link key={listing.id} href={`/listings/lands/${listing.id}`} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-gray-100 overflow-hidden flex flex-col group cursor-pointer">
                {/* Card Header / Image */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="text-xl font-bold">{listing.landSize} Acres</h3>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <span>📍</span> {listing.landLocation}
                    </p>
                  </div>

                  {listing.image ? (
                    <img src={listing.image} alt="Land" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-300 text-4xl group-hover:scale-105 transition-transform duration-500">
                      🌱
                    </div>
                  )}

                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-700 flex items-center gap-1 shadow-sm">
                    <span>✓</span> Verified Owner
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.climate && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                        🌤 {listing.climate}
                      </span>
                    )}
                    {listing.temperature && (
                      <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-100">
                        🌡 {listing.temperature}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4 mb-6 flex-1">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                      <p className="text-gray-600 text-sm line-clamp-3">{listing.landDescription}</p>
                    </div>

                    {listing.priceExpectation && (
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <label className="text-xs font-semibold text-green-800 uppercase tracking-wider block mb-1">Expected Price</label>
                        <p className="text-green-700 font-bold">₹{listing.priceExpectation}</p>
                      </div>
                    )}

                    {listing.pastYield && (
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Past Yield</label>
                        <p className="text-gray-700 text-sm font-medium">{listing.pastYield}</p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                          {listing.name.charAt(0)}
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{listing.name}</p>
                          <p className="text-xs text-gray-500">Landowner</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${listing.phone}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
                      >
                        📞 Call
                      </a>
                      <a
                        href={`mailto:${listing.email}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition shadow-sm hover:shadow-md"
                      >
                        ✉️ Email
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
