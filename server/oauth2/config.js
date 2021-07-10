require('dotenv').config()
module.exports = {
    clientID: process.env.google_oauth_client_id,
    secret: process.env.google_oauth_client_secret,
    callbackURI: 'http://localhost:5000/auth/google/callback'
}