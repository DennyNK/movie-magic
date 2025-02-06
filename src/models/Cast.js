import { Schema, model } from "mongoose";

const castSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, 'Name should be at least 5 character slong'],
        match: [/^[a-zA-Z 0-9]+$/, 'Name should be alphanumeric, digits and whitespaces']
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    born: {
        type: String,
        minlength: [10, 'Place of birth should be at least 10 character slong'],
        match: [/^[a-zA-Z 0-9]+$/, 'Place of birth should be alphanumeric, digits and whitespaces'] 
    },
    image: {
        type: String,
        match: [/^https?\:\/\//, 'Image url should start with http:// or https://']
    },
    // movie: '',

});

const Cast = model('Cast', castSchema);

export default Cast;