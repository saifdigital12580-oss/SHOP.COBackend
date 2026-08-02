const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        console.log("Cookies:", req.cookies);

        if (!token) {
            return res.status(401).json({
                message: "Token not found!"
            });
        }
        
        // user.lastLogin = new Date();
        // await user.save();


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("decoded:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("Error:", error.message);

        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}

module.exports = authMiddleware;