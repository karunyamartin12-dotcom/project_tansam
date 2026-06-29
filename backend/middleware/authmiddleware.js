const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Get authorization header string
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token Missing"
        });
    }

    // Fix: If it starts with 'Bearer ', split the string and grab just the token part
    let token = authHeader;
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // This attaches user data (id, email, role) to the request object
        req.user = decoded; 
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;