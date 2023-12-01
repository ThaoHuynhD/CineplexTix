import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/api';
import { userDetailLocalStorage, userLocalStorage } from '../../api/localServices';
import PersonalDetail from './PersonalDetail';
import BookingHistory from './BookingHistory';
import { message } from 'antd';

export default function PersonalPage() {
    let info = userLocalStorage.get();
    if (info === null) {
        message.error("Vui Lòng Đăng Nhập Để Sử dụng tính năng này");
        setTimeout(() => {
            window.location.href = '/sign-in';
        }, 1000);
    }
    const [userDetail, setUserDetail] = useState([]);
    useEffect(() => {
        const fetchDataUserDetail = async () => {
            try {
                const response = await getUserInfo();
                userDetailLocalStorage.set(response.data.content)
                setUserDetail(userDetailLocalStorage.get());
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataUserDetail();
    }, []);

    return (
        <div className='container'>
            <PersonalDetail userDetail={userDetail} />
            <BookingHistory userDetail={userDetail} />
        </div>
    );
};
