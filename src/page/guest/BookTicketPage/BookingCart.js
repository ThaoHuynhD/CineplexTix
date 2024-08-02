import React from 'react'
import { getTicketBooked } from '../../../api/api';
import { PUCHASING_CART } from '../../../constant/constant';
import { Image, message } from 'antd';
import { useDispatch } from 'react-redux';

export default function BookingCart({ movieShowDetail, cart }) {
    let dispatch = useDispatch();

    if (!movieShowDetail || !movieShowDetail.danhSachGhe || !cart) {
        return <div className='w-screen h-screen z-50'><div className='text-5xl bg-red-600 h-500 pt-80'>Loading...</div></div>;
    }
    const renderTicketCart = () => {
        let normalTicketList = [];
        let vipTicketList = [];
        cart.forEach(seat => {
            if (seat.loaiGhe === 'Thuong') {
                normalTicketList.push(seat);
            } else { vipTicketList.push(seat); }
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
    let cartDetail = [
        { title: 'Tên cụm rạp', value: tenCumRap },
        { title: 'Địa Chỉ', value: diaChi },
        { title: 'Thời Gian Chiếu', value: ngayChieu + ' - ' + gioChieu },
        { title: 'Tên Phim', value: tenPhim },
        { title: 'Hình Ảnh', value: <Image width={150} src={hinhAnh} alt=''></Image> }
    ];
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
        <div className='container'>
            <table className='table text-white border'>
                <tbody>
                    {cartDetail.map((item, index) => <tr key={index}>
                        <td className='w-40'><b className='text-yellow-400'>{item.title}:</b></td>
                        <td>{item.value}</td>
                    </tr>
                    )}
                    <tr>
                        <td colSpan={2} className='p-0 m-0'>{cart.length !== 0 ?
                            <table className='table text-white border-none m-0'>
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
                </tbody>
            </table>
            <button className='btn btn-red w-full text-lg' onClick={() => handleShoppingCart(shoppingValue)}>Buy Ticket</button>
        </div>
    )
}
