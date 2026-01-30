'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import DealCard from '@/components/deal-card';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [claims, setClaims] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        const fetchDashboardData = async () => {
            try {
                // Fetch User
                const userRes = await fetch(`${API_URL}/api/auth/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!userRes.ok) throw new Error('Failed to fetch user');
                const userData = await userRes.json();
                setUser(userData);

                // Fetch Claims
                const claimsRes = await fetch(`${API_URL}/api/claims`, {
                    headers: { 'x-auth-token': token }
                });
                if (claimsRes.ok) {
                    const claimsData = await claimsRes.json();
                    setClaims(claimsData);
                }

            } catch (err) {
                console.error(err);
                if ((err as any).message === 'Failed to fetch user') {
                    localStorage.removeItem('token');
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />
            <div className="container mx-auto px-6 pt-32">
                <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse mb-2" />
                <div className="h-5 w-48 bg-white/5 rounded-lg animate-pulse mb-12" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card p-6 rounded-xl h-32 animate-pulse bg-white/5" />
                    ))}
                </div>

                <div className="mt-12">
                    <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-card h-80 rounded-xl animate-pulse bg-white/5" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Calculate total savings (Mock logic: assume $1000 per deal for now or use regex to parse discountValue in future)
    const totalSavings = claims.length * 500;

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome back, <span className="text-primary">{user?.name}</span>
                    </h1>
                    <p className="text-gray-400">
                        {user?.companyName ? `${user.companyName} Member` : 'Startup Founder'} • Free Plan
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Stat Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6 rounded-xl"
                    >
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Savings</h3>
                        <p className="text-3xl font-bold text-white">${totalSavings.toLocaleString()}</p>
                    </motion.div>

                    {/* Stat Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-6 rounded-xl"
                    >
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Claimed Deals</h3>
                        <p className="text-3xl font-bold text-white">{claims.length}</p>
                    </motion.div>

                    {/* Action Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-6 rounded-xl flex items-center justify-center border-dashed border-2 border-white/10"
                    >
                        <Button variant="outline" onClick={() => router.push('/deals')}>
                            Browse New Deals
                        </Button>
                    </motion.div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Your Claimed Deals</h2>

                    {claims.length === 0 ? (
                        <div className="text-gray-500 text-sm italic">
                            No deals claimed yet. Go explore!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {claims.map((claim: any, index: number) => (
                                <DealCard key={claim._id} deal={claim.deal} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
