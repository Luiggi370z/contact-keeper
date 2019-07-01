import Mongoose from 'mongoose'

const attachConnectionEvents = mediator => {
  let conn = Mongoose.connection

  conn.on('error', err => mediator.emit('db.error', err))
  mediator.emit('db.ready', conn)
}

export const connect = async mediator => {
  mediator.emit('busy', 'Connecting to Database')

  try {
    await Mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    attachConnectionEvents(mediator)
  } catch (err) {
    return mediator.emit('db.connection.error', err)
  }
}
