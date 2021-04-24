const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) { return res.status(400).json('token is not valid') };
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            // console.log(decode);
            if (err) { return res.status(400).json('token is not valid') };
            req.user = decode;
            next();

        })

    }
    catch (err) {
        return res.status(500).json({ msg: err.message })

    }

}
module.exports = auth;