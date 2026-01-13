'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function LandDetails() {
    const params = useParams()
    const router = useRouter()
    const t = useTranslations('Common')
    const [land, setLand] = useState<any>(null)
    const [recommendations, setRecommendations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id
                // Fetch land details
                const res = await fetch(`/api/lands/${id}`)
                const data = await res.json()
                if (data.success) {
                    setLand(data.data)
                } else {
                    // Fallback to localStorage if API fails or data not found
                    const allLands = JSON.parse(localStorage.getItem('landListings') || '[]')
                    const foundLand = allLands.find((l: any) => l.id === id)
                    setLand(foundLand)
                }

                // Fetch recommendations
                const recRes = await fetch(`/api/lands/${id}/recommendations`)
                const recData = await recRes.json()
                if (recData.success) {
                    setRecommendations(recData.data)
                }
            } catch (error) {
                console.error('Error fetching land details:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [params.id])

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>

    if (!land) return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Land Listing Not Found</h2>
            <Link href="/listings/lands" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Listings
            </Link>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Navigation */}
                <div className="mb-6">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 flex items-center gap-2">
                        &larr; Back
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header Image */}
                    {/* Header Image Gallery */}
                    <div className="relative">
                        <div className="h-96 bg-primary-900 relative overflow-hidden">
                            {land.images && land.images.length > 0 ? (
                                <img src={land.images[0]} alt="Land Main" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                            ) : land.image ? (
                                <img src={land.image} alt="Land Main" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                            ) : (
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40"></div>
                            )}
                            <div className="absolute bottom-0 left-0 p-8 text-white z-10 bg-gradient-to-t from-black/80 to-transparent w-full">
                                <h1 className="text-4xl font-bold mb-2">{land.landSize} Acres in {land.landLocation || land.location}</h1>
                                <div className="flex gap-4 text-primary-100">
                                    <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{land.soilType} Soil</span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{land.availabilityPeriod}</span>
                                </div>
                            </div>
                        </div>
                        {/* Thumbnails */}
                        {land.images && land.images.length > 1 && (
                            <div className="flex gap-2 p-4 overflow-x-auto bg-white border-b border-gray-100">
                                {land.images.map((img: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Land view ${idx + 1}`}
                                        className="h-20 w-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition border border-gray-200"
                                        onClick={() => {
                                            // Simple gallery logic: replace main image source (DOM manipulation for simplicity or state)
                                            // For a better React approach, we'd add a state for 'selectedImage'
                                            const mainImg = document.querySelector('img[alt="Land Main"]') as HTMLImageElement;
                                            if (mainImg) mainImg.src = img;
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{land.landDescription}</p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Land Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <span className="block text-sm text-gray-500 uppercase">Climate</span>
                                        <span className="font-semibold text-gray-900">{land.climate || 'N/A'}</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <span className="block text-sm text-gray-500 uppercase">Avg Temperature</span>
                                        <span className="font-semibold text-gray-900">{land.temperature || 'N/A'}</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <span className="block text-sm text-gray-500 uppercase">Preferred Crops</span>
                                        <span className="font-semibold text-gray-900">{land.preferredCrops}</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <span className="block text-sm text-gray-500 uppercase">Past Yield</span>
                                        <span className="font-semibold text-gray-900">{land.pastYield || 'Not specified'}</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white border-2 border-primary-100 rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Financials</h3>
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-1">Percentage Share</p>
                                    <p className="text-2xl font-bold text-primary-700">{land.priceExpectation ? `${land.priceExpectation}%` : 'Negotiable'}</p>
                                </div>
                                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-500/30">
                                    Connect with Landowner
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Posted By</h3>
                                <div
                                    className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition"
                                    onClick={() => {
                                        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
                                        // Match by email as it is unique enough for this simple implementation, or assume listing has ID
                                        const profile = profiles.find((p: any) => p.email === land.email);
                                        if (profile) {
                                            router.push(`/profile/${profile.id}`);
                                        }
                                    }}
                                >
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
                                        {land.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 hover:text-primary-600 transition underline decoration-dotted underline-offset-2">{land.name}</p>
                                        <p className="text-sm text-gray-500">Landowner</p>
                                    </div>
                                </div>
                                {land.email && (
                                    <div className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Email:</span> {land.email}
                                    </div>
                                )}
                                {land.phone && (
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Phone:</span> {land.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recommendations Section */}
                    {recommendations.length > 0 && (
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Lands You Might Like</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {recommendations.map((rec: any) => (
                                    <Link
                                        key={rec._id}
                                        href={`/listings/lands/${rec._id}`}
                                        className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition group"
                                    >
                                        <div className="h-32 bg-gray-200 relative">
                                            {rec.image ? (
                                                <img src={rec.image} alt="Land" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-300">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary-700">
                                                {rec.landSize} Ac
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="font-bold text-gray-900 truncate">{rec.landLocation}</p>
                                            <p className="text-xs text-gray-500">{rec.soilType} Soil</p>
                                            <p className="text-sm font-bold text-primary-600 mt-1">{rec.priceExpectation ? `${rec.priceExpectation}% Share` : 'Negotiable'}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
