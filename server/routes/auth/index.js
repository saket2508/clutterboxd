require('dotenv').config()
const router = require('express').Router()
const pool = require('../../database/config')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../utils/jwtGenerator')
const authorize = require('../../middleware/authorize')
const validate = require('../../middleware/validation')
const passport = require('passport')
const cookieParser = require('cookie-parser')
require('../../oauth2/googleStrategy')

const APP_REDIRECT_URI = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URI_PROD : process.env.CLIENT_URI_DEV


router.post('/register', validate, async(req, res) => {
    try{
        const { name, email, password } = req.body
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])
        if(user.rows.length !== 0){
            return res.status(401).json({success: false, error: "User already exists"})
        } else{
            const saltRound = 10
            const salt = await bcrypt.genSalt(saltRound)
            const bcryptPassword = await bcrypt.hash(password, salt)
            const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
                [name, email, bcryptPassword]
            )
            const token = jwtGenerator(newUser.rows[0].user_id)

            res.status(201).json({success: true, message:"User is registered", token: token})
        }
    } catch(err){
        console.error(err.message)
        res.status(500).json({error: "Server Error", success: false})
    }
})

router.post('/login', validate, async(req, res) => {
    try{
        const { email, password } = req.body

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if(user.rows.length === 0){
            return res.status(401).json({success: false, error: "Password or email is incorrect"})
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).json({success: false, error: "Password or email is incorrect"})
        }
        const token = jwtGenerator(user.rows[0].user_id)

        res.status(201).json({"success": true, message:"User is signed in", token: token})
    } catch(err){
        console.error(err.message)
        res.status(500).json({error: "Server Error", success: false})
    }
})


router.get("/user", authorize, async (req, res) => {
    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [req.user] 
      )
      const { user_name, user_email } = user.rows[0]
      res.json({user: { user_name, user_email } });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({error: "Server error"});
    }
  })

router.get("/", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({error: "Server error"});
    }
  })

// Google auth callback URI
router.get('/google/callback', passport.authenticate(
  'google', 
  {scope: [ 'email', 'profile' ]},
), (req, res) => {
  try {
    const token = jwtGenerator(req.user.user_id)
    res.redirect(`${APP_REDIRECT_URI}/callback?token=${token}`)
  } catch (error) {
    console.error(error.message)
    res.redirect(`${APP_REDIRECT_URI}/login`)
  }
})

module.exports = router;