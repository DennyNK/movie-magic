import { v4 as uuid } from 'uuid';
import movies from '../movies.js'
import Movie from "../models/Movie.js";

export default {
    getOne(movieId){
        const resultMovie = Movie.findById(movieId);
    
        return resultMovie;
    },
    create(movieData) {
        const newId = uuid();
        movies.push({
            id: newId,
            ...movieData,
            rating: Number(movieData.rating)
        });
        return newId;
    },
    getAll(filter = {}){
        let query = Movie.find({});

        if(filter.search){
            query = query.where({title: filter.search});
        }

        if(filter.genre){
            query = query.where({genre: filter.genre})
        }

        if(filter.year){
            query = query.where({ year: Number(filter.year)});
        }

        return query;
    }

}