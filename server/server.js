const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const googleStrategy = require('./oauth2/googleStrategy')

var app = express()

app.use(cookieParser())

const authRoutes = require('./routes/auth');
const dbRoutes = require('./routes/db');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

// Middleware
app.use(passport.initialize())
app.use(express.json())
app.use(cors(corsOptions))

app.get('/', passport.authenticate(
    'google', 
    {scope: [ 'email', 'profile' ]}
))

app.use('/auth', authRoutes)
app.use('/db', dbRoutes)


app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
