const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Claim = require('../models/Claim');
const Deal = require('../models/Deal');

// @route   POST api/claims/:dealId
// @desc    Claim a deal
// @access  Private
router.post('/:dealId', auth, async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.dealId);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        // Check verification for locked deals
        if (deal.isLocked && !req.user.isVerified) {
            // Note: req.user from auth middleware currently only has ID. 
            // We might need to fetch full user or assume isVerified is irrelevant for now 
            // OR update auth middleware to include isVerified.
            // For now, let's fetch the user to be safe.
            const User = require('../models/User');
            const user = await User.findById(req.user.id);
            if (!user.isVerified) {
                return res.status(403).json({ message: 'Verification required for this deal' });
            }
        }

        let claim = await Claim.findOne({ user: req.user.id, deal: req.params.dealId });
        if (claim) {
            return res.status(400).json({ message: 'Deal already claimed' });
        }

        claim = new Claim({
            user: req.user.id,
            deal: req.params.dealId,
            status: 'approved'
        });

        await claim.save();
        res.json(claim);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET api/claims
// @desc    Get current user's claims
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const claims = await Claim.find({ user: req.user.id })
            .populate('deal') // Populate deal details
            .sort({ claimedAt: -1 });
        res.json(claims);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
