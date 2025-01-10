import express from 'express'
import { authRoutes } from './auth.routes'

const Router = express.Router()
Router.use('/auth', authRoutes)

export const APIs_V1 = Router
