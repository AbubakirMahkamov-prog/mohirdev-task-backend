import dotenv from 'dotenv'

dotenv.config();


export default {
    PORT: process.env.PORT || 3000,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || ''
}
