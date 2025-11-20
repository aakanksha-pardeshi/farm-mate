'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateLandListingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    landSize: '',
    landLocation: '',
    landDescription: '',
    soilType: '',
    waterAccess: '',
    infrastructure: '',
    farmerRequirements: '',
    compensation: '',
    duration: '',
    additionalNotes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    const landListings = JSON.parse(localStorage.getItem('landListings') || '[]')
    const newListing = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    landListings.push(newListing)
    localStorage.setItem('landListings', JSON.stringify(landListings))
    
    router.push('/listings/lands')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">List Your Land</h1>
      <p className="text-gray-600 mb-8">
        Share details about your land and the type of farmer you're looking for
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
                Your Location *
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
          </div>
        </div>

        {/* Land Details */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Land Details</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
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
              <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type *
              </label>
              <select
                id="soilType"
                name="soilType"
                required
                value={formData.soilType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select soil type</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silt">Silt</option>
                <option value="mixed">Mixed</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="landLocation" className="block text-sm font-medium text-gray-700 mb-2">
              Land Location (Address) *
            </label>
            <input
              type="text"
              id="landLocation"
              name="landLocation"
              required
              value={formData.landLocation}
              onChange={handleChange}
              placeholder="Full address or detailed location of the land"
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
              placeholder="Describe the land, terrain, current state, any existing structures, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="waterAccess" className="block text-sm font-medium text-gray-700 mb-2">
                Water Access *
              </label>
              <select
                id="waterAccess"
                name="waterAccess"
                required
                value={formData.waterAccess}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select water access</option>
                <option value="well">Well</option>
                <option value="river">River/Creek</option>
                <option value="irrigation">Irrigation System</option>
                <option value="rainwater">Rainwater Collection</option>
                <option value="none">No Water Access</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="infrastructure" className="block text-sm font-medium text-gray-700 mb-2">
                Infrastructure Available
              </label>
              <input
                type="text"
                id="infrastructure"
                name="infrastructure"
                value={formData.infrastructure}
                onChange={handleChange}
                placeholder="e.g., Fencing, Storage, Equipment"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Farmer Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Kind of Farmer Are You Looking For?</h2>
          
          <div>
            <label htmlFor="farmerRequirements" className="block text-sm font-medium text-gray-700 mb-2">
              Requirements & Preferences *
            </label>
            <textarea
              id="farmerRequirements"
              name="farmerRequirements"
              required
              rows={4}
              value={formData.farmerRequirements}
              onChange={handleChange}
              placeholder="Describe the type of farmer you're looking for, experience level, crops you're interested in, farming methods preferred (organic, conventional, etc.), etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="compensation" className="block text-sm font-medium text-gray-700 mb-2">
                Compensation/Arrangement
              </label>
              <select
                id="compensation"
                name="compensation"
                value={formData.compensation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select arrangement</option>
                <option value="rent">Rent</option>
                <option value="sharecrop">Sharecropping</option>
                <option value="lease">Lease</option>
                <option value="partnership">Partnership</option>
                <option value="free">Free Use</option>
                <option value="negotiable">Negotiable</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Expected Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 1 year, 5 years, Ongoing"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information or special requirements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Submit Land Listing
          </button>
          <Link
            href="/listings/lands"
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}






