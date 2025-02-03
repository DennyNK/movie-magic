import Movie from "../models/Movie.js";

export default {
    getOne(movieId){
        return Movie.findById(movieId)
        .then(resultMovie => {
            if(resultMovie.cast && resultMovie.cast.length > 0){
                return resultMovie.populate('cast');
            };
            return resultMovie;
        })
    },
    create(movieData, creatorId) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
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
    attachCast(movieId, castId){
        const movie = Movie.findById(movieId);
        movie.cast.push(castId);
        movie.save();

        return movie;
    },
    delete(movieId){
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData){
        return Movie.findByIdAndUpdate(movieId, movieData);
    }

}