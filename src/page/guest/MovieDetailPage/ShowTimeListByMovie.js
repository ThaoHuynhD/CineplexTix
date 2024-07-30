import { ConfigProvider, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getShowTimeByMovie } from '../../../api/api';
import { NavLink } from 'react-router-dom';

export default function ShowTimeListByMovie({ maPhim }) {
    let [theaterGroupList, setTheaterGroupList] = useState([]);
    let fetchDataMovieDetail = async (maPhim) => {
        try {
            let response = await getShowTimeByMovie(maPhim);
            setTheaterGroupList(response.data.content);
        } catch {
            message.error('Đã có lỗi xảy ra');
        }
    };

    useEffect(() => {
        fetchDataMovieDetail(maPhim);
    }, [maPhim]);

    const renderShowTimeList = (theater) => {
        return theater.lichChieuPhim.map((show, index) => {
            return (
                <div key={index}>
                    <NavLink to={`/purchasing/:${show.maLichChieu}`}>
                        <button className='btn btn-dark px-0 mx-1 lg:ml-4 my-2 w-full lg:w-40'>
                            <span className='text-white'>{show.ngayChieuGioChieu.substring(0, 10)}</span> -
                            <span className='text-yellow-500'><b> {show.ngayChieuGioChieu.substring(14, 20)}</b></span>
                        </button>
                    </NavLink>
                </div>
            )
        })
    }

    const renderTheaterList = (theaterGroup) => {
        const theaterArr = [];
        theaterGroup.cumRapChieu
            .filter(theather => theather.maCumRap !== 'glx-nguyen-du\r\n')
            .forEach((theater) => {
                const showTimeList = renderShowTimeList(theater);
                if (showTimeList.length > 0) {
                    const theaterUpdate = {
                        key: theater.maCumRap,
                        label: (
                            <div className='p-0 w-40 lg:w-80 text-left overflow-hidden'>
                                <h6 className='text-yellow-500 font-bold'>{theater.tenCumRap.toUpperCase().replace('STAR CINEPLEX', '').replace('VINCOM', '')}</h6>
                                <p className='m-0 w-full text-white overflow-hidden'>
                                    {theater.diaChi.substring(0, 40)}
                                    {theater.diaChi.length > 40 ? '...' : ''}
                                </p>
                                <span className='text-green-500'>[Chi tiết]</span>
                            </div>
                        ),
                        children: <div
                            className='grid grid-cols-1 lg:grid-cols-4 gap-2'>{showTimeList}</div>,
                    };
                    theaterArr.push(theaterUpdate);
                }
            });
        return theaterArr;
    };

    let theaterGroupArr = [];
    if (theaterGroupList.length !== 0) {
        theaterGroupList.heThongRapChieu.forEach(theaterGroup => {
            let theaterArr = renderTheaterList(theaterGroup);
            const theatherGroupUpdate = {
                key: theaterGroup.maHeThongRap,
                label: <img className={'lg:w-20 w-12 p-0'} src={theaterGroup.logo} alt={theaterGroup.tenHeThongRap} />,
                children:
                    <Tabs
                        defaultActiveKey={1}
                        tabPosition={'left'}
                        items={theaterArr}
                        className='max-h-750'
                    />,
            }
            if (theaterArr.length !== 0) { theaterGroupArr.push(theatherGroupUpdate); }
        })
    }
    return (
        <div className='pt-32 pb-5 container text-center'>
            <h1 className={`mt-5 text-3xl font-bold ${theaterGroupArr.length === 0 ? 'block' : 'hidden'}`}
            >Chưa có Thời gian chiếu phim cụ thể.<br /> Vui lòng thử lại sau</h1>
            <div className='bg-slate-900'>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: 'rgb(250 204 21 / var(--tw-text-opacity))',
                        },
                    }}
                >
                    <Tabs
                        defaultActiveKey={1}
                        tabPosition={'top'}
                        items={theaterGroupArr}
                        className={`mt-10 lg:p-2 lg:mb-2 max-h-750 overflow-hidden ${theaterGroupArr.length !== 0 ? 'border' : ''}`} />
                </ConfigProvider>
            </div>
        </div >
    )
}
