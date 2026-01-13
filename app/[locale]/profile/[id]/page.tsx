'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserProfile() {
    const params = useParams()
    const router = useRouter()
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const id = params.id
        const allProfiles = JSON.parse(localStorage.getItem('profiles') || '[]')
        const foundProfile = allProfiles.find((p: any) => p.id === id)

        setProfile(foundProfile)
        setLoading(false)
    }, [params.id])

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>

    if (!profile) return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Home
            </Link>
        </div>
    )

    const isFarmer = profile.type === 'farmer'

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 flex items-center gap-2">
                        &larr; Back
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header Image */}
                    <div className={`h-64 ${isFarmer ? 'bg-green-900' : 'bg-primary-900'} relative`}>
                        <div className={`absolute inset-0 bg-cover bg-center opacity-40 ${isFarmer ? "bg-[url('https://images.unsplash.com/photo-1625246333195-f819634473ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')]" : "bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')]"} `}></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white z-10 w-full">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
                                    <p className={`text-xl ${isFarmer ? 'text-green-100' : 'text-primary-100'}`}>{profile.location}</p>
                                </div>
                                <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm text-lg font-medium capitalize">
                                    {profile.type}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">About</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{profile.description || "No description provided."}</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {isFarmer ? (
                                        <>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <span className="block text-sm text-gray-500 uppercase">Crops/Specialties</span>
                                                <span className="font-semibold text-gray-900">{profile.crops || profile.specialties}</span>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <span className="block text-sm text-gray-500 uppercase">Experience</span>
                                                <span className="font-semibold text-gray-900">{profile.yearsOfExperience} Years</span>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <span className="block text-sm text-gray-500 uppercase">Certifications</span>
                                                <span className="font-semibold text-gray-900">{profile.certifications || 'None'}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <span className="block text-sm text-gray-500 uppercase">Total Land</span>
                                                <span className="font-semibold text-gray-900">{profile.totalLandSize || 'Not specified'}</span>
                                            </div>
                                            {/* Placeholder for future landowner fields */}
                                        </>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white border-2 border-primary-100 rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Now</h3>
                                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-500/30">
                                    Send Message
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Info</h3>
                                {profile.email && (
                                    <div className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Email:</span> {profile.email}
                                    </div>
                                )}
                                {profile.phone && (
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Phone:</span> {profile.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
