import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {

    const token = req.cookies['auth'];

    //Guest users
    if (!token) {
        console.log('no token found');

        return next();
    };

    //Logged users
    try {
        const decodedToken = jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;
        // console.log(decodedToken);   

        next();

    } catch (err) {
        console.log(err);

        console.log(err.message);

        res.clearCookie('auth');
        res.redirect('/auth/login');
    }

};

export const isAuth = (req, res, next) => {
    if(!req.user){
        return res.redirect('/auth/login')
    };
    next();
}