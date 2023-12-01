import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    let navigate = useNavigate();
    return (
        <main className="p-52 grid min-h-full h-screen w-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
            style={{
                backgroundImage: `url(https://i.pinimg.com/736x/25/fb/a5/25fba5e5fee645836650cc4eca58ef73.jpg)`,
                backgroundSize: 'cover',
            }}>
            <div className="text-center">
                <p className="text-3xl font-semibold text-orange-600">404</p>
                <h1 className="mt-4 text-6xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-white">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button onClick={() => { navigate('/homepage') }}
                        className="rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white 
                    shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-orange-600">Go back home</button>
                    <button className="text-sm font-semibold text-white">Contact support <span aria-hidden="true">&rarr;</span></button>
                </div>
            </div>
        </main>
    )
}
