import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const APIkey = process.env.REACT_APP_TMDB_API_KEY

export default function Search() {

    const [ search, setSearch ] = useState('')
    const [ searchResults, setSearchResults ] = useState([])
    const [ selected, setSelected ] = useState(false)
    const searchURL = `https://api.themoviedb.org/3/search/multi?api_key=${APIkey}&language=en-US&page=1&include_adult=false&`

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(selected) return setSearchResults([])
        let cancel = false
        axios.get(`${searchURL}query=${search}`)
            .then(res => res.data)
            .then(data => {
                if (cancel) return
                setSearchResults(data.results)
            }).catch(err => {
                console.error(err)
                setSearchResults([])
                return
            })
        return () => (cancel = true)
    }, [search, selected])

    const getTitle = movie => {
        let title = movie.original_title || movie.name || movie.original_name
        return `${title}`
    }

    const getReleaseYear = movie => {
        let release_year = ''
        if(movie.release_date){
            release_year = movie.release_date.slice(0, 4) + ' '
        }
        return `${release_year}`
    }

    const getMediaType = movie => {
        let type = ''
        if(movie.media_type){
            type = movie.media_type
        }
        return `${type}`
    }

    const selectOption = option => {
        let title = getTitle(option)
        setSearch(title)
        setSelected(true)
    }

    const Results = () => {
        if(searchResults.length === 0){
            return(
                <div></div>
            )
        }
        else{
            let options = searchResults.slice(0, 5)
            return(
                <div className="relative container">
                    <div className="absolute bg-white dark:bg-search-dark dark:text-white shadow-lg w-full">
                        {options.map((item, index) => {
                            return(
                                <Link onClick={() => selectOption(item)} to = {`/${item.media_type}/${item.id}`}>
                                    <div className="p-2 hover:bg-gray-100 dark:hover:bg-text-secondary-light">
                                        {item.original_title || item.name || item.original_name} ({getReleaseYear(item)}{getMediaType(item)})
                                    </div>
                                </Link>
                            ) 
                        })}
                    </div>
                </div>
            )
        }
    }

    return (
        <>
        <div className="hidden md:inline-block mr-2">
            <div className="relative">
                    <div className="absolute left-2 top-2">
                        <div className="inline-block text-gray-600 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <input 
                        value = {search}
                        onFocus={() => setSearchResults([])}
                        onChange = {e => {
                            setSearch(e.target.value)
                            if(selected){
                                setSelected(false)
                            }
                        }}
                        type="search"
                        placeholder="Search movies and shows"
                        style={{minWidth:'300px'}} 
                        className="search p-2 pl-8 focus:outline-none bg-gray-200 dark:bg-search-dark dark:text-white"
                    />
            </div>
            <Results/>
        </div>
        <div className="md:hidden">
            <div className="relative">
                <div className="absolute left-3 top-3">
                    <div className="inline-block text-gray-600 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <input 
                    value = {search}
                    onFocus={() => setSearchResults([])}
                    onChange = {e => {
                        setSearch(e.target.value)
                        if(selected){
                            setSelected(false)
                        }
                    }}
                    type="search"
                    placeholder="Search movies and shows" 
                    className="search p-3 pl-9 w-full focus:outline-none bg-gray-200 dark:bg-search-dark dark:text-white"
                />
            </div>
            <Results/>
        </div>
        </>
    )
}
