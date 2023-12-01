import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getMovieDetail } from '../../../api/api';

export default function MovieInformation({ maPhim }) {
    let [movieDetail, setMovieDetail] = useState([]);
    let fetchDataMovieDetail = async (maPhim) => {
        try {
            let response = await getMovieDetail(maPhim);
            setMovieDetail(response.data.content);
        } catch {
            message.error('Đã có lỗi xảy ra');
        }
    };

    useEffect(() => {
        fetchDataMovieDetail(maPhim);
    }, [maPhim]);

    return (
        <div className=' py-5 text-black'>
            <div className='text-center'><span className='px-4 py-3 mx-auto text-2xl lg:text-3xl bg-red-700 font-semibold text-white text-center rounded-lg'
            >Chi Tiết Phim</span></div>
            <div className='container relative pt-10'>
                <div className='flex lg:flex-row flex-col gap-10 lg:mx-5 mx-auto'>
                    <div className='lg:basis-1/4 pl-0 w-full relative'>
                        <img className='mx-auto shadow-xl shadow-slate-600 w-300 rounded-lg' src={movieDetail.hinhAnh} alt='' />
                        <div className='absolute -bottom-5 -right-2 lg:hidden block rounded-full overflow-hidden'>
                            <div className='w-20 h-20'
                                style={{
                                    backgroundImage: `url(https://i.pinimg.com/564x/ac/d8/f6/acd8f69cbba69e5e61e3ba84ffe0b2b2.jpg)`,
                                    backgroundSize: 'cover',
                                }}>
                                <h1 className='px-auto pt-4 text-center text-yellow-400 text-lg font-bold'>{movieDetail.danhGia}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='basis-2/3 text-center'>
                        <h3 className='py-3 mb-3 text-3xl text-yellow-500 font-bold'>{movieDetail.tenPhim}</h3>
                        <span className='bg-yellow-500 py-2 px-4 text-red-800 font-extrabold'>
                            {movieDetail.ngayKhoiChieu !== undefined ? (
                                <>{movieDetail.ngayKhoiChieu.substring(0, 10)} - {movieDetail.ngayKhoiChieu.substring(14, 20)}</>
                            ) : ''}
                        </span>
                        <p className='py-5 text-left'>{movieDetail.moTa}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
