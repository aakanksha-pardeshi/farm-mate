'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type ProfileType = 'farmer' | 'landowner'

export default function CreateProfilePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [profileType, setProfileType] = useState<ProfileType>(
    (searchParams.get('type') as ProfileType) || 'farmer'
  )
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    experience: '',
    specialties: '',
    // Landowner specific
    landSize: '',
    landLocation: '',
    landDescription: '',
    farmerRequirements: '',
    // Farmer specific
    yearsOfExperience: '',
    crops: '',
    certifications: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]')
    const newProfile = {
      id: Date.now().toString(),
      type: profileType,
      ...formData,
      createdAt: new Date().toISOString(),
    }
    profiles.push(newProfile)
    localStorage.setItem('profiles', JSON.stringify(profiles))
    
    // Redirect based on type
    if (profileType === 'landowner') {
      router.push('/listings/lands')
    } else {
      router.push('/listings/farmers')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Create Your Profile</h1>

      {/* Profile Type Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          I am a:
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setProfileType('farmer')}
            className={`flex-1 px-6 py-4 rounded-lg border-2 transition ${
              profileType === 'farmer'
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-2xl mb-2">👨‍🌾</div>
            <div className="font-semibold">Farmer</div>
          </button>
          <button
            type="button"
            onClick={() => setProfileType('landowner')}
            className={`flex-1 px-6 py-4 rounded-lg border-2 transition ${
              profileType === 'landowner'
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-2xl mb-2">🏞️</div>
            <div className="font-semibold">Land Owner</div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Common Fields */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Farmer Specific Fields */}
        {profileType === 'farmer' && (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Farming Experience</h2>
            
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience *
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                required
                min="0"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="crops" className="block text-sm font-medium text-gray-700 mb-2">
                Crops/Products You Grow *
              </label>
              <input
                type="text"
                id="crops"
                name="crops"
                required
                value={formData.crops}
                onChange={handleChange}
                placeholder="e.g., Wheat, Corn, Vegetables, Fruits"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-2">
                Specialties
              </label>
              <input
                type="text"
                id="specialties"
                name="specialties"
                value={formData.specialties}
                onChange={handleChange}
                placeholder="e.g., Organic farming, Irrigation systems"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <textarea
                id="certifications"
                name="certifications"
                rows={3}
                value={formData.certifications}
                onChange={handleChange}
                placeholder="List any certifications or qualifications"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        {/* Landowner Specific Fields */}
        {profileType === 'landowner' && (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Land Information</h2>
            
            <div>
              <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-2">
                Land Size (acres) *
              </label>
              <input
                type="number"
                id="landSize"
                name="landSize"
                required
                min="0"
                step="0.1"
                value={formData.landSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="landLocation" className="block text-sm font-medium text-gray-700 mb-2">
                Land Location *
              </label>
              <input
                type="text"
                id="landLocation"
                name="landLocation"
                required
                value={formData.landLocation}
                onChange={handleChange}
                placeholder="Address or location of the land"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="landDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Land Description *
              </label>
              <textarea
                id="landDescription"
                name="landDescription"
                required
                rows={4}
                value={formData.landDescription}
                onChange={handleChange}
                placeholder="Describe the land, soil type, water access, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="farmerRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                What Kind of Farmer Are You Looking For? *
              </label>
              <textarea
                id="farmerRequirements"
                name="farmerRequirements"
                required
                rows={4}
                value={formData.farmerRequirements}
                onChange={handleChange}
                placeholder="Describe the type of farmer, experience level, crops you're interested in, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Create Profile
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

