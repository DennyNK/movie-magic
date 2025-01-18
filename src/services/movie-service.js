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
        });
        return newId;
    },
    getAll(){
        return movies;
    }

}