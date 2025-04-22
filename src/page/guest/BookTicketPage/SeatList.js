import React from 'react';
import Seat from './Seat';

export default function SeatList({ movieShowDetail, cart }) {
    const chairColor = [
        { type: 'reserved', color: '#4d584e', title: 'Ghế Đã Đặt' },
        { type: 'selected', color: '#2bdd49', title: 'Ghế Đang Chọn' },
        { type: 'vip', color: 'gold', title: 'Ghế Hạng Vip' },
        { type: 'regular', color: 'white', title: 'Ghế Hạng Thường' }
    ];

    return (
        <div className='seatList relative'>
            <div className="h-32">
                <div className="screen relative">
                    <div className="screenImg"></div>
                    <div className="screenLight"></div>
                </div>
            </div>
            <div className='lg:pb-5'>
                <div className="grid grid-cols-16 lg:gap-2 gap-1">
                    {movieShowDetail.danhSachGhe.map((seat, index) => (
                        <Seat
                            key={index}
                            seat={seat}
                            isChecked={cart.some(ticket => ticket.maGhe === seat.maGhe)}
                            chairColor={chairColor}
                        />
                    ))}
                </div>
                <div className='grid lg:grid-cols-4 grid-cols-2 text-left mx-auto my-5'>
                    {chairColor.map((chair, index) => <button key={index} disabled={true}
                        className={`h-10 chairbtn relative text-xs lg:text-lg pb-3.5 m-1 text-center px-0 border-none focus:outline-none`}
                    >
                        <svg viewBox="0 0 24 24" fill="none" className='absolute top-0 left-0 z-10 w-10'
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M17.1786 21H6.82143C6.07648 21 5.61013 21 5.25 20.958V21.2494V22.2499C5.25 22.6641 4.91421 22.9999 4.5 22.9999C4.08579 22.9999 3.75 22.6641 3.75 22.2499V20.3838C2.92435 19.8283 2.31864 18.9398 2.09402 17.8901C2 17.4507 2 16.9195 2 15.8571V11.2456C2 10.0054 2.94256 9 4.10526 9C5.26797 9 6.21053 10.0054 6.21053 11.2456V14.3333C6.21053 15.2761 6.21053 15.7475 6.50342 16.0404C6.79631 16.3333 7.26772 16.3333 8.21053 16.3333H15.7895C16.7323 16.3333 17.2037 16.3333 17.4966 16.0404C17.7895 15.7475 17.7895 15.2761 17.7895 14.3333V11.2456C17.7895 10.0054 18.732 9 19.8947 9C21.0574 9 22 10.0054 22 11.2456V15.8571C22 16.9195 22 17.4507 21.906 17.8901C21.6814 18.9398 21.0756 19.8283 20.25 20.3838V22.25C20.25 22.6642 19.9142 23 19.5 23C19.0858 23 18.75 22.6642 18.75 22.25V20.958C18.3899 21 17.9235 21 17.1786 21Z"
                                    fill={chair.color}></path>
                                <path d="M6 8.67187V8.15385C6 5.85325 6 4.70296 6.48231 3.84615C6.79827 3.28485 7.25273 2.81874 7.8 2.49468C8.63538 2 9.75692 2 12 2C14.2431 2 15.3646 2 16.2 2.49468C16.7473 2.81874 17.2017 3.28485 17.5177 3.84615C18 4.70296 18 5.85325 18 8.15383V8.67193C17.2539 9.27588 16.7895 10.2231 16.7895 11.2456V14.3333C16.7895 14.8047 16.7895 15.0404 16.6431 15.1869C16.4966 15.3333 16.2609 15.3333 15.7895 15.3333H8.21057C7.73916 15.3333 7.50346 15.3333 7.35701 15.1869C7.21057 15.0404 7.21057 14.8047 7.21057 14.3333V11.2456C7.21057 10.223 6.74612 9.27582 6 8.67187Z"
                                    fill={chair.color}></path>
                            </g>
                        </svg>
                        <p className='text-base py-2 ml-5 text-left'>{chair.title}</p>
                    </button>
                    )}
                </div>
            </div>
        </div>
    );
}
