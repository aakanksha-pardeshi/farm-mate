'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPincodeDetails } from '@/utils/location'

function CreateProfileContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')

  const [userType, setUserType] = useState<'landowner' | 'farmer'>(
    (typeParam as 'landowner' | 'farmer') || 'landowner'
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    experience: '',
    specialties: '',
    // Farmer specific
    yearsOfExperience: '',
    experienceLevel: 'Intermediate', // Default
    crops: '',
    availability: 'Full-time', // Default
    certifications: '',
    expectedRate: '', // Farmer's price expectation
    pincode: '',
  })

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setFormData(prev => ({ ...prev, pincode: val }))

    if (val.length === 6) {
      const fetchDetails = async () => {
        const details = await getPincodeDetails(val)
        if (details) {
          setFormData(prev => ({
            ...prev,
            pincode: val,
            location: `${details.city}, ${details.state}`,
            latitude: details.latitude,
            longitude: details.longitude
          } as any))
        }
      }
      fetchDetails()
    }
  }

  useEffect(() => {
    if (typeParam === 'farmer' || typeParam === 'landowner') {
      setUserType(typeParam)
    }
  }, [typeParam])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const profile = {
      id: Date.now().toString(),
      type: userType,
      ...formData,
      createdAt: new Date().toISOString(),
    }

    const existingProfiles = JSON.parse(localStorage.getItem('profiles') || '[]')
    localStorage.setItem('profiles', JSON.stringify([...existingProfiles, profile]))

    if (userType === 'landowner') {
      // Redirect landowners to create a listing
      router.push('/listings/lands?newProfile=true')
    } else {
      router.push('/listings/farmers')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-primary-900 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-f819634473ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Create Your Profile</h2>
              <p className="text-primary-200">Join the FarmMate community and start connecting.</p>
            </div>
          </div>

          {/* Type Selection */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex justify-center">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
              <button
                onClick={() => setUserType('landowner')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'landowner'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                I Own Land
              </button>
              <button
                onClick={() => setUserType('farmer')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'farmer'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                I&apos;m a Farmer
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs">1</span>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                    placeholder="Enter 6-digit Pincode"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location (City, State)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-gray-50"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Auto-filled from Pincode"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Description</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="Tell us a bit about yourself..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            {/* Farmer Specific Fields */}
            {userType === 'farmer' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs">2</span>
                  Experience & Expertise
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty Crops</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="e.g. Wheat, Rice, Organic Vegetables"
                      value={formData.crops}
                      onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Experienced">Experienced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. Organic Farming Certificate"
                    value={formData.certifications}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Rate / Price</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. 15000/month or 40% crop share"
                    value={formData.expectedRate}
                    onChange={(e) => setFormData({ ...formData, expectedRate: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/25"
              >
                Create Profile
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                By creating a profile, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function CreateProfile() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
      <CreateProfileContent />
    </Suspense>
  )
}
