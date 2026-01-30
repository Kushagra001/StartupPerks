'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            StartupPerks
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Empowering the next generation of unicorn founders with the best tools at the lowest prices.
                        </p>
                        <div className="flex gap-4">
                            <motion.a whileHover={{ y: -3 }} href="https://github.com/Kushagra001" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                <Github className="w-4 h-4" />
                            </motion.a>
                            <motion.a whileHover={{ y: -3 }} href="https://www.linkedin.com/in/kushh01/" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                <Linkedin className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/deals" className="hover:text-primary transition-colors">Browse Deals</Link></li>
                            <li><Link href="/register" className="hover:text-primary transition-colors">For Startups</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">For Partners</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2026 Kushagra Singh Negi. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Made with ❤️ for founders</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
