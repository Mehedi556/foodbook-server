import {Router} from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post('/initiate-payment', paymentController.initiatePayment)

router.post('/confirmation', paymentController.confirmationController)
export const paymentRoutes = router