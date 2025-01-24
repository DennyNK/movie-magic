import { Schema, model } from "mongoose";

const castSchema = new Schema({

    name: String,
    age: Number,
    born: Number,
    // nameInMovie: String,
    image: String,
    // movie: '',

});

const Cast = model('Cast', castSchema);

export default Cast;