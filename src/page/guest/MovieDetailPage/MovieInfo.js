import { Rate, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getMovieDetail } from '../../../api/api';
import { ERROR_MESSAGE } from '../../../constant/constant';

export default function MovieInfo({ maPhim }) {
    let [movieDetail, setMovieDetail] = useState([]);
    let fetchDataMovieDetail = async () => {
        try {
            let response = await getMovieDetail(maPhim);
            setMovieDetail(response.data.content);
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };

    useEffect(() => {
        fetchDataMovieDetail();
    }, [maPhim]);

    return (
        <div>
            <div className='z-0 relative h-400 w-screen
                            after:block after:bg-black after:opacity-70 
                            after:absolute after:top-0 after:left-0 after:-z-10
                            after:h-full after:w-screen'
                style={{
                    backgroundSize: 'cover', backgroundPositionY: '-100px'
                }}>
                <div className='container mx-auto px-4 relative overflow-hidden max-h-400'>
                    <iframe className='w-full m-auto h-400' src={movieDetail.trailer} type="video/mp4" frameBorder="0" allowFullScreen />
                    <div className='z-0 h-full w-full px-2 relative after:block  after:absolute after:top-0 after:left-0 
                                        after:z-10 after:h-full after:w-full after:bg-black after:opacity-50 '>
                    </div>
                </div>
            </div>
            <div className=' bg-black text-white py-5'>
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
                        <div className='lg:basis-3/4 lg:flex'>
                            <div className='basis-2/3 text-center'>
                                <h3 className='py-3 mb-3 text-3xl text-yellow-500 font-bold'>{movieDetail.tenPhim}</h3>
                                <span className='bg-yellow-500 py-2 px-4 text-red-800 font-extrabold'>
                                    {movieDetail.ngayKhoiChieu !== undefined ? (
                                        <>{movieDetail.ngayKhoiChieu.substring(0, 10)} - {movieDetail.ngayKhoiChieu.substring(14, 20)}</>
                                    ) : ''}
                                </span>
                                <p className='py-5 text-left'>{movieDetail.moTa}</p>
                            </div>
                            <div className='lg:flex-auto hidden lg:block basis-1/3'>
                                <div className='w-300 h-300'
                                    style={{
                                        backgroundImage: `url(https://i.pinimg.com/564x/ac/d8/f6/acd8f69cbba69e5e61e3ba84ffe0b2b2.jpg)`,
                                        backgroundSize: 'cover',
                                    }}>
                                    <h1 className='text-center text-8xl pt-24 font-bold px-auto'>{movieDetail.danhGia}</h1>
                                </div>
                                <Rate className='pl-20' disabled allowHalf value={movieDetail.danhGia / 2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
