import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()

// Settings
app.set('port', process.env.PORT || 5000)
app.use(cors())

// Middlewares
app.use(express.json({ extended: false }))

// Routes
app.use('/api', routes)

export default app
