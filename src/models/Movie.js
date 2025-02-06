import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title should be at least 5 character slong'],
    match: [/^[a-zA-Z 0-9]+$/, 'Title should be alphanumeric, digits and whitespaces']
},
category: {
    type: String,
    required: true,
    enum: ['tv-show', 'animation', 'movie', 'documentary', 'short-film']
},
genre: {
    type: String,
    required: [true, 'Genre is required'],
    minlength: [5, 'Genre should be at least 5 character slong'],
    match: [/^[a-zA-Z 0-9]+$/, 'Genre should be alphanumeric, digits and whitespaces']
},
director: {
    type: String,
    // required: [true, 'Director is required'],
    minlength: [5, 'Director should be at least 5 character slong'],
    match: [/^[a-zA-Z 0-9]+$/, 'Director should be alphanumeric, digits and whitespaces']
},
year: {
    type: Number,
    min: 1900,
    max: 2024
},
image: {
    type: String,
    match: [/^https?\:\/\//, 'Image url should start with http:// or https://']
},
rating: {
    type: Number,
    min: 1,
    max: 5
},
description: {
    type: String,
    minlength: [20, 'Description should be at least 20 character slong'],
    match: [/^[a-zA-Z 0-9]+$/, 'Description should be alphanumeric, digits and whitespaces']

},
cast: [{
    type: Types.ObjectId,
    ref: 'Cast'
}],
creator: {
    type: Types.ObjectId,
    ref: 'User'
}
});

const Movie = model('Movie', movieSchema);

export default Movie;