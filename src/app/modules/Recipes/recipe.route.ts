import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RecipeControllers } from './recipe.controller';
import { RecipeSchema, UpdateRecipeSchema } from './recipe.validation';




const router = express.Router();

router.post(
    '/',
    auth("admin", "user"),
    validateRequest(RecipeSchema),
    RecipeControllers.createRecipe,
);


router.put(
    '/:id',
    auth("admin", "user"),
    validateRequest(
        UpdateRecipeSchema
    ),
    RecipeControllers.updateRecipe,
);

router.get('/', 
    // auth("admin", "user"), 
    RecipeControllers.getAllRecipes);

router.get('/:id', 
    auth("admin", "user"), 
    RecipeControllers.getSingleRecipe);

router.delete('/:id', auth("admin", "user"), RecipeControllers.deleteRecipe);

export const RecipeRoutes = router;