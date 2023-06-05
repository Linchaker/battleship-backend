require('dotenv').config();

module.exports = {
    MONGO_CONNECT: process.env.MONGO_CONNECT ?? '',
    HOST: process.env.HOST ?? "localhost",
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
}