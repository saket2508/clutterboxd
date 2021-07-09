const express = require('express')
var app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(cookieParser())

const authRoutes = require('./routes/auth');
const dbRoutes = require('./routes/db');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

// Middleware
app.use(express.json())
app.use(cors(corsOptions))

app.use('/auth', authRoutes)
app.use('/db', dbRoutes)


app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
