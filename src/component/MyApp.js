import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MyApp() {
    return (
        <div id='myApps' className='bg-red-700 text-white py-10'>
            <div className="container">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='lg:px-20 text-center'>
                        <h1 className='lg:pt-10 text-3xl font-bold'>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
                        <p className='py-3 lg:py-5'>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <button className='btn btn-red mb-3 lg:mb-5 w-full'>Tải App Ngay</button>
                        <span>TIX có hai phiên bản
                            <NavLink className={'text-yellow-500 font-semibold'} to={'/*'}> IOS </NavLink> &
                            <NavLink className={'text-yellow-500 font-semibold'} to={'/*'}> Android </NavLink>
                        </span>
                    </div>
                    <div className='lg:pl-10 mx-auto'>
                        <img className='rounded-lg' src='https://i.pinimg.com/564x/a0/c9/42/a0c942b7d6a186afe8744bb4fee44057.jpg' alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}
