'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { getPincodeDetails } from '@/utils/location'

function EditProfileContent() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [userType, setUserType] = useState<'landowner' | 'farmer'>('landowner')

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        location: '',
        description: '',
        experience: '',
        specialties: '',
        // Farmer specific
        yearsOfExperience: '',
        experienceLevel: 'Intermediate',
        crops: '',
        availability: 'Full-time',
        certifications: '',
        expectedRate: '',
        pincode: '',
        latitude: undefined as number | undefined,
        longitude: undefined as number | undefined,
    })

    useEffect(() => {
        // Load current user data
        const currentUserData = localStorage.getItem('currentUser')
        if (!currentUserData) {
            router.push('/login')
            return
        }

        const profile = JSON.parse(currentUserData)
        setFormData({
            id: profile.id,
            name: profile.name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            description: profile.description || '',
            experience: profile.experience || '',
            specialties: profile.specialties || '',
            yearsOfExperience: profile.yearsOfExperience || '',
            experienceLevel: profile.experienceLevel || 'Intermediate',
            crops: profile.crops || '',
            availability: profile.availability || 'Full-time',
            certifications: profile.certifications || '',
            expectedRate: profile.expectedRate || '',
            pincode: profile.pincode || '',
            latitude: profile.latitude,
            longitude: profile.longitude,
        })
        setUserType(profile.type)
        setLoading(false)
    }, [router])

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
                    }))
                }
            }
            fetchDetails()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const updatedProfile = {
            ...formData,
            type: userType,
            updatedAt: new Date().toISOString(),
        }

        // Update currentUser
        localStorage.setItem('currentUser', JSON.stringify(updatedProfile))

        // Update in global profiles list
        const existingProfiles = JSON.parse(localStorage.getItem('profiles') || '[]')
        const newProfilesList = existingProfiles.map((p: any) => p.id === updatedProfile.id ? updatedProfile : p)
        localStorage.setItem('profiles', JSON.stringify(newProfilesList))

        router.push('/profile')
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 flex items-center gap-2">
                        &larr; Cancel & Back
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-primary-900 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white mb-1">Edit Profile</h2>
                        <p className="text-primary-200 text-sm">Update your personal information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
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
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-gray-50"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Farmer Specific Fields */}
                        {userType === 'farmer' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Rate / Price</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
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
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function EditProfile() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
            <EditProfileContent />
        </Suspense>
    )
}
