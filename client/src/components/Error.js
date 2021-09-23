import React from 'react'

export default function Error() {
    return (
        <div className="w-full font-body">
                <div className="mt-10 flex flex-col justify-center items-center">
                    <img className="h-72 w-72 sm:h-80 sm:w-80" src='/assets/error_img.png'/>
                    <h1 className="text-4xl text-black dark:text-white pt-3">Error!</h1>
                    <p className="text-gray-700 dark:text-white text-sm sm:text-base tracker-wide mt-3">
                        Could not get data from the server.
                    </p>
                </div>
        </div>
    )
}
