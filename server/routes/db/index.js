const router = require('express').Router();
const pool = require('../../database/config');
const authorize = require('../../middleware/authorize');

router.get('/', authorize, async(req, res) => {
    try{
        const user = req.user
        if(!user){
            return res.status(401).json("User not signed in")
        }
        const list = await pool.query(
            "SELECT * from watchlist WHERE user_id = $1",
            [user]
        )
        res.json({watchlist: list.rows, success: true, message:"Retrieved list of saved movies"})
    } catch(err){
        console.error(err.message)
        res.status(500).json("Could not fetch saved movies and shows")
    }
})

router.get('/reviews', authorize, async(req, res) => {
    try {
        const user = req.user
        if(!user){
            return res.status(401).json("User not signed in")
        }
        const reviewsPostedByUser = await pool.query('SELECT * from reviews WHERE user_id=$1',
            [user]
        )
        res.json({ reviewsPostedByUser: reviewsPostedByUser.rows, success: true, message: "Fetched user reviews" })
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Could not fetch reviews")
    }
})

router.get('/reviews/:media/:id', authorize, async(req, res) => {
    try {
        const user = req.user
        if(!user){
            return res.status(401).json("User not signed in")
        }
        const { media, id } = req.params
        const reviews = await pool.query('SELECT * from reviews WHERE media_type=$1 AND index=$2', 
            [media, id]
        )
        res.json({reviews: reviews.rows, success: true, message: "Fetched all reviews"})
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Could not fetch reviews")
    }
})


router.post('/add/review/:media/:id', authorize, async(req, res) => {
    try{
        const user = req.user
        if(!user){
            return res.status(401).json("User not signed in")
        }
        const { media, id } = req.params
        const { title, body, rating, reviewer } = req.body
        const newReview = await pool.query('INSERT INTO reviews(user_id, index, media_type, title, body, rating, reviewer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
            [user, id, media, title, body, rating, reviewer]
        )
        res.json({ newReview: newReview.rows[0], success: true, message: 'Uploaded review' })
    } catch(err){
        console.error(err.message)
        console.log('Could not upload review')
        res.status(500).json("Could not upload review")
    }
})

router.post('/add/movie', authorize, async(req, res) => {
    try{
        const user = req.user
        if(!user){
            console.log('User not signed in')
            return res.status(401).json("User not signed in")
        }
        const { media_type, id, item } = req.body
        const newItem = await pool.query(
            "INSERT into watchlist (user_id, index, media_type, title, poster_img, backdrop_img, genres, overview, cast_and_credits, runtime, tmdb_rating, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [user, id, media_type, item.title, item.poster_img, item.backdrop_img, item.genres, item.overview, item.cast_and_credits, item.runtime, item.tmdb_rating, item.release_date]
        )
        res.json({newItem: newItem.rows[0], success: true, message: `Added movie to list`})
    } catch(err){
        console.error(err.message)
        console.log('Could not add item to list')
        res.status(500).json("Could not add item to list")
    }
})

router.post('/add/tv', authorize, async(req, res) => {
    try{
        const user = req.user
        if(!user){
            return res.status(401).json("User not signed in")
        }
        const { media_type, id, item } = req.body
        const newItem = await pool.query(
            "INSERT into watchlist (user_id, index, media_type, title, poster_img, backdrop_img, genres, overview, cast_and_credits, number_of_seasons, tmdb_rating, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [user, id, media_type, item.title, item.poster_img, item.backdrop_img, item.genres, item.overview, item.cast_and_credits, item.number_of_seasons, item.tmdb_rating, item.first_air_date]
        )
        res.json({newItem: newItem.rows[0], success: true, message: `Added show to list`})
    } catch(err){
        console.error(err.message)
        res.status(500).json("Could not add item to list")
    }
})

router.delete('/delete/:media/:id', authorize, async(req, res) => {
    try{
        const user = req.user
        const media_type = req.params.media
        const id = req.params.id
        const item  = media_type === 'tv' ? 'show' : 'movie'
        if(!user){
            return res.status(401).json("User not signed in")
        }
        const deletedItem = await pool.query(
            "DELETE FROM watchlist WHERE (user_id = $1 AND media_type = $2 AND index = $3) RETURNING *",
            [user, media_type, id]
        )
        res.json({success: true, message: `Removed ${item} from list`})
    } catch(err){
        console.error(err.message)
        res.status(500).json("Could not remove item from list")
    }
})

module.exports = router;