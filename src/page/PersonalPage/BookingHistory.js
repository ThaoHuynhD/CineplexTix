import React from 'react'
import Loader from '../../component/Loader';

export default function BookingHistory({ userDetail }) {
    let thongTinDatVe = userDetail.thongTinDatVe;
    if (!thongTinDatVe || !userDetail) {
        return <Loader />;
    }
    const renderDanhSachGheDaDat = (danhSachGhe) => {
        let chairArr = [];
        let tenHeThongRap = '';
        let tenRap = '';
        danhSachGhe.forEach(ghe => {
            chairArr.push(ghe.tenGhe);
            tenHeThongRap = ghe.tenHeThongRap;
            tenRap = ghe.tenRap;
        })
        return (
            <tbody>
                <tr>
                    <th>Tên Hệ Thống Rạp: </th>
                    <td>{tenHeThongRap}</td>
                </tr>
                <tr>
                    <th>Tên Rap: </th>
                    <td>{tenRap}</td>
                </tr>
                <tr>
                    <th>Danh Sách Ghế: </th>
                    <td>{chairArr.map((seat, index) => <span key={index}>{seat}{index !== chairArr.length - 1 ? ', ' : ''}</span>)}</td>
                </tr>
            </tbody>
        )
    }
    const renderDanhSachDatVe = () => {
        return thongTinDatVe.map((ticketBill, index) => {
            return (
                <div className='p-2.5' key={index}>
                    <table className='table m-0 border bg-slate-800 text-white rounded-xl overflow-hidden '>
                        <tbody>
                            <tr>
                                <th>Ngày Đặt: </th>
                                <td>
                                    <span className='text-success'>{ticketBill.ngayDat.substring(0, 10)} - {ticketBill.ngayDat.substring(14, 20)}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Tên Phim: </th>
                                <td><span className="text-yellow-500 font-bold"> {ticketBill.tenPhim}</span></td>
                            </tr>
                            <tr>
                                <th>Thời Lượng Phim: </th>
                                <td><span>{ticketBill.thoiLuongPhim} Phút</span></td>
                            </tr>
                        </tbody>
                        {renderDanhSachGheDaDat(ticketBill.danhSachGhe)}
                    </table>
                </div>)
        })
    }


    return (
        <div className=''>
            <div className="text-center">
                <span className='lg:px-5 px-2 py-2 text-3xl my-5 mx-auto font-semibold bg-red-700 text-white text-center rounded-lg'
                >Danh Sách Vé Đã Đặt</span>
            </div>
            <div className='mt-3'>
                <div className="grid lg:grid-cols-2 grid-cols-1">{renderDanhSachDatVe()}</div>
            </div>
        </div>
    )
}
