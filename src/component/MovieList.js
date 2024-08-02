import React, { useEffect, useState } from 'react'
import { getMovieList } from '../api/api';
import { Modal, message } from 'antd';
import { NavLink } from 'react-router-dom';

export default function MovieList() {
    const [movieList, setMovieList] = useState([]);
    let fetchData = async () => {
        try {
            let response = await getMovieList();
            setMovieList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeMovie, setActiveMovie] = useState([]);
    const showModal = (movie) => {
        setIsModalVisible(true);
        setActiveMovie(movie);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    function handleButtonClick() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <div className='MovieList container pt-32 text-center'>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 mt-5">
                {movieList.map((movie, index) => {
                    return (
                        <div className="movie_item relative text-center h-full w-full rounded-lg overflow-hidden" key={index}>
                            <img className='h-72 lg:h-96 w-full m-auto' src={movie.hinhAnh} alt="" />
                            <div className="movie_info absolute bottom-0 left-0 text-center w-full h-full">
                                <div className='z-0 h-full w-full px-2 relative after:block after:absolute after:top-0 after:left-0 
                                        after:z-10 after:h-full after:w-full after:bg-black after:opacity-50 '>
                                </div>
                                <div className="absolute top-1/2 -translate-y-1/4 left-0 w-full h-full z-20">
                                    <button onClick={() => { showModal(movie) }}
                                        type="button" className="btn btn-red m-3 w-5/6"
                                    >Xem Trailer</button>
                                    <NavLink to={`/detail/:${movie.maPhim}`}>
                                        <button onClick={handleButtonClick}
                                            type="button" className="btn btn-red m-3 w-5/6"
                                        >Mua Vé</button>
                                    </NavLink>
                                </div>

                            </div>
                            <Modal
                                title={activeMovie.tenPhim}
                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={null}
                                width={800}
                            >
                                <iframe
                                    title={activeMovie.tenPhim}
                                    className='w-full h-96'
                                    src={activeMovie.trailer}
                                    frameborder="0"
                                    allowfullscreen
                                ></iframe>
                            </Modal>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
