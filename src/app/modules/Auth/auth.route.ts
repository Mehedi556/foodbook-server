
import express from 'express';
import validateRequest, { validateRequestCookies } from '../../middlewares/validateRequest';
import { changePasswordValidationSchema, forgetPasswordValidationSchema, LoginValidationSchema, refreshTokenValidationSchema, resetPasswordValidationSchema, SignupValidationSchema } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// this route is created for create user
router.post(
  '/signup',
  validateRequest(SignupValidationSchema),
  AuthControllers.createUser,
);

router.get(
  '/:id',
  AuthControllers.getUser,
);

// this route is created for login user
router.post(
  '/login',
  validateRequest(LoginValidationSchema),
  AuthControllers.loginUser,
);

router.patch(
  '/follow',
  auth('admin', 'user'),
  AuthControllers.followUser,
);

router.post(
  '/refresh-token',
  validateRequestCookies(refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post('/forget-password', validateRequest(forgetPasswordValidationSchema), AuthControllers.forgetPassword)
router.post('/reset-password', validateRequest(resetPasswordValidationSchema), AuthControllers.resetPassword)

export const AuthRoutes = router;