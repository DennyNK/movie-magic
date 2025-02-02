import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {

    // console.log(req.url)
    const token = req.cookies['auth'];
    // console.log(token);
    

    if(!token){
        console.log('no token found');
        
        return next();
    };

    try{
    // console.log(SECRET);

        const decodedToken = jwt.verify(token, SECRET);

        req.user = decodedToken;
        // console.log(decodedToken);   
        
    next();
       
    } catch(err){
    console.log(err);
    
     console.log(err.message);
     
    }
    
    
};