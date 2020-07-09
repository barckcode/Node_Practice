const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
    this.dbName = DB_NAME
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect()
        console.log('Connected Successfully to MongoDB')
        MongoLib.connection = this.client.db(this.dbName)
      } catch (err) {
        console.log(err)
      }
    }

    return MongoLib.connection
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect()
      return await db.collection(collection).find(query).toArray()
    } catch (err) {
      console.log(err)
    }
  }

  async get(collection, id) {
    try {
      const db = await this.connect()
      return await db.collection(collection).findOne({ _id: ObjectId(id) })
    } catch (err) {
      console.log(err)
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect()
      const result = await db.collection(collection).insertOne(data)
      return result.insertedId
    } catch (err) {
      console.log(err)
    }
  }

  async update(collection, id, data) {
    try {
      const db = await this.connect()
      const result = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      return result.upsertedId || id
    } catch (err) {
      console.log(err)
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect()
      await db.collection(collection).deleteOne({ _id: ObjectId(id) })
      return id
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MongoLib