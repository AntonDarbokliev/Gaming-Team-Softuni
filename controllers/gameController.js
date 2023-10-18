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

  gameController.get("/:id/details", async (req, res) => {
    try {
      const game = await gameService.getById(req.params.id);
      const isOwner = req.user?._id == game.owner._id
      let hasBought = false;
      const parsedBuys = JSON.parse(JSON.stringify(game.boughtBy))
      const idArr = parsedBuys.map(x => x._id)
      if (idArr.includes(req.user?._id)) {           //CHANGE PROPERTIES ACCORDING TO THE TASK
          hasBought = true
      }
  
    //   const votesString = parsedVotes.map(x => x.email).join(', ')
  
      res.render("details", {
        title: "Details",
        game,
        isOwner,
        hasBought,
        // votesString,
        parsedBuys
      });
    } catch (err) {
      const errors = errorHelper(err)
      res.render('details',{
        title : 'Details',
        errors
      });
    }
  });

  gameController.get('/:id/buy', isAuthorized,async (req,res) => {
    const gameId = req.params.id
    const userId = req.user._id 
  try{
    const game = await gameService.getById(gameId);
    let hasBought = false;
    const parsedBuys = JSON.parse(JSON.stringify(game.boughtBy))
    const idArr = parsedBuys.map(x => x._id)
    if (idArr.includes(req.user?._id)) {           
        hasBought = true
    }
    if(hasBought){
        throw new Error('You have already bought this game')
    }

    await gameService.buy(gameId,userId)
    res.redirect(`/games/${gameId}/details`)
  }catch(err){
    const errors = errorHelper(err)
    res.render('home',{
      title : 'Home',
      errors,
    })
  }
  })



  gameController.get("/:id/edit",isAuthorized,async (req, res) => {
    try {
      const cryptoId = req.params.id
      const game = await gameService.getById(cryptoId)

      const isOwner = req.user?._id == game.owner._id
      if(!isOwner) throw new Error('You are not the owner of this game')

      res.render("edit", {
        title: "Edit",
        game
      });
    } catch (err) {
      const errors = errorHelper(err)
      res.render("edit", {
        title: "Game Edit",
        errors
      });
    }
  });
  
  gameController.post("/:id/edit",isAuthorized, async (req, res) => {
    const gameData = req.body
    const cryptoId = req.params.id
    const game = await gameService.getById(cryptoId)

    const isOwner = req.user?._id == game.owner._id
    if(!isOwner) throw new Error('You are not the owner of this game')

    try {
      await gameService.edit(game._id,gameData)
      res.redirect(`/games/${game._id}/details`)
     
    } catch (err) {
      const errors = errorHelper(err)
      res.render("edit", {
        title: "Edit",
        errors
      });
    }
  });

//   gameController.get('/:id/delete',isAuthorized, async (req,res) => {
//     const userId = req.user.id;
//     const cryptoId = req.params.id
//     const game = await gameService.getById(cryptoId)

    
//     try{
//     isOwner(game.owner,userId)
//     await gameService.del(cryptoId)
//     res.redirect('/games/catalog')
//   }catch(err){
//     const errors = errorHelper(err)
//       res.render("home", {
//         errors
//       });
//   }
//   })
  
  



  module.exports = gameController
