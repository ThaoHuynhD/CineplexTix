import React from 'react'
import { getTicketBooked } from '../../../api/api';
import { PUCHASING_CART } from '../../../constant/constant';
import { Image, message } from 'antd';
import { useDispatch } from 'react-redux';

export default function BookingCart({ movieShowDetail, cart }) {
    let dispatch = useDispatch();

    if (!movieShowDetail || !movieShowDetail.danhSachGhe || !cart) {
        return <div>Loading...</div>;
    }
    const renderTicketCart = () => {
        let normalTicketList = [];
        let vipTicketList = [];
        cart.forEach(seat => {
            if (seat.loaiGhe === 'Thuong') {
                normalTicketList.push(seat);
            } else {
                vipTicketList.push(seat);
            }
        });
        return (
            <tbody>{normalTicketList.length !== 0 ?
                <tr>
                    <td>{normalTicketList.map((seat, index) => (<span key={index}>{seat.tenGhe}{index !== normalTicketList.length - 1 ? ', ' : ''}</span>))}</td>
                    <td>Phổ Thông</td>
                    <td>{normalTicketList.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()}</td>
                </tr>
                : null}
                {vipTicketList.length !== 0 ?
                    <tr>
                        <td>{vipTicketList.map((seat, index) => (<span key={index}>{seat.tenGhe}{index !== vipTicketList.length - 1 ? ', ' : ''}</span>))}</td>
                        <td>Vip</td>
                        <td>{vipTicketList.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()}</td>
                    </tr>
                    : null}

            </tbody>
        )
    }
    const fetchData = async (values) => {
        try {
            const response = await getTicketBooked(values);
            console.log("response: ", response);
            dispatch({
                type: PUCHASING_CART,
            });
            message.success("Mua vé thành công");
            setTimeout(() => {
                window.location.href = '/personal';
            }, 1000);
        } catch (error) {
            message.error("Mua vé thất bại");
            console.log(error);
        }
    };
    let handleShoppingCart = (values) => {
        fetchData(values);
    }

    let { diaChi, maLichChieu, gioChieu, hinhAnh, ngayChieu, tenCumRap, tenPhim } = movieShowDetail.thongTinPhim;
    let danhSachVeUpdate = [];
    cart.forEach(ticket => {
        let newTicket = {
            maGhe: ticket.maGhe,
            giaVe: ticket.giaVe,
        }
        danhSachVeUpdate.push(newTicket);
    })
    let shoppingValue = {
        maLichChieu: maLichChieu,
        danhSachVe: danhSachVeUpdate,
    }

    return (
        <div className='container lg:pt-20'>
            <table className='table text-white border'>
                <thead>
                    <tr className='text-center text-yellow-400'>
                        <th className='w-28'>Title</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='w-28'><b className='text-yellow-400'>Tên cụm rạp:</b></td>
                        <td>{tenCumRap}</td>
                    </tr>
                    <tr>
                        <td className='w-28'><b className='text-yellow-400'>Địa Chỉ:</b></td>
                        <td>{diaChi}</td>
                    </tr>
                    <tr>
                        <td className='w-28'><b className='text-yellow-400'>Thời Gian Chiếu:</b></td>
                        <td>{ngayChieu} - {gioChieu}</td>
                    </tr>
                    <tr>
                        <td className='w-28'><b className='text-yellow-400'>Tên Phim:</b></td>
                        <td>{tenPhim}</td>
                    </tr>
                    <tr>
                        <td className='w-28'><b className='text-yellow-400'>Hình Ảnh:</b></td>
                        <td className=''><Image width={150} src={hinhAnh} alt=''></Image></td>
                    </tr>

                    <tr>
                        <td colSpan={2} className='p-0'>{cart.length !== 0 ? <table className='table text-white border-none mt-3'>
                            <thead>
                                <tr>
                                    <td colSpan={3}><b className='text-yellow-400'>Chi Tiết Vé Chọn:</b></td>
                                </tr>
                                <tr>
                                    <th>Danh sách vé:</th>
                                    <th>Hạng vé:</th>
                                    <th>Thành tiền:</th>
                                </tr>
                            </thead>
                            {renderTicketCart()}
                        </table> : null}
                        </td>
                    </tr>
                    <tr>
                        <td><b className='text-yellow-400'>Tổng tiền:</b></td>
                        <td className='text-yellow-500 font-bold text-3xl text-center'>
                            {cart.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()} VND
                        </td>
                    </tr>
                    <tr><td colSpan={2} className='text-center'><button className='btn btn-red mt-3 w-full' onClick={() => handleShoppingCart(shoppingValue)}>Buy Ticket</button></td></tr>
                </tbody>
            </table>
        </div>
    )
}
