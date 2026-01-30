const mongoose = require('mongoose');
const Deal = require('../models/Deal');
require('dotenv').config();

const deals = [
    {
        name: 'AWS Activate',
        description: 'Get $5,000 in AWS credits for 2 years. Access Developer Support and training.',
        category: 'Cloud',
        discountValue: '$5,000 Credits',
        partnerLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        websiteUrl: 'https://aws.amazon.com/activate/',
        isLocked: true,
        promoCode: 'AWS-STARTUP-2026'
    },
    {
        name: 'HubSpot for Startups',
        description: 'Up to 90% off HubSpot professional software for eligible startups.',
        category: 'Marketing',
        discountValue: '90% OFF',
        partnerLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/HubSpot_Logo.png',
        websiteUrl: 'https://www.hubspot.com/startups',
        isLocked: false,
        promoCode: 'HUB-90-OFF'
    },
    {
        name: 'Notion Plus',
        description: '6 months free of Notion Plus with unlimited AI for your entire team.',
        category: 'Productivity',
        discountValue: '6 Months Free',
        partnerLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
        websiteUrl: 'https://www.notion.so/startups',
        isLocked: true,
        promoCode: 'NOTION-AI-24'
    },
    {
        name: 'Stripe Atlas',
        description: 'Save 50% on incorporating your company with Stripe Atlas.',
        category: 'Finance',
        discountValue: '50% OFF',
        partnerLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
        websiteUrl: 'https://stripe.com/atlas',
        isLocked: false,
        promoCode: 'STRIPE-50'
    },
    {
        name: 'Vercel Pro',
        description: 'Get $200 in credits for Vercel Pro and manage your deployments with ease.',
        category: 'Cloud',
        discountValue: '$200 Credits',
        partnerLogoUrl: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
        websiteUrl: 'https://vercel.com/startups',
        isLocked: true,
        promoCode: 'VERCEL-SCALE'
    },
    {
        name: 'Miro Enterprise',
        description: 'Collaborate visually with your team. 3 months free on Enterprise plan.',
        category: 'Productivity',
        discountValue: '3 Months Free',
        partnerLogoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Miro_%28software%29_logo.svg/1200px-Miro_%28software%29_logo.svg.png',
        websiteUrl: 'https://miro.com/startups',
        isLocked: false,
        promoCode: 'MIRO-COLLAB'
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/startup-benefits')
    .then(async () => {
        console.log('MongoDB Connected');
        await Deal.deleteMany({});
        console.log('Cleared existing deals');
        await Deal.insertMany(deals);
        console.log('Seeded new deals');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
