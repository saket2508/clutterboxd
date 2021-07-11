require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')

var app = express()

const authRoutes = require('./routes/auth');
const dbRoutes = require('./routes/db');

const corsDevOptions ={
    origin: process.env.CLIENT_URI_DEV, 
    credentials: true,            
    optionSuccessStatus: 200
}

const corsProdOptions ={
    origin: process.env.CLIENT_URI_PROD, 
    credentials: true,            
    optionSuccessStatus: 200
}

// Middleware
app.use(process.env.NODE_ENV === 'production' ? cors(corsProdOptions) : cors(corsDevOptions))
app.use(cookieParser())
app.use(express.json())
app.use(passport.initialize())

app.get('/', passport.authenticate(
    'google', 
    {scope: [ 'email', 'profile' ]}
))

app.use('/auth', authRoutes)
app.use('/db', dbRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
