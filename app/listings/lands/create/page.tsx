'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getPincodeDetails } from '@/utils/location'

export default function CreateLandListing() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '', // Landowner's location
    description: '', // Landowner's bio

    // Land Details
    landSize: '',
    landLocation: '',
    pincode: '',
    landDescription: '',
    farmerRequirements: '',

    // New Fields
    climate: '',
    temperature: '',
    soilType: 'Loamy', // Default
    availabilityPeriod: 'Year-round', // Default
    preferredCrops: '',
    priceExpectation: '',
    pastYield: '',
    image: '', // Base64 string
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [recommendationInfo, setRecommendationInfo] = useState<{ price: string, count: number } | null>(null)



  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser')
    if (userStr) {
      const user = JSON.parse(userStr)
      setCurrentUser(user)
      if (user.type === 'landowner' || user.type === 'farmer') {
        setFormData(prev => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        }))
      }
    }
  }, [])

  const calculateRecommendedPrice = (location: string) => {
    const existingListings = JSON.parse(localStorage.getItem('landListings') || '[]')
    const similarListings = existingListings.filter((l: any) =>
      l.landLocation.toLowerCase().includes(location.toLowerCase()) ||
      location.toLowerCase().includes(l.landLocation.toLowerCase())
    )

    if (similarListings.length > 0) {
      const totalPerAcre = similarListings.reduce((acc: number, curr: any) => {
        // Try to extract numeric price from string like "50000/acre"
        const priceMatch = curr.priceExpectation?.match(/(\d+)/)
        const price = priceMatch ? parseInt(priceMatch[0]) : 0
        const size = parseFloat(curr.landSize) || 1
        return acc + (price / size)
      }, 0)

      const avgPerAcre = totalPerAcre / similarListings.length
      setRecommendationInfo({
        price: `₹${Math.round(avgPerAcre).toLocaleString()}/acre`,
        count: similarListings.length
      })
    } else {
      setRecommendationInfo(null)
    }
  }

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value
    setFormData(prev => ({ ...prev, pincode }))

    if (pincode.length === 6) {
      const fetchDetails = async () => {
        const details = await getPincodeDetails(pincode)
        if (details) {
          const newLocation = `${details.city}, ${details.state}`
          setFormData(prev => ({
            ...prev,
            landLocation: newLocation,
            climate: details.climate,
            temperature: details.temperature,
            latitude: details.latitude,
            longitude: details.longitude
          } as any))
          calculateRecommendedPrice(newLocation)
        }
      }
      fetchDetails()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setFormData(prev => ({ ...prev, image: base64String }))
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const listing = {
      id: Date.now().toString(),
      type: 'landowner',
      ownerId: currentUser?.id, // Link to the user
      ...formData,
      createdAt: new Date().toISOString(),
    }

    const existingListings = JSON.parse(localStorage.getItem('landListings') || '[]')
    localStorage.setItem('landListings', JSON.stringify([...existingListings, listing]))

    // Simulate network delay for better UX
    setTimeout(() => {
      router.push('/listings/lands')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-primary-900 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">List Your Land</h2>
              <p className="text-primary-200">Share your land details and find the perfect farming partner.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Section 1: Land Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm">1</span>
                Land Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Land Size (Acres)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. 5.5"
                    value={formData.landSize}
                    onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode (Auto-detect details)</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. 110001"
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                  />
                </div>
              </div>

              {/* Auto-filled Details */}
              <div className="bg-secondary-50 p-6 rounded-xl border border-secondary-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    readOnly
                    className="w-full bg-white px-3 py-2 rounded border border-gray-200 text-gray-600"
                    value={formData.landLocation}
                    placeholder="Auto-filled from pincode"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Climate</label>
                  <input
                    type="text"
                    readOnly
                    className="w-full bg-white px-3 py-2 rounded border border-gray-200 text-gray-600"
                    value={formData.climate}
                    placeholder="Auto-filled"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Avg. Temp</label>
                  <input
                    type="text"
                    readOnly
                    className="w-full bg-white px-3 py-2 rounded border border-gray-200 text-gray-600"
                    value={formData.temperature}
                    placeholder="Auto-filled"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Land Photos</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition overflow-hidden relative">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-4xl mb-2">📸</span>
                        <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload land image</p>
                        <p className="text-xs text-gray-400">PNG, JPG or WEBP (Max. 5MB)</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land Description</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="Describe soil quality, water access, infrastructure, etc."
                value={formData.landDescription}
                onChange={(e) => setFormData({ ...formData, landDescription: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                >
                  <option value="Loamy">Loamy</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Silt">Silt</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability Period</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white"
                  value={formData.availabilityPeriod}
                  onChange={(e) => setFormData({ ...formData, availabilityPeriod: e.target.value })}
                >
                  <option value="Year-round">Year-round</option>
                  <option value="Kharif Season">Kharif Season (June-Oct)</option>
                  <option value="Rabi Season">Rabi Season (Oct-March)</option>
                  <option value="Summer Season">Summer Season (March-June)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Crops</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="e.g. Wheat, Rice, Cotton (Comma separated)"
                  value={formData.preferredCrops}
                  onChange={(e) => setFormData({ ...formData, preferredCrops: e.target.value })}
                />
              </div>
            </div>

            {/* Section 2: Financials & Yield */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm">2</span>
                Financials & History
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price / Arrangement</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. 50000/acre or 50% crop share"
                    value={formData.priceExpectation}
                    onChange={(e) => setFormData({ ...formData, priceExpectation: e.target.value })}
                  />
                  {recommendationInfo && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <span>💡</span> Recommended: {recommendationInfo.price} (Based on {recommendationInfo.count} similar listings)
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Past Yield (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. 20 quintals wheat last season"
                    value={formData.pastYield}
                    onChange={(e) => setFormData({ ...formData, pastYield: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm">3</span>
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    Publishing Listing...
                  </>
                ) : (
                  'Publish Listing'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
