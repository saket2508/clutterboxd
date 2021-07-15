const config = require('./config')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const pool = require('../database/config')


passport.use(new GoogleStrategy({
        clientID: config.clientID,
        clientSecret: config.secret,
        callbackURL: config.callbackURI,
        passReqToCallback: true,
    },
    async function(req, res, accessToken, refreshToken, profile, done){
        const { name, emails } = profile
        let user_name = name.givenName
        let user_email = emails[0].value
        let user = null
        // Check if user with this gmail id exists
        try{
            const userExists = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email] )
            // If user does not exist, create a new instance in the users table
            if(userExists.rows.length === 0){
                const newUser = await pool.query('INSERT INTO users(user_email, user_name) VALUES ($1, $2) RETURNING *',
                    [user_email, user_name]
                )
                user = newUser.rows[0]
            }
            // Else get user from the DB
            else{
                user = userExists.rows[0]
            }
            return done(null, user)
        } catch(err){
            console.error(err.message)
            return done(err, user)
        }
    }
))

passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})