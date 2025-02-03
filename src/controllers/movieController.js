import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);
    res.render('search', { movies, filter });
})

movieController.get('/create', (req, res) => {
    res.render('create')
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;

    await movieService.create(newMovie, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    
    
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    // console.log(movie.creator);
    // console.log(req.user.id);
    // const isCreator = movie.creator && movie.creator.toString() === req.user.id;
    const isCreator = movie.creator?.equals(req.user?.id);
    
    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', async (req, res) => {

    const movieId = req.params.movieId
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({exclude: movie.cast});

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {

    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);

});

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    if(!movie.creator?.equals(req.user?.id)){
        return res.redirect('/404');
    }
    
    await movieService.delete(movieId);

    res.redirect('/');

});

function getCategoriesVewData(category){
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short film'};

    const categories = Object.keys(categoriesMap).map(categoryValue => ({
        value: categoryValue,
        label: categoriesMap[categoryValue],
        selected: categoryValue === category ? 'selected' : '',
    }));

    return categories;
}

movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    // console.log(movieId);
    
    console.log(movie);
    

    const categories = getCategoriesVewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;
    // console.log(movieData);
    

    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
})


export default movieController;