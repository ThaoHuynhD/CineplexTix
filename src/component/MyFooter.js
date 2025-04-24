import { FacebookFilled, LinkedinFilled, YoutubeFilled } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MyFooter() {
    let dataFooter = [
        {
            title: "Giới thiệu",
            list: [
                { link: '/', text: 'Thể Loại Phim' },
                { link: '/', text: 'Thỏa Thuận Sử Dụng' },
                { link: '/', text: 'Quy Chế Hoạt Động' },
                { link: '/', text: 'Chính Sách Bảo Mật' },
            ]
        },
        {
            title: "Góc Điện Ảnh",
            list: [
                { link: '/', text: 'Về Chúng Tôi' },
                { link: '/', text: 'Bình Luận Phim' },
                { link: '/', text: 'Blog Điện Ảnh' },
                { link: '/', text: 'Phim Hot' },
            ]
        },
        {
            title: "Hỗ Trợ",
            list: [
                { link: '/*', text: 'Góp Ý' },
                { link: '/*', text: 'Tuyển Dụng' },
                { link: '/*', text: 'FAQ' },
            ]
        },
        {
            title: "Liên Hệ",
            list: [
                { link: `https://www.facebook.com/`, text: <FacebookFilled /> },
                { link: 'https://www.youtube.com/', text: <YoutubeFilled /> },
                { link: 'https://www.linkedin.com/', text: <LinkedinFilled /> },
            ]
        },

    ];
    return (
        <div className='mt-30 py-30 bg-slate-900 text-white'>
            <div className='footer__top container pl-10 lg:pl-0'>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-4 pb-5 mx-20'>
                    {dataFooter.map((item) => {
                        return <div className=''>
                            <h1 className='pt-6 pb-4 text-xl text-yellow-500 font-semibold'>{item.title}</h1>
                            <ul className={item.title === "Liên Hệ" ? 'flex gap-4' : ''}>
                                {item.list.map((item1) => {
                                    return <li><NavLink className={`btn-yellow leading-[2.5] ${item.title === "Liên Hệ" ? 'text-2xl' : ''}`} to={item1.link}>{item1.text}</NavLink></li>
                                })}
                            </ul>
                        </div>
                    })}
                </div>
            </div>
            <div className='footer__bottom border-top'>
                <p className='container lg:px-10 py-10 w-75'>
                    TIX – SẢN PHẨM CỦA CÔNG TY Z
                    <br />
                    Địa chỉ: fdsd Đường số 13 (F), Phường Tân Thuận Đông (F), Quận 7, Tp. Hồ Chí Minh, Việt Nam.
                    <br />
                    Giấy chứng nhận đăng ký kinh doanh số: ________,
                    đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố H cấp.
                    <br />
                    Số Điện Thoại (Hotline): 0123 456 789</p>
            </div>
        </div>
    )
}
