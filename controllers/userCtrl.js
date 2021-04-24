const Users = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userCtrl = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const temp = await Users.findOne({ email: email });
            if (temp) { return res.status(400).json({ msg: 'This email is exist' }) }
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash,
            })
            await newUser.save();
            res.json({ msg: 'Register is success' })

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })

        }

    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const tempEmail = await Users.findOne({ email: email });
            if (!tempEmail) { return res.status(400).json({ msg: 'Email is not exist' }) };
            const tempPassword = await bcrypt.compare(password, tempEmail.password);
            if (!tempPassword) { return res.status(400).json({ msg1: 'Password is incorrect' }) };
            const payload = { id: tempEmail._id, name: tempEmail.username };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
            res.json({ token });

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    verifiedToken: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token) { return res.send(false) };
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decode) => {
                // console.log(decode);
                if (err) { return res.send(false) };
                const user = await Users.findById(decode.id);
                if (!user) { return res.send(false) };
                return res.send(true);

            })

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })

        }
    }
}
module.exports = userCtrl