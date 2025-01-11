import express from 'express';
import authController from '~/controllers/auth.controller';
import asyncHandler from '~/middlewares/asyncHandler.middleware';

const Router = express.Router();

Router.post('/signup', asyncHandler(authController.signup));

export const authRoutes = Router;
