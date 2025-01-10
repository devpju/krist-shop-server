import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from '~/config/db'
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(compression())
app.use(cors())
app.use(express.json())

// Database
connectDB()

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
