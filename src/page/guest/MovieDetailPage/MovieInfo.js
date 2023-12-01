import { Modal, Rate, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getMovieDetail } from '../../../api/api';
import { PlayCircleOutlined } from '@ant-design/icons';

export default function MovieInfo({ maPhim }) {
    let [movieDetail, setMovieDetail] = useState([]);
    let fetchDataMovieDetail = async () => {
        try {
            let response = await getMovieDetail(maPhim);
            setMovieDetail(response.data.content);
        } catch {
            message.error('Đã có lỗi xảy ra');
        }
    };

    useEffect(() => {
        fetchDataMovieDetail();
    });


    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <div className='z-0 relative h-400 w-screen
                            after:block after:bg-black after:opacity-70 
                            after:absolute after:top-0 after:left-0 after:-z-10
                            after:h-full after:w-screen'
                style={{
                    backgroundImage: `url(${movieDetail.hinhAnh})`,
                    backgroundSize: 'cover', backgroundPositionY: '-100px'
                }}>
                <div className='container mx-auto px-4 relative overflow-hidden max-h-400'>
                    <img className='w-full m-auto h-800' src={movieDetail.hinhAnh} alt='' />
                    <div className='z-0 h-full w-full px-2 relative after:block  after:absolute after:top-0 after:left-0 
                                        after:z-10 after:h-full after:w-full after:bg-black after:opacity-50 '>
                    </div>
                    <div className='w-full h-full absolute bottom-0 left-0 text-center'>
                        <button onClick={() => { showModal(movieDetail) }}
                            type='button' className='text-6xl text-white font-bold
                                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                ' ><PlayCircleOutlined /></button>
                    </div>
                </div>
            </div>
            <Modal
                title={movieDetail.tenPhim}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <iframe
                    title={movieDetail.tenPhim}
                    width='100%'
                    height='400'
                    src={movieDetail.trailer}
                    frameborder='0'
                    allowfullscreen
                ></iframe>
            </Modal>
            <div className=' bg-black text-white py-5'>
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
