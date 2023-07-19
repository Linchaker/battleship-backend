require('dotenv').config();

module.exports = {
    MONGO_CONNECT: process.env.MONGO_CONNECT ?? '',
    HOST: process.env.HOST ?? "localhost",
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    FRONT_URL: process.env.FRONT_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PASS_SECRET: process.env.PASS_SECRET,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT: process.env.GOOGLE_OAUTH_REDIRECT,
}