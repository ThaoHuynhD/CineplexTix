import React, { useEffect, useState } from 'react'
import { getMovieDetail, getMovieList, getMovieListSearchByName } from '../../../api/api';
import { getDataMovieDeleteIfNoShowTime, } from '../../../api/api';
import { message, Image, Modal, Form, } from 'antd';
import { FormOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import AddMovie from './AddMovie';
import FixMovie from './FixMovie';
import { ERROR_MESSAGE, SUCCESS_MESSAGE_DELETE_MOVIE } from '../../../constant/constant';

dayjs.extend(customParseFormat);

export default function MovieList({ setSelectedItem, setSelectedMaPhim }) {
    const [movieList, setMovieList] = useState([]);
    const [movieSearchList, setMovieSearchList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [isFixModalOpen, setIsFixModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchDataMovieList = async () => {
        try {
            let response = await getMovieList();
            setMovieList(response.data.content);
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };
    const fetchDataMovieSearch = async (searchValue) => {
        try {
            if (searchValue === undefined || searchValue === '' || searchValue === null) return;
            let response = await getMovieListSearchByName(searchValue);
            const updatedMovieSearchList = response.data.content;
            setMovieSearchList(updatedMovieSearchList);
            setIsSearch(true);
            message.success(`Có ${updatedMovieSearchList.length} kết quả tìm kiếm tương tự`)
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };
    const handleSearchCancel = () => { setIsSearch(false); };

    const handleMovieDel = async (maPhim) => {
        try {
            await getDataMovieDeleteIfNoShowTime(maPhim);
            message.success(SUCCESS_MESSAGE_DELETE_MOVIE);
            fetchDataMovieList();
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };

    const handleMoveToShowTime = (maPhim) => {
        setSelectedItem('showtime');
        setSelectedMaPhim(maPhim);
    }
    const renderList = () => {
        let list = isSearch ? movieSearchList : movieList;
        return (
            <table className='listMovie table text-center'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>MÃ PHIM</th>
                        <th>HÌNH ẢNH</th>
                        <th>TÊN PHIM</th>
                        <th>MÔ TẢ</th>
                        <th>NGÀY KHỞI CHIẾU</th>
                        <th>THAO TÁC</th>
                    </tr>
                </thead>
                <tbody>{list.map((movie, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{movie.maPhim}</td>
                            <td><Image width={50} height={80} src={movie.hinhAnh} alt='' /></td>
                            <td>{movie.tenPhim}</td>
                            <td>{movie.moTa.substring(0, 30)}{movie.moTa.length > 30 ? '...' : ''}</td>
                            <td>{movie.ngayKhoiChieu.substring(0, 10)}</td>
                            <td>
                                <button className='btn btn-warning' onClick={() => { showFixModal(movie.maPhim) }}><FormOutlined /></button>
                                <button className='btn btn-danger mx-1 ' onClick={() => { handleMovieDel(movie.maPhim) }}><DeleteOutlined /></button>
                                <button className='btn btn-success' onClick={() => { handleMoveToShowTime(movie.maPhim) }}><CalendarOutlined /></button>
                            </td>
                        </tr>
                    )
                })
                }</tbody>
            </table>
        )

    }
    useEffect(() => {
        fetchDataMovieList();
        fetchDataMovieSearch();
    }, []);

    const [form] = Form.useForm();
    const [selectedImage, setSelectedImage] = useState(null);

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
            setSelectedImage(movie.hinhAnh);
            form.setFieldsValue(updatedMovie);
        } catch (error) {
            message.error(ERROR_MESSAGE);
            console.log(error.response.data);
        }
    };

    const showFixModal = async (maPhim) => {
        try {
            await fetchDataMovieInfo(maPhim);
            setIsFixModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const hiddenFixModal = () => { setIsFixModalOpen(false); };

    const showAddModal = () => {
        form.resetFields();
        setIsAddModalOpen(true);
    };
    const hiddenAddModal = () => { setIsAddModalOpen(false); };
    return (
        <div>
            <div className='ModalFixMovie'>
                <Modal title="Cập nhật Phim" open={isFixModalOpen} onOk={showFixModal}
                    onCancel={hiddenFixModal} width={900} footer={null}
                >
                    <FixMovie setIsFixModalOpen={setIsFixModalOpen}
                        setSelectedImage={setSelectedImage}
                        selectedImage={selectedImage}
                        form={form}
                        dayjs={dayjs}
                    />
                </Modal>
            </div>
            <div className='ModalAddMovie'>
                <Modal title="Thêm Phim Mới" open={isAddModalOpen} onOk={showAddModal}
                    onCancel={hiddenAddModal} width={900} footer={null}
                >
                    <AddMovie setIsAddModalOpen={setIsAddModalOpen}
                        form={form}
                        dayjs={dayjs} />
                </Modal>
            </div>
            <div className="m-3">
                <div className="text-right mb-2"><button className='btn btn-success' onClick={() => { showAddModal() }}>Thêm Phim Mới</button></div>
                <div className="flex searchMovie">
                    <Search
                        enterButton size="large" onSearch={fetchDataMovieSearch}
                        placeholder="input search text(phone number/name)"
                        className='bg-blue-500 overflow-hidden rounded-lg'
                    />
                    <button className={`btn btn-danger ${isSearch ? 'block' : 'hidden'}`}
                        onClick={() => { handleSearchCancel() }}>CancleSearch</button>
                </div>
            </div>
            {renderList()}
        </div >
    )
}
