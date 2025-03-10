// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with your own secret key
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Invalid token format.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        // PairD response
        // res.status(400).json({ message: 'Invalid token.' });
        // MY UPDATE
        return res.status(401).json({ message: error.message || 'Invalid token.' });
    }
};

module.exports = authMiddleware;