import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
title: String,
category: String,
genre: String,
director: String,
year: Number,
image: String,
rating: Number,
description: String,
cast: [{
    type: Types.ObjectId,
    ref: 'Cast'
}]
});

const Movie = model('Movie', movieSchema);

export default Movie;