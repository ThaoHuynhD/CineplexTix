import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { getMovieShowTime } from '../../../api/api';
import SeatList from './SeatList';
import BookingCart from './BookingCart';
import { userLocalStorage } from '../../../api/localServices';

export default function BookTicketPage() {
  let info = userLocalStorage.get();
  if (info === null) {
    message.error("Vui Lòng Đăng Nhập Để Đặt Vé");
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
        message.error("Đã có lỗi xảy ra");
      }
    };
    fetchDataMovieShowDetail();
  }, [maLichChieu]);
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
    </div>
  )
}
