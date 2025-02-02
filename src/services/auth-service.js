import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'ghtyaWZyWpzQAP33lKqEFFGe0UwRWonBuFPGkp6gdcfDjyVmitMpFYa'

export default {

    register(userData) {
        return User.create(userData);

    },

    async login(email, password) {

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid login');
        };

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid login');
        }

        const payload = {
            id: user._id,
            email: user.email,

        }
        const token = jwt.sign(payload, SECRET, {expiresIn: '2h'})

        return token;
    }

}