'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function MyProfile() {
    const router = useRouter()
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for logged (simulated) in user
        const currentUserData = localStorage.getItem('currentUser')
        if (currentUserData) {
            setProfile(JSON.parse(currentUserData))
        } else {
            router.push('/login')
        }
        setLoading(false)
    }, [router])

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>

    if (!profile) return null // Redirecting...

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <div className="flex gap-3">
                        <Link href="/profile/edit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            <span>Edit Profile</span>
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('currentUser')
                                router.push('/login')
                            }}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                    <div className="bg-primary-900 h-32 relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-f819634473ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                                <div className="w-full h-full bg-primary-100 rounded-full flex items-center justify-center text-3xl font-bold text-primary-600">
                                    {profile.name?.charAt(0) || 'U'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                                <p className="text-gray-500">{profile.location}</p>
                            </div>
                            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                                {profile.type}
                            </span>
                        </div>

                        <div className="prose max-w-none text-gray-600 mb-8">
                            <p>{profile.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Info</h3>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        {profile.email}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        {profile.phone}
                                    </p>
                                </div>
                            </div>

                            {profile.type === 'farmer' && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Professional Skills</h3>
                                    <div className="space-y-2 text-gray-700">
                                        <p><span className="font-medium">Experience:</span> {profile.yearsOfExperience} Years ({profile.experienceLevel})</p>
                                        <p><span className="font-medium">Availability:</span> {profile.availability}</p>
                                        <p><span className="font-medium">Specialties:</span> {profile.crops}</p>
                                        <p><span className="font-medium">Expected Rate:</span> {profile.expectedRate || 'Negotiable'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {profile.type === 'landowner' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">My Land Listings</h3>
                        <p className="text-gray-500 mb-6">Manage your properties and check visibility.</p>
                        <Link href="/listings/lands/create" className="text-primary-600 font-medium hover:underline">
                            + Post Another Land Listing
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
