'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || data.message || 'Login failed');

            localStorage.setItem('token', data.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-card p-8 rounded-2xl relative z-10"
            >
                <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to access exclusive deals</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="founder@startup.com"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                    </div>

                    <Button variant="premium" className="w-full h-12 text-lg" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
                        Register
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
