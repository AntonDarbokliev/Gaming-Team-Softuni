// const { getLastThree } = require("../services/cryptoService.js");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
  try {
    // const lastThree = await getLastThree()
    res.render("home", {
      title: "Home",
    //   lastThree
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = homeController;
