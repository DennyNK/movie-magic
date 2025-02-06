import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
email: {
    type: String,
    match: /\@[a-z]+.[a-z]+$/,
    minLength: 10
},
password: {
    type: String,
    match: /^[a-zA-Z0-9]+$/,
    minLength: 6
},
});

//Setting a virtual property rePassword which will not be saved in the db but only in the memory, to check if password fields match on register
// userSchema.virtual('rePassword', )
// .set(function (rePassword){
//     if(rePassword !== this.password){
//         throw new Error ("Passwords don't match")
//     }
// })

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = model('User', userSchema);

export default User;