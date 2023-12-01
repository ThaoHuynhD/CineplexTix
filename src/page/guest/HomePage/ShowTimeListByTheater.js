import React, { useEffect, useState } from 'react'
import { ConfigProvider, Tabs, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { getShowTimeByTheaterGroup } from '../../../api/api';

export default function ShowTimeListByTheater() {

    let [theaterGroupList, setTheaterGroupList] = useState([]);
    let fetchDataTheaterList = async () => {
        try {
            let response = await getShowTimeByTheaterGroup();
            setTheaterGroupList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => { fetchDataTheaterList(); }, []);
    function handleButtonClick() {
        window.scrollTo(0, 0);
    }
    const renderMovieShowTime = (movie) => {
        return movie.lstLichChieuTheoPhim.splice(0, 12).map((show, index) => {
            return (
                <div key={index}>
                    <NavLink to={`/purchasing/:${show.maLichChieu}`}>
                        <button className='btn btn-dark lg:px-auto px-2 w-full'>
                            <span className='text-white'>{show.ngayChieuGioChieu.substring(0, 10)}</span> -
                            <span className=' text-yellow-300'><b> {show.ngayChieuGioChieu.substring(14, 20)}</b></span>
                        </button>
                    </NavLink>
                </div>
            )
        })
    }

    const renderMovieList = (theater) => {
        return theater.danhSachPhim.map((movie) => {
            if (movie.lstLichChieuTheoPhim.length !== 0) {
                return (
                    <div key={movie.maPhim} className='flex flex-col lg:flex-row lg:ml-3 py-2 border-bottom'>
                        <div className='md:flex-none text-center my-auto'>
                            <img className='mx-auto w-32 h-40' src={movie.hinhAnh} alt='' />
                            <NavLink to={`/detail/:${movie.maPhim}`}>
                                <button type="button" className="btn btn-red my-3 px-auto"
                                    onClick={handleButtonClick}
                                >Chi Tiết Phim</button>
                            </NavLink>
                        </div>
                        <div className='flex-auto mx-auto pl-2'>
                            <h5 className="p-2 m-0 text-warning lg:text-2xl text-lg text-center font-bold">{movie.tenPhim.toUpperCase()}<span className='text-dark d-none'> ({movie.maPhim})</span></h5>
                            <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-2 grid-cols-1">{renderMovieShowTime(movie)}</div>
                        </div>
                    </div>
                )
            }
            else return null;
        }
        )
    }

    const renderTheaterList = (theaterGroup) => {
        const theaterArr = theaterGroup.lstCumRap
            .filter(theater => theater.maCumRap !== 'glx-nguyen-du\r\n')
            .map((theater) => {
                let isEmpty = true;
                theater.danhSachPhim.forEach((movie) => {
                    if (movie.lstLichChieuTheoPhim.length !== 0) {
                        isEmpty = false;
                    }
                })
                if (!isEmpty) {
                    return {
                        key: theater.maCumRap,
                        label: (
                            <div className='text-left p-0 w-40 lg:w-80'>
                                <h6 className='text-yellow-500 font-bold'>{theater.tenCumRap.toUpperCase().replace(" STAR CINEPLEX", "").replace("VINCOM", "")}</h6>
                                <p className='m-0 text-white w-full overflow-hidden'>
                                    {theater.diaChi.substring(0, 40)}
                                    {theater.diaChi.length > 40 ? '...' : ''}</p>
                                <span className='text-green-500'>[Chi tiết]</span>
                            </div>
                        ),
                        children: (
                            <div className='h-750 max-h-750 overflow-scroll'>
                                {renderMovieList(theater)}
                            </div>
                        ),
                    };
                }
                else return null;
            });
        return theaterArr;
    };

    const theaterGroupListArr = [];
    theaterGroupList.forEach(theaterGroup => {
        const theaterUpdate = {
            key: theaterGroup.maHeThongRap,
            label: <img className={'lg:w-20 w-10 p-0'} src={theaterGroup.logo} alt='' />,
            children:
                <Tabs
                    defaultActiveKey={1}
                    tabPosition={'left'}
                    items={renderTheaterList(theaterGroup)}
                    className='max-h-750'
                    destroyInactiveTabPane={true}
                />,
        }
        theaterGroupListArr.push(theaterUpdate);
    })

    return (
        <div className='container pt-32 pb-5'>
            <div className='text-center'><span className='px-4 py-3 lg:text-3xl text-2xl my-2 mx-auto bg-red-700 font-semibold text-white text-center rounded-lg'
            >Rạp và Lịch Chiếu Phim</span></div>
            <div className='bg-slate-900'>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: 'rgb(250 204 21 / var(--tw-text-opacity))',
                            lineWidth: 2,
                        },
                        components: {
                            Tabs: {
                                verticalItemPadding: 5,
                                verticalItemMargin: '0 5px 0 0',
                            },
                        }
                    }}
                >
                    <Tabs
                        defaultActiveKey={1}
                        tabPosition={'top'}
                        items={theaterGroupListArr}
                        className={`mt-10 pt-2 p-2 lg:mb-2 h-850 max-h-850 overflow-hidden ${theaterGroupListArr.length !== 0 ? 'border' : ''}`}
                    />
                </ConfigProvider>

            </div>
        </div>
    )
}


