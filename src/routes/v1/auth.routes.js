import express from 'express';
import authController from '~/controllers/auth.controller';
import asyncHandler from '~/middlewares/asyncHandler.middleware';
import authMiddleware from '~/middlewares/auth.middleware';

const Router = express.Router();

Router.post('/signup', asyncHandler(authController.signup));
Router.post('/login', asyncHandler(authController.login));
Router.post('/logout', authMiddleware(), asyncHandler(authController.logout));
Router.post('/refresh-token', authMiddleware(), asyncHandler(authController.refreshToken));

export const authRoutes = Router;
