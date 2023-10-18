const Game = require("../models/Game.js");

async function create(gameData, userId) {
  const creature = {
    name: gameData.name,
    imageUrl: gameData.imageUrl,
    price: gameData.price,
    description: gameData.description,
    genre: gameData.genre,
    platform: gameData.platform,
    boughtBy: gameData.boughtBy,                    // CHANGE PROPERTIES ACCORDING TO THE TASK
    owner: userId,
  };
  const result = await Game.create(creature);

  return result;
}

async function getAll() {
  return Game.find({}).lean().populate('owner').populate('boughtBy');
}

async function getById(id) {
  return Game.findById(id).lean().populate('owner').populate('boughtBy');
}

async function find(location) {
  return Game.find({ location: { $regex: location, $options: "i" } }).lean();
}

async function edit(id, data) {
  return Game.updateOne({ _id: id }, { $set: data }, { runValidators: true });
}

async function del(id) {
  return Game.findByIdAndDelete(id);
}

async function buy(gameId,userId){
  return Game.findByIdAndUpdate(gameId,{$push : {boughtBy : userId}})    // CHANGE FUNCTION NAME AND PROPERTIES ACCORDING TO THE TASK
}

async function getLastThree(){
    return Game.find().sort({_id : -1}).limit(3).lean()
}

module.exports = {
  create,
  getAll,
  getById,
  find,
  edit,
  del,
  buy,
  getLastThree
};
