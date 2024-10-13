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
    '/',
    auth("admin", "user"),
    validateRequest(
        UpdateRecipeSchema
    ),
    RecipeControllers.updateRecipe,
);

router.patch(
    '/update-vote',
    auth("admin", "user"),
    RecipeControllers.updateVote,
);

router.patch(
    '/add-comment',
    auth("admin", "user"),
    RecipeControllers.addComment,
);

router.patch(
    '/update-comment',
    auth("admin", "user"),
    RecipeControllers.updateComment,
);

router.put(
    '/delete-comment',
    auth("admin", "user"),
    RecipeControllers.deleteComment,
);

router.get('/', 
    // auth("admin", "user"), 
    RecipeControllers.getAllRecipes);

router.get('/:id', 
    auth("admin", "user"), 
    RecipeControllers.getSingleRecipe);

router.get('/my-recipes/:id', 
    auth("admin", "user"), 
    RecipeControllers.getMyRecipes);



router.delete('/:id', auth("admin", "user"), RecipeControllers.deleteRecipe);

export const RecipeRoutes = router;