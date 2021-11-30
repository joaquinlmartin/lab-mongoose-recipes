const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {Type: String, required: true, unique: true},
  level: {Type: String, enum: ["Easey Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: {Type: [String]},
  cuisine: {Type: String, required: true},
  dishType: {Type: String, enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]},
  image: {Type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {Type: Number, min:0},
  creator: {Type: String},
  created: {Type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
