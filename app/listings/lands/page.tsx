'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LandListing {
  id: string
  type?: string
  name: string
  email: string
  phone: string
  location: string // Owner location
  pincode?: string
  climate?: string
  temperature?: string
  description?: string
  landSize: string
  landLocation: string
  landDescription: string
  farmerRequirements: string
  soilType?: string
  waterAccess?: string
  infrastructure?: string
  compensation?: string
  priceExpectation?: string
  pastYield?: string
  duration?: string
  createdAt: string
}

export default function LandListingsPage() {
  const [listings, setListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLocation, setFilterLocation] = useState('')

  useEffect(() => {
    // Load listings ONLY from dedicated land listings
    const dedicatedListings = JSON.parse(localStorage.getItem('landListings') || '[]')

    setListings(dedicatedListings)
    setLoading(false)
  }, [])

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.landLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.landDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.farmerRequirements.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !filterLocation ||
      listing.location.toLowerCase().includes(filterLocation.toLowerCase()) ||
      listing.landLocation.toLowerCase().includes(filterLocation.toLowerCase())

    return matchesSearch && matchesLocation
  })

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-white dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading listings...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Land Listings</h1>
          <p className="text-gray-600 dark:text-gray-300">Find available land for farming</p>
        </div>
        <Link
          href="/listings/lands/create"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          List Your Land
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, location, or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Location
            </label>
            <input
              type="text"
              id="location"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              placeholder="Enter location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="text-6xl mb-4">🌾</div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No Land Listings Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {listings.length === 0
              ? "Be the first to list your land!"
              : "Try adjusting your search or filter criteria."}
          </p>
          {listings.length === 0 && (
            <Link
              href="/listings/lands/create"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              List Your Land
            </Link>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{listing.name}</h3>
                    <p className="text-sm text-gray-600">📍 {listing.landLocation || listing.location}</p>
                  </div>
                  <span className="text-2xl">🏞️</span>
                </div>

                {listing.climate && (
                  <div className="mb-4 flex gap-2 flex-wrap">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      🌡️ {listing.temperature}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      🌤️ {listing.climate}
                    </span>
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium w-24">Land Size:</span>
                    <span>{listing.landSize} acres</span>
                  </div>
                  {listing.soilType && (
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-24">Soil Type:</span>
                      <span className="capitalize">{listing.soilType}</span>
                    </div>
                  )}
                  {listing.waterAccess && (
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-24">Water:</span>
                      <span className="capitalize">{listing.waterAccess}</span>
                    </div>
                  )}
                  {listing.priceExpectation && (
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-24">Price:</span>
                      <span className="font-semibold text-green-700">{listing.priceExpectation}</span>
                    </div>
                  )}
                  {listing.pastYield && (
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium w-24">Past Yield:</span>
                      <span>{listing.pastYield}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {listing.landDescription}
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Looking for:</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {listing.farmerRequirements}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto flex gap-2">
                <a
                  href={`mailto:${listing.email}`}
                  className="flex-1 text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition"
                >
                  Contact
                </a>
                <a
                  href={`tel:${listing.phone}`}
                  className="flex-1 text-center border-2 border-primary-600 text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-50 transition"
                >
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
        Showing {filteredListings.length} of {listings.length} listings
      </div>
    </div>
  )
}
