const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');

// GET /api/deals/public
// Fetch all public deals + locked deal previews (without promo codes)
router.get('/public', async (req, res) => {
    try {
        // We select specific fields. 'promoCode' is excluded by default in schema but good to be explicit for public view.
        const deals = await Deal.find({})
            .select('-promoCode') // Explicitly exclude sensitive info
            .sort({ createdAt: -1 });

        res.json(deals);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;
