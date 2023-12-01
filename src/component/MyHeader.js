import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { userDetailLocalStorage, userLocalStorage } from '../api/localServices';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

export default function MyHeader() {
    let navigate = useNavigate();
    let info = userLocalStorage.get();
    let isAdmin;
    if (info !== null && info !== undefined) { isAdmin = info.maLoaiNguoiDung === 'QuanTri'; }
    let mobile;
    if (window.innerWidth < 768) { mobile = true; } else { mobile = false; }
    const [current, setCurrent] = useState('/');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(mobile);
    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobileWidth(true);
            } else {
                setIsMobileWidth(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuLeftArr = [
        {
            label: (
                <div className='lg:w-16 w-10 rounded-full overflow-hidden'>
                    <img className='lg:w-24 w-14'
                        src='https://i.pinimg.com/564x/d0/d7/b0/d0d7b047ddef0af6057424fcaf1f19ce.jpg' alt='logo' />
                </div>
            ),
            key: 'movieBanner',
            showMenu: true,
        },
        { label: 'Lịch Chiếu', key: 'schedule', },
        { label: 'Cụm Rạp', key: 'groupcinema', },
        { label: 'Tin Tức', key: 'myNews', },
        { label: 'Ứng Dụng', key: 'myApps', },

    ];
    const menuRightArr = [
        {
            label: info !== null ? (showMobileMenu ? 'Trang Cá Nhân' : info.taiKhoan) : 'Đăng Nhập',
            key: info !== null ? 'personal' : 'sign-in',
            flexRight: true,
            showMenu: true,
        },
        {
            label: info !== null ? 'Đăng Xuất' : 'Đăng Ký',
            key: info !== null ? 'sign-out' : 'sign-up',
            showMenu: true,
        },
        {
            label: showMobileMenu ? <CloseOutlined /> :
                (<button className={`mx-auto ${isMobileWidth ? 'block' : 'hidden'}`}>
                    <MenuOutlined />
                </button>),
            key: 'menuBar',
            showMenu: true,
        },
    ];

    const menuUserArr = [...menuLeftArr, ...menuRightArr];
    const menuAdminArr = [...menuRightArr];
    let handleSignOut = () => {
        userLocalStorage.remove();
        userDetailLocalStorage.remove();
        window.location.reload();
        window.location.href = "/";
    };
    const scrollIntoView = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    function scrollToTop() {
        window.scrollTo(0, 0);
    }
    const handleMenuItemClick = (key) => {
        setCurrent(key);
        if (key === 'menuBar') {
            toggleMobileMenu();
        }
        else {
            if (key === 'sign-in' || key === 'sign-up') {
                navigate(`/${key}`);
                scrollToTop();
            }
            else if (key === 'personal') {
                if (isAdmin) return;
                else navigate(`/${key}`);
            }
            else if (key === 'sign-out') {
                handleSignOut();
                navigate('/');
            }
            else {
                navigate('/');
                setTimeout(() => {
                    scrollIntoView(key);
                }, 200);
            }
            setShowMobileMenu(false);
        }
    };

    return <>
        {(isAdmin) ? (
            <Menu theme={'dark'}
                className='p-2 gap-3 flex-auto'
                onClick={({ key }) => handleMenuItemClick(key)}
                mode="horizontal"
            >
                {menuAdminArr.map((item) => {
                    return <Menu.Item key={item.key}
                        className={`mr-20 ${item.flexRight ? 'ml-auto' : 'ml-0'}`}
                    >{item.label}</Menu.Item>
                })}
            </Menu>
        ) : (
            <div style={{ backgroundColor: '#001529' }} className='fixed top-0 w-screen z-50 font-bold'>
                <div className="container">
                    {(isMobileWidth) ? (
                        <Menu
                            id='myHeader'
                            theme={'dark'}
                            className='py-2 m-0 text-center align-middle'
                            onClick={({ key }) => handleMenuItemClick(key)}
                            selectedKeys={[current]}
                            mode={showMobileMenu ? 'vertical' : 'horizontal'}
                        >
                            {menuUserArr.map((item) => {
                                return (item.showMenu || showMobileMenu) && (
                                    <Menu.Item
                                        key={item.key}
                                        className={`px-2 ${item.flexRight && showMobileMenu === false ? 'ml-auto' : 'ml-0'} 
                                        `}
                                    >{item.label}
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    ) : (
                        <Menu
                            id='myHeader' theme={'dark'}
                            className='lg:p-2 leading-extra-loose py-2 m-0 text-center lg:text-left align-middle'
                            onClick={({ key }) => handleMenuItemClick(key)}
                            selectedKeys={[current]} mode={'horizontal'}
                        >
                            {menuUserArr.map((item) => (
                                <Menu.Item
                                    key={item.key}
                                    className={`px-2 ${item.flexRight ? 'ml-auto' : 'ml-0'}`}>
                                    {item.label}
                                </Menu.Item>
                            ))}
                        </Menu>
                    )}
                </div>
            </div>
        )}
    </>
};
