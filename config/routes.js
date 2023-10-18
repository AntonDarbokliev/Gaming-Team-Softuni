const cookieParser = require("cookie-parser");
const homeController = require("../controllers/homeController.js");
const userController = require("../controllers/userController.js");
const { auth } = require("../middlewares/authMiddleware.js");
const gameController = require("../controllers/gameController.js");
module.exports = (app) => {
  app.use(cookieParser())
  app.use(auth)
  app.use(homeController);
  app.use("/users", userController);
  app.use("/games", gameController);
//   app.use('*',(req,res)=>{
//     res.render('404')
//   })


};
