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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Profiles</h1>
            <p className="text-gray-600">Discover skilled farmers looking for opportunities</p>
          </div>
          <Link
            href="/profile/create?type=farmer"
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition shadow-md"
          >
            Create Farmer Profile
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, location, crops..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Location
              </label>
              <input
                type="text"
                id="location"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                placeholder="Enter location..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="crops" className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Crops
              </label>
              <input
                type="text"
                id="crops"
                value={filterCrops}
                onChange={(e) => setFilterCrops(e.target.value)}
                placeholder="Enter crop type..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Farmers Grid */}
        {filteredFarmers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4">👨‍🌾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Farmer Profiles Found</h3>
            <p className="text-gray-500 mb-6">
              {farmers.length === 0
                ? "Be the first farmer to create a profile!"
                : "Try adjusting your search or filter criteria."}
            </p>
            {farmers.length === 0 && (
              <Link
                href="/profile/create?type=farmer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition shadow-md"
              >
                Create Farmer Profile
              </Link>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFarmers.map((farmer) => (
              <div key={farmer.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] hover:border-primary-500 transition duration-300 flex flex-col group cursor-pointer" onClick={() => window.location.href = `/profile/${farmer.id}`}>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition">{farmer.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">📍 {farmer.location}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                      <span className="font-semibold w-24">Experience:</span>
                      <span>{farmer.yearsOfExperience} years</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                      <span className="font-semibold w-24">Crops:</span>
                      <span className="truncate">{farmer.crops}</span>
                    </div>
                    {farmer.specialties && (
                      <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                        <span className="font-semibold w-24">Specialties:</span>
                        <span className="truncate">{farmer.specialties}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 text-sm line-clamp-3 italic">"{farmer.description}"</p>
                  </div>

                  {farmer.certifications && (
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Certifications</p>
                      <p className="text-sm text-gray-600 line-clamp-2 bg-green-50 text-green-700 px-2 py-1 rounded inline-block">
                        {farmer.certifications}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/profile/${farmer.id}`;
                      }}
                      className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-3 rounded-xl text-sm font-bold hover:bg-gray-200 transition shadow-sm"
                    >
                      View Profile
                    </button>
                    <a
                      href={`mailto:${farmer.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center bg-primary-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-primary-700 transition shadow-sm"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          Showing {filteredFarmers.length} of {farmers.length} farmer profiles
        </div>
      </div>
    </div>
  )
}




