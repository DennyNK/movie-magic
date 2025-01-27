import Movie from "../models/Movie.js";

export default {
    getOne(movieId){
        const resultMovie = Movie.findById(movieId).populate('cast');
    
        return resultMovie;
    },
    create(movieData) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year)
        });

        return result;
  
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
    },
    async attachCast(movieId, castId){
        const movie = await Movie.findById(movieId);
        movie.cast.push(castId);
        await movie.save();

        return movie;
    }

}