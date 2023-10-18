const { isAuthorized } = require("../middlewares/authMiddleware.js");
const gameService = require("../services/gameService.js");
const { errorHelper } = require('../utils/errorHelpers.js');
// const isOwner = require("../utils/validationHelper.js");

const gameController = require("express").Router();

gameController.get("/create",isAuthorized, (req, res) => {
    res.render("create", {
      title: "Add games",
    });
  });

gameController.post("/create",isAuthorized, async (req, res) => {
    try {
      await gameService.create(req.body,req.user._id);
      res.redirect("/");
    } catch (err) {
      const errors = errorHelper(err)
      res.render('create',{
        title : 'Create',
        errors
      });
    }
  });

  gameController.get("/catalog", async (req, res) => {
    try {
      const games = await gameService.getAll();
      res.render("catalog", {
        title: "Game Catalog",
        games,
      });
    } catch (err) {
        const errors = errorHelper(err)
        res.render('catalog',{
          title : 'Game Catalog',
          errors
        });
    }
  });

//   gameController.get("/:id/details", async (req, res) => {
//     try {
//       const crypto = await gameService.getById(req.params.id);
//       const isOwner = req.user?._id == crypto.owner._id
//       let hasBought = false;
//       const parsedBuys = JSON.parse(JSON.stringify(crypto.buys))
//       const idArr = parsedBuys.map(x => x._id)
//       if (idArr.includes(req.user?._id)) {           //CHANGE PROPERTIES ACCORDING TO THE TASK
//           hasBought = true
//       }
  
//     //   const votesString = parsedVotes.map(x => x.email).join(', ')
  
//       res.render("details", {
//         title: "Details",
//         crypto,
//         isOwner,
//         hasBought,
//         // votesString,
//         parsedBuys
//       });
//     } catch (err) {
//       const errors = errorHelper(err)
//       res.render('details',{
//         title : 'Details',
//         errors
//       });
//     }
//   });

//   gameController.get('/:id/buy', isAuthorized,async (req,res) => {
//     const cryptoId = req.params.id
//     const userId = req.user._id 
//   try{
//     const crypto = await gameService.getById(cryptoId);
//     let hasBought = false;
//     const parsedBuys = JSON.parse(JSON.stringify(crypto.buys))
//     const idArr = parsedBuys.map(x => x._id)
//     if (idArr.includes(req.user?._id)) {           
//         hasBought = true
//     }
//     if(hasBought){
//         throw new Error('You cannot buy more coins')
//     }

//     await gameService.buy(cryptoId,userId)
//     res.redirect(`/crypto/${cryptoId}/details`)
//   }catch(err){
//     const errors = errorHelper(err)
//     res.render('details',{
//       title : 'Details',
//       errors,
//     })
//   }
//   })



//   gameController.get("/:id/edit",isAuthorized,async (req, res) => {
//     try {
//       const userId = req.user.id;
//       const cryptoId = req.params.id
//       const crypto = await gameService.getById(cryptoId)

//       isOwner(crypto.owner,userId)

//       res.render("edit", {
//         title: "Edit",
//         crypto
//       });
//     } catch (err) {
//       console.log(err);
//       const errors = errorHelper(err)
//       res.render("edit", {
//         title: "Game Edit",
//         errors
//       });
//     }
//   });
  
//   gameController.post("/:id/edit",isAuthorized, async (req, res) => {
//     const cryptoData = req.body
//     const userId = req.user.id;
//     const cryptoId = req.params.id
//     const crypto = await gameService.getById(cryptoId)

//     isOwner(crypto.owner,userId)

//     try {
//       await gameService.edit(id,cryptoData)
//       res.redirect(`/crypto/${id}/details`)
     
//     } catch (err) {
//       const errors = errorHelper(err)
//       res.render("edit", {
//         title: "Edit",
//         errors
//       });
//     }
//   });

//   gameController.get('/:id/delete',isAuthorized, async (req,res) => {
//     const userId = req.user.id;
//     const cryptoId = req.params.id
//     const crypto = await gameService.getById(cryptoId)

    
//     try{
//     isOwner(crypto.owner,userId)
//     await gameService.del(cryptoId)
//     res.redirect('/crypto/catalog')
//   }catch(err){
//     const errors = errorHelper(err)
//       res.render("home", {
//         errors
//       });
//   }
//   })
  
  



  module.exports = gameController
