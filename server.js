const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/startup-benefits')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const dealsRoutes = require('./routes/deals');
const authRoutes = require('./routes/auth');
const claimsRoutes = require('./routes/claims');
app.use('/api/deals', dealsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/claims', claimsRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'Startup Benefits Platform API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
