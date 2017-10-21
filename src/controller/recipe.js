import mongoose from 'mongoose';
import { Router } from 'express';
import Recipe from '../model/recipe';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  // '/v1/recipe' - GET all test accts
  api.get('/', (req, res) => {
    Recipe.find({}, (err, recipes) => {
      if (err) {
        res.send(err);
      }
      res.json(recipes);
    });
  });

  // '/v1/recipe/:id' - GET a specific test acct
  api.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      res.json(recipe);
    });
  });

  // '/v1/recipe/add' - POST - add a test acct
  api.post('/add', (req, res) => { 
    let newRecipe = new Recipe();
    newRecipe.name = req.body.title;
    newRecipe.ingredients = req.body.ingredients;

    newRecipe.save(function(err) {
      if (err) {
        res.send(err);
      }else{
        res.json({ message: 'Recipe saved successfully' });
      }
    });
  });

  // '/v1/recipe/:id' - DELETE - remove a test acct
  api.delete('/:id', (req, res) => {
    Recipe.remove({
      _id: req.params.id
    }, (err, recipe) => {
      if (err) {
        res.send(err);
      }
        res.json({message: "Recipe Successfully Removed"});
      });
  });

  // '/v1/recipe/:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
        res.send(err);
      }
      recipe.name = req.body.title;
      recipe.ingredients = req.body.ingredients;
      
      recipe.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Recipe info updated' });
      });
    });
  });

  return api;
}
