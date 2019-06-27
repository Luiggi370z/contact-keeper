import { EventEmitter } from 'events'
import app from './server'
import { connect } from './database'
import ora from 'ora'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  const path = require('path')

  dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || 'local'}`),
  })
}

const mediator = new EventEmitter()
let spinner

async function main() {
  mediator.emit('busy', 'Starting Server')
  const port = app.get('port')

  await app.listen(port)
  mediator.emit('completed')
  console.log(`\t- Server listening on port ${port} 👀`)

  spinner && spinner.clear()
}

mediator.on('db.ready', async connection => {
  mediator.emit('completed')
  await main()
})

mediator.on('db.error', err => {
  console.log('Database Error 🐛')
  throw err
})

mediator.on('db.connection.error', err => {
  mediator.emit('failed')
  console.log('Database Connection Error 🐛')
  throw err
})

mediator.on('busy', msg => {
  spinner = ora(msg).start()
})

mediator.on('completed', () => {
  spinner && spinner.succeed()
})

mediator.on('failed', () => {
  spinner && spinner.fail()
})

connect(mediator)
