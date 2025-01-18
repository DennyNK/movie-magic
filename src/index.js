import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRating from './helpers/ratingHelper.js';

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {showRating}
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}))

app.use(routes);

app.listen(1000, () => console.log('Server is listening on http://localhost:1000...'));
