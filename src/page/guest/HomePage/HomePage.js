import React from 'react'
import SliderMovie from '../../../component/SliderMovie';
import ShowTimeListByTheater from '../../../component/ShowTimeListByTheater';
import MovieFilterByName from '../../../component/MovieFilterByName';
import MovieList from '../../../component/MovieList';

export default function HomePage() {
    return (
        <div className='mt-18 '>
            <div id='movieBanner'><SliderMovie /></div>
            <div id='movieFilter'><MovieFilterByName /></div>
            <div id='schedule'><MovieList /></div>
            <div id='groupcinema'><ShowTimeListByTheater /></div>
        </div>
    )
}

