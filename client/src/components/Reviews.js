import React, { useContext } from 'react'
import { UIThemeContext } from '../context/UIThemeContext'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Avatar } from '@mui/material'
import { indigo } from '@mui/material/colors'

export default function Reviews({ reviews, media_type }) {

    const { colorTheme } = useContext(UIThemeContext)

    const LastUpdated = ({timestamp}) => {
        let date_posted = new Date(timestamp)
        let str_parsed = date_posted.toString().split(' ')
        let time_delta = new Date().getTime() - date_posted.getTime()
        let seconds = time_delta/1000
        if(seconds <= 60){
            return '0 mins ago'
        } else if(seconds > 60 && seconds <= 120){
            return '1 min ago'
        } else if(seconds > 120 && seconds < 3600) {
            let mins = Math.floor(seconds/60)
            return `${mins} mins ago`
        } else if(seconds >= 3600 && seconds < 24*3600){
            let hours = Math.floor(seconds/3600)
            return `${hours} hours ago`
        } else if(seconds >= 24*3600 && seconds <= 365*24*3600) {
            let mon = str_parsed[1]
            let day = str_parsed[2]
            return `${day} ${mon}`
        } else {
            let mon = str_parsed[1]
            let day = str_parsed[2]
            let year = str_parsed[3]
            return `${day} ${mon} ${year}`
        }
    }


    // LIST ALL REVIEWS
    if(!reviews || reviews.length === 0){
        return(
            <div className="my-3 px-6 xl:px-20 ">
                <div className="text-xl">
                    Reviews
                </div>
                {media_type === 'movie' ? <p className="mt-3 font-light italic">
                    No reviews have been posted yet. Be the first to review this film. 
                </p> : <p className="mt-3 font-light italic">
                    No reviews have been posted yet. Be the first to review this show. 
                </p>}
            </div>
        )
    }

    return (
        <div id="reviews" className="w-full my-3 px-6 xl:px-20">
            <div className="text-xl">
                Reviews
            </div>
            <div className="mt-3">
                {reviews.map((review, idx) => {
                    return(
                        <div className="lg:w-4/5 p-2 dark:bg-body-dark rounded-xl border border-outline-light dark:border-outline-dark mb-4" key={idx}>
                            <div className="italic text-lg pt-1">
                                {review.title}
                            </div>
                            <div className="flex items-center">
                                <Avatar
                                    sx={{ 
                                        width: 26, 
                                        height: 26, 
                                        bgcolor: colorTheme === 'light' ? '#818CF8' : '#4F46E5' ,
                                        color: 'white'
                                    }}
                                >
                                    {review.reviewer[0].toUpperCase()}
                                </Avatar>
                                <div className="text-sm pl-1 pt-1 font-medium">
                                    {review.reviewer}
                                </div>
                            </div>
                            <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark pt-1">
                                <LastUpdated timestamp={review.reviewedat}/>
                            </div>
                            <div className="pt-1">
                                <Box component="fieldset" borderColor="transparent">
                                        <Rating
                                            name="read-only"
                                            precision={0.5}
                                            value={review.rating}
                                            icon={<StarIcon/>}
                                            emptyIcon={<StarIcon color='inherit'/>}
                                            readOnly
                                        />
                                </Box>
                            </div>
                            <p className="pt-1 font-light">
                                {review.body}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
