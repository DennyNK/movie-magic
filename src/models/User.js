import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
email: String,
password: String,
});

const User = model('User', userSchema);

userSchema.pre('save', async function (parms) {
    this.password = await bcrypt.hash(this.password, 10)
})

export default User;