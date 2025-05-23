import React, { useEffect, useState } from 'react'
import { ConfigProvider, Tabs, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getShowTimeByTheaterGroup } from '../api/api';
import { ERROR_MESSAGE, MONTHNAME } from '../constant/constant';

export default function ShowTimeListByTheater() {
    const navigate = useNavigate();
    const [theaterGroupList, setTheaterGroupList] = useState([]);

    const fetchDataTheaterList = async () => {
        try {
            const response = await getShowTimeByTheaterGroup();
            setTheaterGroupList(response.data.content);
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };

    const handleButtonClick = (link) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(link);
    };

    const renderMovieShowTime = (movie) => {
        return movie.lstLichChieuTheoPhim.slice(0, 12).map((show, index) => (
            <div key={index}>
                <button
                    className="btn btn-dark lg:px-auto px-2 w-full"
                    onClick={() => handleButtonClick(`/purchasing/:${show.maLichChieu}`)}
                >
                    <div className="flex justify-center">
                        <p className="text-white w-24">
                            {MONTHNAME[+show.ngayChieuGioChieu.substring(5, 7) - 1]}
                            <br />
                            <span className="text-white text-2xl font-bold">
                                {show.ngayChieuGioChieu.substring(8, 10)}
                            </span>
                        </p>
                        <p className="text-yellow-500 text-3xl justify-center pl-2 self-center">
                            <b>{show.ngayChieuGioChieu.substring(14, 20)}</b>
                        </p>
                    </div>
                </button>
            </div>
        ));
    };

    const renderMovieList = (theater) => {
        return theater.danhSachPhim.map((movie) => {
            if (movie.lstLichChieuTheoPhim.length === 0) return null;

            return (
                <div key={movie.maPhim} className="flex flex-col lg:flex-row lg:ml-3 py-2 border-bottom">
                    <div className="md:flex-none text-center my-auto mr-3">
                        <img className="mx-auto w-32 h-40" src={movie.hinhAnh} alt="" />
                        <button
                            type="button"
                            className="btn btn-red my-3 px-auto"
                            onClick={() => handleButtonClick(`/detail/:${movie.maPhim}`)}
                        >
                            Chi Tiết Phim
                        </button>
                    </div>
                    <div className="flex-auto mx-auto pl-2 pr-3">
                        <h5 className="p-2 m-0 text-warning lg:text-2xl text-lg text-center font-bold">
                            {movie.tenPhim.toUpperCase()}
                            <span className="text-dark d-none"> ({movie.maPhim})</span>
                        </h5>
                        <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 grid-cols-1">
                            {renderMovieShowTime(movie)}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderTheaterList = (theaterGroup) => {
        return theaterGroup.lstCumRap
            .filter((theater) => theater.maCumRap.trim() !== 'glx-nguyen-du')
            .map((theater) => {
                const hasShowtimes = theater.danhSachPhim.some(
                    (movie) => movie.lstLichChieuTheoPhim.length > 0
                );

                if (!hasShowtimes) return null;

                return {
                    key: theater.maCumRap,
                    label: (
                        <div className="text-left p-0 w-40 lg:w-80">
                            <h6 className="text-yellow-500 font-bold">
                                {theater.tenCumRap.toUpperCase().replace(" STAR CINEPLEX", "").replace("VINCOM", "")}
                            </h6>
                            <p className="m-0 text-white w-full overflow-hidden">
                                {theater.diaChi.length > 40
                                    ? `${theater.diaChi.substring(0, 40)}...`
                                    : theater.diaChi}
                            </p>
                            <span className="text-green-500">[Chi tiết]</span>
                        </div>
                    ),
                    children: (
                        <div className="h-750 max-h-750 overflow-scroll">
                            {renderMovieList(theater)}
                        </div>
                    ),
                };
            })
            .filter(Boolean);
    };

    const theaterGroupListArr = theaterGroupList.map((theaterGroup) => ({
        key: theaterGroup.maHeThongRap,
        label: <img className="lg:w-20 w-10 p-0" src={theaterGroup.logo} alt="" />,
        children: (
            <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                items={renderTheaterList(theaterGroup)}
                className="max-h-750"
                destroyInactiveTabPane
            />
        ),
    }));

    useEffect(() => { fetchDataTheaterList(); }, []);

    return (
        <section className='container'>
            <div className='bg-slate-900 xxl:mx-20'>
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
        </section>
    )
}


