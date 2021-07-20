import React, { useState, useContext } from 'react'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'

import { ThemeContext } from '../context/ThemeContext'
import { AppContext } from '../context/AppContext'
import StarIcon from '@material-ui/icons/Star'
import axios from 'axios'
import { Button } from '@material-ui/core'

const ADD_REVIEW_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db/add/review' : '/db/add/review'

export default function AddReview(props) {

    const { colorTheme } = useContext(ThemeContext)
    const { currentUser, setUserReviews } = useContext(AppContext)

    // MODAL
    const { setReviews, reviewFormOpen, setReviewFormOpen, id, media_type} = props

    const [ loading, setLoading ] = useState(false)
    const [ body, setBody ] = useState()
    const [ title, setTitle ] = useState()
    const [ rating, setRating ] = useState(5)

    const handleClose = () => {
        setReviewFormOpen(false)
    }

    const clearForm = () => {
        setTitle()
        setBody()
        setRating(5)
        setReviewFormOpen(false)
    }

    const submitReviewData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${ADD_REVIEW_URI}/${media_type}/${id}`, {
                title : title,
                body : body,
                rating : rating,
                reviewer : currentUser.user_name
            }, { headers: { jwt_token: localStorage.token } })
            console.log(res.data)
            const { newReview, success } = res.data
            if(success){
                setReviews(reviews => [...reviews, newReview])
                setUserReviews(userReviews => [...userReviews, newReview])
                console.log('Success!')
            }
            setLoading(false)
            clearForm()
        } catch (err) {
            console.log(err.message)
        }
    }

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={!fullScreen}
                open={reviewFormOpen} 
                onClose={handleClose} 
                aria-labelledby="review-dialog-title"
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                PaperProps = {{style: {backgroundColor: colorTheme==="light" ? "#27272A" : "white"}}}
            >
                <form onSubmit={e => submitReviewData(e)} className="font-heading p-6">
                    <div className="hidden sm:flex justify-between items-start">
                        <div className="text-xl dark:text-white mb-4 font-medium">Post Review</div>
                        <IconButton size = "small" onClick={handleClose} aria-label="close">
                            <CloseIcon style={{color: colorTheme==='light'? '#9CA3AF' : '#4B5563', fontSize: 24}}/>
                        </IconButton>
                    </div>
                    <div className="flex justify-between items-start w-100 sm:hidden pb-4">
                        <IconButton size = "small" onClick={handleClose} aria-label="close">
                            <CloseIcon style={{color: colorTheme==='light'? '#9CA3AF' : '#4B5563', fontSize: 24}}/>
                        </IconButton>
                        <div className="text-xl dark:text-white font-medium">Post Review</div>
                            {loading===true 
                                ? <Button style={{color:'white', backgroundColor:colors.indigo[300]}} size="small" variant="contained" disabled>
                                     <CircularProgress style={{color:'white'}} size={18} thickness={6}/>
                                </Button>
                                : <Button type="submit" style={{color:'white', backgroundColor:colors.indigo[500]}} size="small" variant="contained">POST</Button>
                            }
                        </div>
                    <p className="pb-4 text-text-secondary-light dark:text-text-secondary-dark mt-4 mb-2 sm:m-0">
                        Give your review a title and don't forget to add a rating
                    </p>
                    <Box component="fieldset" borderColor="transparent">
                        <Rating
                            name="simple-controlled"
                            precision={0.5}
                            value={rating}
                            icon={<StarIcon/>}
                            emptyIcon={<StarIcon color='inherit'/>}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </Box>
                    <div className="mt-2">
                        <input value={title} placeholder="Title" id="title" onChange={e => setTitle(e.target.value)} className="textfieldtitle w-100 focus:outline-none bg-white dark:bg-form-dark dark:text-white" required/>
                    </div>
                    <div className="mt-2">
                        <textarea value={body} placeholder="Body" id="body" onChange={e => setBody(e.target.value)} rows={8} className="textfield w-100 focus:outline-none bg-white dark:bg-form-dark dark:text-white" required/>
                    </div>
                    <div className='hidden sm:flex justify-end mt-3'>
                        {loading===true 
                        ? <Button style={{color:'white', backgroundColor:colors.indigo[300]}} size="small" variant="contained" disabled>
                            <CircularProgress style={{color:'white'}} size={18} thickness={6}/>
                          </Button>
                        : <Button type="submit" style={{color:'white', backgroundColor:colors.indigo[500]}} size="small" variant="contained">POST</Button>
                        }
                    </div>
                </form>
        </Dialog>
        </div>
    )
}
