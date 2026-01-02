'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function CreateLandListing() {
    const router = useRouter()
    const t = useTranslations('LandListing')
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
        images: [] as string[]
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const newImages: string[] = []
            const fileReaders: Promise<string>[] = []

            Array.from(files).forEach(file => {
                const reader = new FileReader()
                const promise = new Promise<string>((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result as string)
                    }
                })
                reader.readAsDataURL(file)
                fileReaders.push(promise)
            })

            Promise.all(fileReaders).then(results => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...results]
                }))
            })
        }
    }

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/listings/lands" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                        &larr; {t('backToListings')}
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">{t('title')}</h1>
                    <p className="text-gray-600 mt-2">{t('subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    {/* Basic Info */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">{t('basicInfo')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('landSize')} *</label>
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('location')} *</label>
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
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('uploadImage')} (Multiple)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                            />
                            {formData.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <img src={img} alt={`Preview ${idx}`} className="h-32 w-full object-cover rounded-xl" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Land Details */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">{t('characteristics')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('soilType')} *</label>
                                <select
                                    required
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-white"
                                >
                                    <option value="">{t('selectSoilType')}</option>
                                    <option value="Black">{t('soilTypes.Black')}</option>
                                    <option value="Red">{t('soilTypes.Red')}</option>
                                    <option value="Alluvial">{t('soilTypes.Alluvial')}</option>
                                    <option value="Laterite">{t('soilTypes.Laterite')}</option>
                                    <option value="Sandy">{t('soilTypes.Sandy')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('availabilityPeriod')} *</label>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('description')}</label>
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
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">{t('financials')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('expectedPrice')}</label>
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('preferredCrops')}</label>
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
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">{t('contactInfo')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('yourName')} *</label>
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('phoneNumber')} *</label>
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
                            {loading ? t('publishing') : t('publishButton')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
