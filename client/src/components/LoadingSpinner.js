import React from 'react'

export default function LoadingSpinner() {
    return (
    <div className="flex justify-center items-center mt-20 mb-20 sm:mb-0 pt-20">
        <div className="h-2.5 w-2.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full mr-1 animate-bounce"></div>
        <div className="h-2.5 w-2.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full mr-1 animate-bounce200"></div>
        <div className="h-2.5 w-2.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce400"></div>
    </div>
    )
}
