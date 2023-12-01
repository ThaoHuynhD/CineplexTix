import React, { useEffect, useState } from 'react'
import { Button, Form, Select, message, Modal } from 'antd';
import { getMovieDetail, getMovieList } from '../../../api/api';
import ShowTimeListByMovie from '../../guest/MovieDetailPage/ShowTimeListByMovie';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import MovieInformation from './MovieInformation'
import AddShowTime from './AddShowTime';

export default function ShowTimeManagement({ selectedMaPhim }) {
    const [movieList, setMovieList] = useState([]);
    const [movieSelected, setMovieSelected] = useState(selectedMaPhim !== null ? selectedMaPhim : '13189');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    dayjs.extend(customParseFormat);


    const handleMovieSelection = (movieSelected) => {
        setMovieSelected(movieSelected);
    };

    const fetchDataMovieList = async () => {
        try {
            let response = await getMovieList();
            setMovieList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };

    const movieArr = [];
    movieList.forEach((movie) => {
        const movieUpdate = {
            value: movie.maPhim,
            label: `${movie.tenPhim} - ${movie.maPhim}`,
        }
        movieArr.push(movieUpdate);
    })

    const fetchDataMovieInfo = async (maPhim) => {
        try {
            let response = await getMovieDetail(maPhim);
            let movie = response.data.content;
            const parsedDate = dayjs(movie.ngayKhoiChieu);
            const formattedDate = dayjs(parsedDate.format('DD/MM/YYYY'), 'DD/MM/YYYY');

            let updatedMovie = {
                maPhim: movie.maPhim,
                tenPhim: movie.tenPhim,
                trailer: movie.trailer,
                moTa: movie.moTa,
                sapChieu: movie.sapChieu,
                dangChieu: movie.dangChieu,
                hot: movie.hot,
                danhGia: movie.danhGia,
                maNhom: movie.maNhom,
                ngayKhoiChieu: formattedDate,
            }
            form.setFieldsValue(updatedMovie);
        } catch (error) {
            message.error("Đã có lỗi xảy ra");
            console.log(error.response.data);
        }
    };
    const showModal = (maPhim) => {
        fetchDataMovieInfo(maPhim);
        setIsModalOpen(true);
    };

    const hiddenModal = () => { setIsModalOpen(false); };
    useEffect(() => {
        fetchDataMovieList();
    }, []);
    return (
        <div>
            <div className='grid grid-cols-2'>
                <div>
                    <Select
                        defaultValue="Chọn Phim Khác"
                        style={{
                            width: 250, margin: 20
                        }}
                        options={movieArr}
                        onChange={handleMovieSelection}
                    />
                    <MovieInformation maPhim={movieSelected} />
                </div>
                <div>
                    <ShowTimeListByMovie maPhim={movieSelected} />
                    <div className="text-center"><Button className='btn btn-red' onClick={() => { showModal(movieSelected) }}>Tạo Lịch Chiếu Mới</Button></div>
                </div>
            </div>
            <Modal title="Tạo Lịch Chiếu Mới" open={isModalOpen} onOk={showModal}
                onCancel={hiddenModal} width={900} footer={null}
            >
                <AddShowTime
                    form={form}
                    setIsModalOpen={setIsModalOpen}
                    movieSelected={movieSelected} />
            </Modal>
        </div>
    )
}