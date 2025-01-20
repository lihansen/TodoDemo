const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token found. Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = auth;