import React from 'react'

export default function Error() {
    return (
        <div className="w-full font-body">
        <div className="flex justify-center items-center mt-20 mb-20 sm:mb-0 pt-20">
            <p className="text-lg text-red-600 dark:text-red-400 font-bold tracker-wide">
                Could not get data from the server :(
            </p>
        </div>
    </div>
    )
}
