import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { RecipeRoutes } from "../modules/Recipes/recipe.route";
import { paymentRoutes } from "../modules/payment/payment.routes";



const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/recipes',
        route: RecipeRoutes
    },
    {
        path: '/payment',
        route: paymentRoutes
    },
]

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;