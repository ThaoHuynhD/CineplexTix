import React from 'react'
import MovieInfo from './MovieInfo'
import ShowTimeListByMovie from './ShowTimeListByMovie'
import { useParams } from 'react-router-dom';
import MovieList from '../../../component/MovieList';
export default function MovieDetailPage() {
  let params = useParams();
  let maPhim = params.maPhim.substring(1, params.maPhim.length);
  return (
    <div className='pt-20'>
      <MovieInfo maPhim={maPhim} />
      <ShowTimeListByMovie maPhim={maPhim} />
      <MovieList />
    </div>
  )
}
