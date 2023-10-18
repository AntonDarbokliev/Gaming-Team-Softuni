const SECRET_KEY = require("../config/secretKey.js");
const { verify } = require("../utils/jwt.js");

async function auth(req, res, next) {
  const token = req.cookies["auth"];
  if(token){
      try {
        const decodedToken = await verify(token, SECRET_KEY);
    
        req.user = decodedToken;
        res.locals.user = decodedToken; // view user variable in case i need it (example : for a profile page)
        res.locals.isAuthenticated = true; // navigation
        next();
      } catch (err) {
        res.clearCookie("auth");
        res.redirect("/user/login");
      }
}else{
    next()
}
}

async function isAuthorized(req,res,next){
    if(!req.user){
        res.redirect('/user/login')
        return
    }
    next()
}



module.exports = {
  auth,
  isAuthorized,
};
