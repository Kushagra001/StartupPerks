'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import DealCard from "@/components/deal-card";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface Deal {
    _id: string;
    name: string;
    description: string;
    category: string;
    discountValue: string;
    partnerLogoUrl: string;
    websiteUrl: string;
    isLocked: boolean;
}

export default function DealsPage() {
    const router = useRouter(); // To handle navigation
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const res = await fetch(`${API_URL}/api/deals/public`);
                const data = await res.json();
                setDeals(data);
            } catch (error) {
                console.error("Failed to fetch deals", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    const handleClaim = async (dealId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/claims/${dealId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });
            const data = await res.json();

            if (res.ok) {
                alert(`Success! You have claimed the deal.`);
                router.push('/dashboard');
            } else {
                alert(data.message || 'Failed to claim deal');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    const categories = ["All", "Cloud", "Marketing", "Productivity", "Finance"];
    const filteredDeals = filter === "All"
        ? deals
        : deals.filter(d => d.category === filter);

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 mb-12"
                >
                    <h1 className="text-4xl font-bold text-white">Explore Deals</h1>
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                        ? "bg-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                                        : "glass text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search (Visual Only for Slice 1) */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search deals..."
                                className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-64 rounded-xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDeals.map((deal, index) => (
                            <DealCard
                                key={deal._id}
                                deal={deal}
                                index={index}
                                onClaim={handleClaim}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
