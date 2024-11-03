const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Check if the token is a Bearer token
    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Invalid token format' });
    }

    // Extract the token part after "Bearer "
    const actualToken = token.split(' ')[1];

    try {
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.admin = decoded.admin;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;