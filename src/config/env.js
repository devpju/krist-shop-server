import dotenv from 'dotenv'
dotenv.config()

const env = {
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  MONGO_DB_URI: process.env.MONGO_DB_URI
}

export default env
