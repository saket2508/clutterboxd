import React, { useState, useContext } from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { colors } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { UIThemeContext } from '../context/UIThemeContext'
import { AppContext } from '../context/AppContext'
import StarIcon from '@mui/icons-material/Star'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize'

import axios from 'axios'

const ADD_REVIEW_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db/add/review' : '/db/add/review'

export default function AddReview(props) {

    const { colorTheme } = useContext(UIThemeContext)
    const { currentUser, setUserReviews } = useContext(AppContext)

    // MODAL
    const { setReviews, reviewFormOpen, setReviewFormOpen, id, media_type} = props

    const [ loading, setLoading ] = useState(false)
    const [ body, setBody ] = useState()
    const [ title, setTitle ] = useState()
    const [ rating, setRating ] = useState(0)

    const handleClose = () => {
        setReviewFormOpen(false)
    }

    const clearForm = () => {
        setTitle()
        setBody()
        setRating(0)
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
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={!fullScreen}
                open={reviewFormOpen} 
                onClose={handleClose} 
                aria-labelledby="review-dialog-title"
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
            >
                <form onSubmit={e => submitReviewData(e)} className="font-body p-6">
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
                                ? <Button style={{color:'white', backgroundColor: '#818CF8'}} size="small" variant="contained" disabled>
                                    <CircularProgress style={{color:'white'}} size={22} thickness={6}/>
                                    </Button>
                                : <Button type="submit" style={{color:'white', backgroundColor: colorTheme === 'light' ? '#818CF8' : '#4F46E5'}} size="small" variant="contained">POST</Button>
                            }
                        </div>
                    <p className="pb-4 text-text-secondary-light dark:text-gray-200 mt-4 mb-2 sm:m-0">
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
                    <div className="container">
                        <div className="mt-2">
                            <input value={title} placeholder="Title" id="title" onChange={e => setTitle(e.target.value)} className="textfield w-100 focus:outline-none bg-transparent dark:text-white" required/>
                        </div>
                        <div className="mt-2">
                            {/* <textarea value={body} placeholder="Body" id="body" onChange={e => setBody(e.target.value)} rows={fullScreen ? 12 : 8} className="textfield w-100 h-100 sm:h-auto focus:outline-none bg-transparent dark:text-white" required/>
                             */}
                             <TextareaAutosize
                                placeholder = "Body"
                                id = "body"
                                onChange={e => setBody(e.target.value)}
                                value = {body}
                                minRows = {fullScreen ? 12 : 8}
                                className="textfield w-100 h-100 sm:h-auto focus:outline-none bg-transparent dark:text-white"
                                required
                             />
                        </div>
                        <div className='hidden sm:flex justify-end mt-3'>
                            {loading===true 
                            ? <Button style={{color:'white', backgroundColor: '#818CF8'}} size="small" variant="contained" disabled>
                                <CircularProgress style={{color:'white'}} size={22} thickness={6}/>
                            </Button>
                            : <Button type="submit" style={{color:'white', backgroundColor: colorTheme === 'light' ? '#818CF8' : '#4F46E5'}} size="small" variant="contained">POST</Button>
                            }
                        </div>
                    </div>
                </form>
        </Dialog>
        </div>
    )
}
