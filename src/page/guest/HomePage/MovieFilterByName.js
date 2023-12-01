import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import { getShowTimeByTheaterGroup } from '../../../api/api';
import { NavLink } from 'react-router-dom';

export default function MovieFilterByName() {
    const [theaterGroupList, setTheaterGroupList] = useState([]);
    const [theaterSelected, setTheaterSelected] = useState(null);
    const [movieSelected, setMovieSelected] = useState(null);
    const [showSelected, setShowSelected] = useState(null);

    const movieNameArr = [];
    const movieTheaterArr = [];
    const movieShowTimeArr = [];
    //gán giá trị cho các state
    const handleMovieSelection = (movieSelected) => {
        setMovieSelected(movieSelected);
        setTheaterSelected(null);
        setShowSelected(null);
    };
    const handleTheaterSelection = (theaterSelected) => {
        setTheaterSelected(theaterSelected);
        setShowSelected(null);
    };
    const handleShowSelection = (showSelected) => {
        setShowSelected(showSelected);
    };

    // lấy danh sách rạp bằng axios
    let fetchDataTheaterList = async () => {
        try {
            let response = await getShowTimeByTheaterGroup();
            setTheaterGroupList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => { fetchDataTheaterList(); }, []);

    // Cập nhật các danh sách

    theaterGroupList.forEach(theaterGroup => {
        theaterGroup.lstCumRap
            .filter(theater => theater.maCumRap !== 'glx-nguyen-du\r\n')
            .forEach(theater => {
                theater.danhSachPhim.forEach((movie) => {
                    // Thêm danh sách phim
                    const movieUpdate = {
                        value: movie.maPhim,
                        label: `${movie.tenPhim}`,
                    }
                    if (!movieNameArr.some((existingMovie) => existingMovie.value === movieUpdate.value)) {
                        movieNameArr.push(movieUpdate);
                    }
                    // Thêm danh sách rạp chiếu
                    if (movie.maPhim === movieSelected) {
                        const theaterUpdate = {
                            value: theater.maCumRap,
                            label: theater.tenCumRap,
                        }
                        movieTheaterArr.push(theaterUpdate);

                        // Thêm danh sách lịch chiếu
                        movie.lstLichChieuTheoPhim.forEach(show => {
                            if (theater.maCumRap === theaterSelected) {
                                const showUpdate = {
                                    value: show.maLichChieu,
                                    label: `${show.ngayChieuGioChieu.substring(0, 10)} - ${show.ngayChieuGioChieu.substring(14, 20)}`,
                                }
                                movieShowTimeArr.push(showUpdate);
                            }
                        })
                    }
                });
            })
    })
    return (
        <div className='pt-20'>
            <div className=" relative">
                <p className=' absolute -top-6 left-0 text-center w-full'>
                    <span className='px-5 py-3 lg:text-3xl text-2xl mx-auto font-semibold bg-red-700 text-white rounded-lg'
                    >Tìm kiếm lịch chiếu</span>
                </p>
                <div className="container mt-20 pt-12 pb-4 px-8 bg-slate-800 text-center rounded">
                    <div className='grid lg:grid-cols-4 grid-cols-1 gap-8'>
                        <Select
                            defaultValue="Chọn Phim"
                            className='w-full'
                            options={movieNameArr}
                            onChange={handleMovieSelection}
                        />
                        <Select
                            className='w-full'
                            options={movieTheaterArr}
                            onChange={handleTheaterSelection}
                            disabled={movieSelected === null}
                            value={{ label: theaterSelected === null ? "Chọn Rạp Phim" : theaterSelected.tenCumRap, value: theaterSelected }}
                        />
                        <Select
                            className='w-full'
                            options={movieShowTimeArr}
                            onChange={handleShowSelection}
                            disabled={theaterSelected === null}
                            value={{ label: showSelected === null ? "Chọn Suất Chiếu" : showSelected.ngayChieuGioChieu, value: showSelected }}
                        />
                        <NavLink to={`/purchasing/:${showSelected}`}>
                            <button
                                className='btn btn-red w-full'
                                disabled={showSelected === null}
                            >Mua Vé</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
