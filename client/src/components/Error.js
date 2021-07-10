import React from 'react'

export default function Error() {
    return (
        <div className="w-full font-body">
        <div className="flex justify-center items-center mt-20 mb-20 sm:mb-0 pt-20">
            <p className="text-lg text-gray-700 font-bold tracker-wide">
                Could not get data from the API :(
            </p>
        </div>
    </div>
    )
}
