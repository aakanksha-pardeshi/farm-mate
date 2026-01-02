'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface FarmerProfile {
  id: string
  type: string
  name: string
  email: string
  phone: string
  location: string
  description: string
  yearsOfExperience: string
  crops: string
  specialties: string
  certifications: string
  createdAt: string
}

export default function FarmersListingPage() {
  const [farmers, setFarmers] = useState<FarmerProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterCrops, setFilterCrops] = useState('')

  useEffect(() => {
    // Load farmer profiles from localStorage
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]')
    const farmerProfiles = profiles.filter((p: any) => p.type === 'farmer')
    setFarmers(farmerProfiles)
    setLoading(false)
  }, [])

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch = 
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.crops.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.specialties.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = !filterLocation || 
      farmer.location.toLowerCase().includes(filterLocation.toLowerCase())
    
    const matchesCrops = !filterCrops || 
      farmer.crops.toLowerCase().includes(filterCrops.toLowerCase())
    
    return matchesSearch && matchesLocation && matchesCrops
  })

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-white dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading farmer profiles...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Farmer Profiles</h1>
          <p className="text-gray-600 dark:text-gray-300">Discover skilled farmers looking for opportunities</p>
        </div>
        <Link
          href="/profile/create?type=farmer"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Create Farmer Profile
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, location, crops..."
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
          <div>
            <label htmlFor="crops" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Crops
            </label>
            <input
              type="text"
              id="crops"
              value={filterCrops}
              onChange={(e) => setFilterCrops(e.target.value)}
              placeholder="Enter crop type..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Farmers Grid */}
      {filteredFarmers.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="text-6xl mb-4">👨‍🌾</div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No Farmer Profiles Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {farmers.length === 0
              ? "Be the first farmer to create a profile!"
              : "Try adjusting your search or filter criteria."}
          </p>
          {farmers.length === 0 && (
            <Link
              href="/profile/create?type=farmer"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Create Farmer Profile
            </Link>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{farmer.name}</h3>
                    <p className="text-sm text-gray-600">📍 {farmer.location}</p>
                  </div>
                  <span className="text-2xl">👨‍🌾</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Experience:</span>
                    <span className="ml-2">{farmer.yearsOfExperience} years</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Crops:</span>
                    <span className="ml-2">{farmer.crops}</span>
                  </div>
                  {farmer.specialties && (
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium">Specialties:</span>
                      <span className="ml-2">{farmer.specialties}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {farmer.description}
                </p>

                {farmer.certifications && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Certifications:</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {farmer.certifications}
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t flex gap-2">
                  <a
                    href={`mailto:${farmer.email}`}
                    className="flex-1 text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition"
                  >
                    Contact
                  </a>
                  <a
                    href={`tel:${farmer.phone}`}
                    className="flex-1 text-center border-2 border-primary-600 text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-50 transition"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
        Showing {filteredFarmers.length} of {farmers.length} farmer profiles
      </div>
    </div>
  )
}




