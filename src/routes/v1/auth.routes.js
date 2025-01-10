import express from 'express';
import AuthController from '~/controllers/auth.controller';
import asyncHandler from '~/middlewares/asyncHandler.middleware';

const Router = express.Router();

Router.post('/signup', asyncHandler(AuthController.signup));

export const authRoutes = Router;
