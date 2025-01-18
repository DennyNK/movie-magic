import homeController from './controllers/homeController.js';
import { Router } from 'express';
import movieController from './controllers/movieController.js';

const routes = Router();

routes.use(homeController);
routes.use(movieController);

routes.get('*', (req, res) => {
    res.render('404');
})

export default routes;
