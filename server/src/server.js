import express from 'express'
import routes from './routes'

const app = express()

// Settings
app.set('port', process.env.PORT || 5000)

// Middlewares
app.use(express.json())

// Routes
app.use('/api', routes)

export default app
