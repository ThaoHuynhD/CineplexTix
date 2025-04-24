import { ConfigProvider, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getShowTimeByMovie } from '../../../api/api';
import { NavLink } from 'react-router-dom';
import { ERROR_MESSAGE, MONTHNAME } from '../../../constant/constant'
import NoData from '../../../component/NoData';

export default function ShowTimeListByMovie({ maPhim }) {
    let [theaterGroupList, setTheaterGroupList] = useState([]);

    let fetchDataMovieDetail = async (maPhim) => {
        try {
            let response = await getShowTimeByMovie(maPhim);
            setTheaterGroupList(response.data.content);
        } catch {
            message.error(ERROR_MESSAGE);
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
                            <div className="flex justify-center">
                                <p className='text-white'>{MONTHNAME[Math.round(show.ngayChieuGioChieu.substring(5, 7) - 1)]}
                                    <br />
                                    <span className='text-white text-2xl font-bold'>{show.ngayChieuGioChieu.substring(8, 10)}</span></p>
                                <p className='text-yellow-500 text-3xl justify-center pl-2 self-center'><b> {show.ngayChieuGioChieu.substring(14, 20)}</b></p>
                            </div>
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
            <div className='bg-slate-900'>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: 'rgb(250 204 21 / var(--tw-text-opacity))',
                        },
                    }}
                >
                    {theaterGroupArr.length === 0 ? <NoData /> :
                        <Tabs
                            defaultActiveKey={1}
                            tabPosition={'top'}
                            items={theaterGroupArr}
                            className={`mt-10 lg:p-2 lg:mb-2 max-h-750 overflow-hidden ${theaterGroupArr.length !== 0 ? 'border' : ''}`} />
                    }
                </ConfigProvider>
            </div>
        </div >
    )
}
