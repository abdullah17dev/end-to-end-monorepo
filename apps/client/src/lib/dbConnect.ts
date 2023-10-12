import mongoose from 'mongoose'

// let alreadyDone = false

// export async function ensureDbConnect() {
//   if (alreadyDone) {
//     return
//   }
//   alreadyDone = true
//   await mongoose.connect('mongodb://localhost:27017/course-selling-app')
// }
type Connection = {
  isConnected: boolean
}

const connection: Connection = {
  isConnected: false,
}

export async function ensureDbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(
    'mongodb://localhost:27017/course-selling-app'
  )

  //   connection.isConnected = db.connections[0].readyState
  connection.isConnected = db.connections[0].readyState === 1
  console.log(connection.isConnected)
}
