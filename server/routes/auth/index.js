const router = require('express').Router();
const pool = require('../../database/config');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../utils/jwtGenerator');
const authorize = require('../../middleware/authorize');

const maxAge = 3600*1000

router.post('/register', async(req, res) => {
    try{
        const { name, email, password } = req.body
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])
        if(user.rows.length !== 0){
            return res.status(401).json("User already exists")
        } else{
            const saltRound = 10
            const salt = await bcrypt.genSalt(saltRound)
            const bcryptPassword = await bcrypt.hash(password, salt)
            const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", 
                [name, email, bcryptPassword]
            )
            const token = jwtGenerator(newUser.rows[0].user_id)

            // store jwt in httpOnly cookie
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })

            res.status(201).json({success: true, message:"User is registered"})
        }
    } catch(err){
        console.error(err.message)
        res.status(500).json({"message": "Server Error"})
    }
})

router.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if(user.rows.length === 0){
            return res.status(401).json("Password or email is incorrect")
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
        if(!validPassword){
            return res.status(401).json("Password or email is incorrect")
        }
        const token = jwtGenerator(user.rows[0].user_id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(201).json({"success": true, message:"User is signed in"})
    } catch(err){
        console.error(err.message)
        res.status(500).send({message: "Server Error"})
    }
})

router.get('/logout', async(req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(201).json("user signed out")
})

router.get("/user", authorize, async (req, res) => {
    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [req.user] 
      ); 
      res.json({user: user.rows[0]});
    } catch (err) {
      console.error(err.message);
      res.status(500).send({"mesage": "Server error"});
    }
  });

router.get("/", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({"mesage": "Server error"});
    }
  });

module.exports = router;