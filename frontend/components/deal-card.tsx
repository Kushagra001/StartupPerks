'use client';

import { motion } from "framer-motion";
import { Lock, Unlock, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface Deal {
    _id: string;
    name: string;
    description: string;
    category: string;
    discountValue: string;
    partnerLogoUrl: string;
    isLocked: boolean;
}

interface DealCardProps {
    deal: Deal;
    index: number;
    onClaim?: (dealId: string) => void;
}

export default function DealCard({ deal, index, onClaim }: DealCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
        >
            {/* Locked Overlay */}
            {deal.isLocked && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 text-gray-400 group-hover:text-primary transition-colors">
                        <Lock className="w-4 h-4" />
                    </div>
                </div>
            )}
            {!deal.isLocked && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="bg-primary/20 backdrop-blur-md border border-primary/20 rounded-full p-2 text-primary">
                        <Unlock className="w-4 h-4" />
                    </div>
                </div>
            )}

            <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="h-12 w-12 bg-white rounded-lg p-2 flex items-center justify-center">
                        <img src={deal.partnerLogoUrl} alt={deal.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
                        {deal.category}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{deal.name}</h3>
                    <div className="mt-1 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {deal.discountValue}
                    </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 h-10">
                    {deal.description}
                </p>

                <div className="pt-4 flex gap-2">
                    <Button
                        variant={deal.isLocked ? "outline" : "premium"}
                        className="w-full gap-2"
                        onClick={() => onClaim && onClaim(deal._id)}
                    >
                        {deal.isLocked ? "Unlock Deal" : "Claim Now"}
                        {deal.isLocked ? <Lock className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
