require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./oauth2/googleStrategy')

var app = express()

const authRoutes = require('./routes/auth');
const dbRoutes = require('./routes/db');

// Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())

app.get('/oauth', passport.authenticate(
    'google', 
    {scope: [ 'email', 'profile' ]}
))

app.use('/auth', authRoutes)
app.use('/db', dbRoutes)

const port = process.env.PORT || 5000

// DEPLOY TO HEROKU
// Serve static access if in production
if(process.env.NODE_ENV === "production"){
    // Set a static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
  }

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
