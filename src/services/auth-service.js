import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const SECRET = process.env.JWT_SECRET || 'BASICSECRET';
// console.log(SECRET);


export default {

    async register(userData) {

        if(userData.password !== userData.rePassword){
            throw new Error ("Passwords don't match")
        }

        const userCount = await User.countDocuments({email: userData.email});

        if(userCount > 0){
            throw new Error('A user with this email already exists')
        }

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
        const token = jwt.sign(payload, SECRET, {expiresIn: '7d'})

        return token;
    }

}