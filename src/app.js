import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(compression())
app.use(cors())
app.use(express.json())
// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
