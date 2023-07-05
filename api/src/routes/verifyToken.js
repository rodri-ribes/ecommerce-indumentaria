const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ auth: false })
    }

    const payload = jwt.verify(token, 'secretKey')

    req.userId = payload._id;

    next();
}

module.exports = verifyToken