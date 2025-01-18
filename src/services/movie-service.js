import movies from "../movies.js";

export default {
    findMovie(movieId){
        const resultMovie = movies.find(movie => movie.id === movieId);
    
        return resultMovie;
    },

}