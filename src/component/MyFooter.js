import { FacebookFilled, LinkedinFilled, YoutubeFilled } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MyFooter() {
    return (
        <div className='mt-30 py-30 bg-slate-900 text-white'>
            <div className='footer__top container pl-10 lg:pl-0'>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-4 pb-5 mx-20'>
                    <div className=''>
                        <h1 className='pt-6 pb-4 lg:p-5 text-xl text-yellow-500 font-semibold'>Giới thiệu</h1>
                        <ul>
                            <li><NavLink to={'/*'}>Về Chúng Tôi</NavLink></li>
                            <li><NavLink to={'/*'}>Thỏa Thuận Sử Dụng</NavLink></li>
                            <li><NavLink to={'/*'}>Quy Chế Hoạt Động</NavLink></li>
                            <li><NavLink to={'/*'}>Chính Sách Bảo Mật</NavLink></li>
                        </ul>
                    </div>
                    <div className=''>
                        <h1 className='pt-6 pb-4 lg:p-5 text-xl text-yellow-500 font-semibold'>Góc Điện Ảnh</h1>
                        <ul>
                            <li><NavLink to={'/*'}>Thể Loại Phim</NavLink></li>
                            <li><NavLink to={'/*'}>Bình Luận Phim</NavLink></li>
                            <li><NavLink to={'/*'}>Blog Điện Ảnh</NavLink></li>
                            <li><NavLink to={'/*'}>Phim Hot</NavLink></li>
                        </ul>
                    </div>
                    <div className=''>
                        <h1 className='pt-6 pb-4 lg:p-5 text-xl text-yellow-500 font-semibold'>Hỗ Trợ</h1>
                        <ul>
                            <li><NavLink to={'/*'}>Góp Ý</NavLink></li>
                            <li><NavLink to={'/*'}>Tuyển Dụng</NavLink></li>
                            <li><NavLink to={'/*'}>FAQ</NavLink></li>
                        </ul>
                    </div>
                    <div className=''>
                        <h1 className='pt-6 pb-4 lg:p-5 text-xl text-yellow-500 font-semibold'>Liên Hệ</h1>
                        <ul className='flex gap-4'>
                            <li><NavLink to={'/*'} className='text-2xl'><FacebookFilled /></NavLink></li>
                            <li><NavLink to={'/*'} className='text-2xl'><YoutubeFilled /></NavLink></li>
                            <li><NavLink to={'/*'} className='text-2xl'><LinkedinFilled /></NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer__bottom border-top'>
                <p className='container lg:px-10 py-10 w-75'>
                    TIX – SẢN PHẨM CỦA CÔNG TY Z
                    Địa chỉ: fdsd Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
                    Giấy chứng nhận đăng ký kinh doanh số: ________,
                    đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố H cấp.
                    Số Điện Thoại (Hotline): 0123 456 789</p>
            </div>
        </div>
    )
}
