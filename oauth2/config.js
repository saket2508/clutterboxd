require('dotenv').config()

const GOOGLE_CALLBACK_URI = process.env.NODE_ENV === "production" ? process.env.GOOGLE_CALLBACK_URI_PROD : process.env.GOOGLE_CALLBACK_URI_DEV

module.exports = {
    clientID: process.env.google_oauth_client_id,
    secret: process.env.google_oauth_client_secret,
    callbackURI: GOOGLE_CALLBACK_URI
}