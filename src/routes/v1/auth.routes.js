import express from 'express';
import authController from '~/controllers/auth.controller';
import asyncHandler from '~/middlewares/asyncHandler.middleware';

const Router = express.Router();

Router.post('/signup', asyncHandler(authController.signup));
Router.post('/login', asyncHandler(authController.login));

export const authRoutes = Router;
