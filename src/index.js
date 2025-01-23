import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRating from './helpers/ratingHelper.js';
import mongoose from 'mongoose';

const app = express();

try{
    const uri = 'mongodb://localhost:27017/magic-movies';
    await mongoose.connect(uri);
    console.log("DB connected");
    
} catch(err){
    console.log('Cannot connect to DB');
    
    console.err(err.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {showRating}
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}))

app.use(routes);

app.listen(1000, () => console.log('Server is listening on http://localhost:1000...'));
