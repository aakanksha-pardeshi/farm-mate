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
        pincode: '',
        landLocation: '',
        soilType: '',
        availabilityPeriod: '',
        electricityHours: '',
        waterAvailability: [] as string[],
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

    const [isWaterDropdownOpen, setIsWaterDropdownOpen] = useState(false);
    const waterOptions = ['Well', 'Borewell', 'Pond', 'River', 'Canal', 'None'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Attempt to save to server
            let serverId = null;
            try {
                const res = await fetch('/api/lands', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                const data = await res.json()
                if (data.success && data.data) {
                    serverId = data.data._id
                } else {
                    console.warn('Server save failed/skipped:', data.error);
                }
            } catch (err) {
                console.warn('Backend API unavailable, saving locally only.', err);
            }

            // Always save to localStorage (Offline/Demo Mode support)
            // Use server ID if available, else generate one
            const id = serverId || `local_${Date.now()}`;
            const newItem = { ...formData, id: id };

            const existing = JSON.parse(localStorage.getItem('landListings') || '[]')
            localStorage.setItem('landListings', JSON.stringify([...existing, newItem]))

            // Simulate delay for better UX if it was instant
            if (!serverId) await new Promise(r => setTimeout(r, 500));

            router.push('/listings/lands')
        } catch (error) {
            console.error('Critical Error:', error)
            alert('Failed to process listing')
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

    const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const numeric = val.replace(/[^0-9]/g, ''); // Ensure only numbers

        setFormData(prev => ({ ...prev, pincode: numeric }));

        if (numeric.length === 6) {
            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${numeric}`);
                const data = await res.json();
                if (data && data[0] && data[0].Status === 'Success') {
                    const po = data[0].PostOffice[0];
                    const locationStr = `${po.District}, ${po.State}`;
                    setFormData(prev => ({ ...prev, landLocation: locationStr }));
                }
            } catch (err) {
                console.error("Failed to fetch location", err);
            }
        }
    }

    const toggleWaterSource = (source: string) => {
        setFormData(prev => {
            const current = prev.waterAvailability;
            if (current.includes(source)) {
                return { ...prev, waterAvailability: current.filter(s => s !== source) };
            } else {
                return { ...prev, waterAvailability: [...current, source] };
            }
        });
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('pincode')}</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handlePincodeChange}
                                    maxLength={6}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. 422001"
                                />
                            </div>
                            <div className="md:col-span-2">
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
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-white text-gray-900"
                                >
                                    <option value="" className="text-gray-900">{t('selectSoilType')}</option>
                                    <option value="Black" className="text-gray-900">{t('soilTypes.Black')}</option>
                                    <option value="Red" className="text-gray-900">{t('soilTypes.Red')}</option>
                                    <option value="Alluvial" className="text-gray-900">{t('soilTypes.Alluvial')}</option>
                                    <option value="Laterite" className="text-gray-900">{t('soilTypes.Laterite')}</option>
                                    <option value="Sandy" className="text-gray-900">{t('soilTypes.Sandy')}</option>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('waterAvailability')}</label>
                                <button
                                    type="button"
                                    onClick={() => setIsWaterDropdownOpen(!isWaterDropdownOpen)}
                                    className="w-full px-4 py-3 text-left rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-white text-gray-900 flex justify-between items-center"
                                >
                                    <span className="truncate">
                                        {formData.waterAvailability.length > 0
                                            ? formData.waterAvailability.map(k => t(`waterSources.${k}`)).join(', ')
                                            : t('selectWaterSources')}
                                    </span>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                {isWaterDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                                        {waterOptions.map((option) => (
                                            <div key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => toggleWaterSource(option)}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.waterAvailability.includes(option)}
                                                    onChange={() => { }}
                                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                                />
                                                <span className="ml-3 text-gray-900">{t(`waterSources.${option}`)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('electricityHours')}</label>
                                <input
                                    type="number"
                                    name="electricityHours"
                                    value={formData.electricityHours}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. 12"
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
                                    type="number"
                                    name="priceExpectation"
                                    min="0"
                                    max="100"
                                    value={formData.priceExpectation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
                                    placeholder="e.g. 20"
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
