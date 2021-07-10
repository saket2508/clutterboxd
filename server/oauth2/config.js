require('dotenv').config()

const GOOGLE_CALLBACK_URI = 'http://localhost:5000/auth/google/callback'

module.exports = {
    clientID: process.env.google_oauth_client_id,
    secret: process.env.google_oauth_client_secret,
    callbackURI: GOOGLE_CALLBACK_URI
}