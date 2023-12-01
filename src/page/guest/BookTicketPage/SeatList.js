import React from 'react';
import Seat from './Seat';

export default function SeatList({ movieShowDetail, cart }) {
    if (!movieShowDetail || !movieShowDetail.danhSachGhe || !cart) {
        return <div>Loading...</div>;
    }
    else return (
        <div className='seatList relative'>
            <div className='top-1/2 pt-10'>
                <div className='text-center mb-5 lg:mb-0'><span className='px-4 py-3 lg:text-3xl text-2xl mx-auto bg-red-700 font-semibold text-white text-center rounded-lg'
                >Rạp Chiếu</span></div>
                <p className='screen screen_lg w-fulllg:h-12 h-2 lg:pt-3 
                border-b-orange-400 lg:border-50 border-20 
                border-t-0 border-t-transparent border-l-transparent border-r-transparent'></p>
                <div className='py-5'>
                    <div className="grid grid-cols-16 lg:gap-2 gap-1">
                        {movieShowDetail.danhSachGhe.map((seat, index) => (
                            <Seat
                                key={index}
                                seat={seat}
                                isChecked={cart.some(ticket => ticket.maGhe === seat.maGhe)}
                            />
                        ))}
                    </div>
                    <div className=' grid lg:grid-cols-4 grid-cols-2 text-left mx-auto my-5'>
                        <div>
                            <button
                                className={`w-10 my-1 px-0 lg:mx-1 text-center btn btn-dark`}
                                disabled={true}
                            >X</button> <span>Ghế Đã Đặt</span>
                        </div>
                        <div>
                            <button
                                className={`w-10 my-1 px-0 lg:mx-1 text-center btn btn-success`}
                            >00</button> <span>Ghế Đang Chọn</span>
                        </div>
                        <div>
                            <button
                                className={`w-10 my-1 px-0 lg:mx-1 text-center btn btn-warning`}
                            >00</button> <span>Ghế Hạng Vip</span>
                        </div>
                        <div>
                            <button
                                className={`w-10 my-1 px-0 lg:mx-1 text-center btn btn-light`}
                            >00</button> <span>Ghế Hạng Thường</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
