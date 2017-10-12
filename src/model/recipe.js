import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);