import movies from "../movies.js";
import { v4 as uuid } from 'uuid';
export default {
    findMovie(movieId){
        const resultMovie = movies.find(movie => movie.id === movieId);
    
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
        let result = movies;

        if(filter.search){
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }

        return result;
    }

}