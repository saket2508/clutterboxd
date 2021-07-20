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
    {scope: [ 'email', 'profile' ]},
))

app.use('/auth', authRoutes)
app.use('/db', dbRoutes)

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
