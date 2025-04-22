import React from 'react'

export default function Loader() {
    return (
        <div className="w-screen h-[500px] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="loader"></div>
                <div className="loader2"></div>
                <p className='pt-10'>Loading</p>
            </div>
        </div>
    )
}
