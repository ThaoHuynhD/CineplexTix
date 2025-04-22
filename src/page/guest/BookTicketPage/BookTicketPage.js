import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { getMovieShowTime } from '../../../api/api';
import SeatList from './SeatList';
import BookingCart from './BookingCart';
import { userLocalStorage } from '../../../api/localServices';
import ShowTimeListByTheater from '../../../component/ShowTimeListByTheater';
import MovieFilterByName from '../../../component/MovieFilterByName';
import Loader from '../../../component/Loader';
import { ERROR_MESSAGE, ERROR_MESSAGE_PERMISSION } from '../../../constant/constant';

export default function BookTicketPage() {
  let info = userLocalStorage.get();
  if (info === null) {
    message.error(ERROR_MESSAGE_PERMISSION);
    setTimeout(() => {
      window.location.href = '/sign-in';
    }, 500);
  }

  let params = useParams();
  let maLichChieu = params.maLichChieu.substring(1, params.maLichChieu.length);
  let cart = useSelector((state) => state.cartReducer.cart);

  const [movieShowDetail, setMovieShowDetail] = useState([]);
  useEffect(() => {
    const fetchDataMovieShowDetail = async () => {
      try {
        const response = await getMovieShowTime(maLichChieu);
        setMovieShowDetail(response.data.content);
      } catch {
        message.error(ERROR_MESSAGE);
      }
    };
    fetchDataMovieShowDetail();
  }, [maLichChieu]);
  if (!movieShowDetail || !movieShowDetail.danhSachGhe || !cart) {
    return <Loader />;
  }
  return (
    <div className="container lg:p-10">
      <div className='flex lg:flex-row flex-col'>
        <div className='mx-auto'>
          <SeatList movieShowDetail={movieShowDetail} cart={cart} />
        </div>
        <div className='xl:ml-5'>
          <BookingCart movieShowDetail={movieShowDetail} cart={cart} />
        </div>
      </div>
      <MovieFilterByName />
      <ShowTimeListByTheater />
    </div>
  )
}
