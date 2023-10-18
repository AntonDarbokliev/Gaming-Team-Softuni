const { Schema, Types, model, default: mongoose } = require("mongoose");

const cryptoSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true }, //ADJUST PROPERTIES ACCORDING TO THE TASK
  description: { type: String, required: true },
  genre: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /PC|Nintendo|PS4|PS5|XBOX/i.test(value);
      },
      message: "Supported platfroms are: PC, Nintendo, PS4, PS5 or XBOX",
    },
  },
  boughtBy: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: { type: Types.ObjectId, ref: "User" },
});
//DONT FORGER TO CHANGE NAMES ACCORDING TO TASK

const Game = model("Game", cryptoSchema);
module.exports = Game;
