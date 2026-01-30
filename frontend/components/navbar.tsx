'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        // Check for token on mount
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/10">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                StartupPerks
            </Link>
        </nav>
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/10"
        >
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                StartupPerks
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/deals" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Browse Deals
                </Link>

                {isLoggedIn ? (
                    <>
                        <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" size="sm">Sign In</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="premium" size="sm">Get Started</Button>
                        </Link>
                    </>
                )}
            </div>
        </motion.nav>
    );
}
