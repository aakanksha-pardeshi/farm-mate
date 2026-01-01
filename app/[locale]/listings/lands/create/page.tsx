'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function CreateLandListing() {
    const router = useRouter()
    const t = useTranslations('Common')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        landSize: '',
        landLocation: '',
        soilType: '',
        availabilityPeriod: '',
        landDescription: '',
        priceExpectation: '',
        preferredCrops: '',
        climate: '',
        temperature: '',
        pastYield: '',
        name: '',
        email: '',
        phone: '',
        image: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/lands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (data.success) {
                // Also save to localStorage for backward compatibility if needed
                const existing = JSON.parse(localStorage.getItem('landListings') || '[]')
                localStorage.setItem('landListings', JSON.stringify([...existing, { ...formData, id: data.data._id }]))
                
                router.push('/listings/lands')
            } else {
                alert('Error creating listing: ' + data.error)
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Failed to create listing')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/listings/lands" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                        &larr; Back to Listings
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">List Your Agricultural Land</h1>
                    <p className="text-gray-600 mt-2">Provide details about your land to connect with the right farmers.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    {/* Basic Info */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Land Size (Acres) *</label>
                                <input
                                    required
                                    type="number"
                                    name="landSize"
                                    value={formData.landSize}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. 5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                                <input
                                    required
                                    type="text"
                                    name="landLocation"
                                    value={formData.landLocation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. Nashik, Maharashtra"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Land Details */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Land Characteristics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Soil Type *</label>
                                <select
                                    required
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-white"
                                >
                                    <option value="">Select Soil Type</option>
                                    <option value="Black">Black Soil</option>
                                    <option value="Red">Red Soil</option>
                                    <option value="Alluvial">Alluvial Soil</option>
                                    <option value="Laterite">Laterite Soil</option>
                                    <option value="Sandy">Sandy Soil</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Availability Period *</label>
                                <input
                                    required
                                    type="text"
                                    name="availabilityPeriod"
                                    value={formData.availabilityPeriod}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. 2 Years / 3 Seasons"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                name="landDescription"
                                value={formData.landDescription}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                placeholder="Describe your land, water availability, road access, etc."
                            ></textarea>
                        </div>
                    </section>

                    {/* Financials & Crops */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Financials & Crops</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Price / Arrangement</label>
                                <input
                                    type="text"
                                    name="priceExpectation"
                                    value={formData.priceExpectation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. ₹50,000/year or 30% crop share"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Crops</label>
                                <input
                                    type="text"
                                    name="preferredCrops"
                                    value={formData.preferredCrops}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. Grapes, Sugarcane, Wheat"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="pt-6">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition shadow-lg shadow-primary-500/30 disabled:opacity-50"
                        >
                            {loading ? 'Publishing...' : 'Publish Land Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
