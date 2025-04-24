import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { userDetailLocalStorage, userLocalStorage } from '../api/localServices';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';

export default function MyHeader() {
    let navigate = useNavigate();
    let info = userLocalStorage.get();
    let logoURL = '/img/cineflex-logo-white.svg';
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

    let handleSignOut = () => {
        userLocalStorage.remove();
        userDetailLocalStorage.remove();
        window.location.reload();
        window.location.href = "/";
    };
    const scrollIntoView = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -50; // scroll 50px higher
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    function scrollToTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
                else { navigate(`/${key}`); scrollToTop(); };
            }
            else if (key === 'sign-out') {
                handleSignOut();
                navigate('/');
            }
            else {
                navigate(`/`)
                setTimeout(() => {
                    scrollIntoView(key);
                }, 200);
            }
            setShowMobileMenu(false);
        }
    };
    const menuArr = [
        {
            label: <img src={logoURL} className='w-48 mt-2' alt='cineplextix' />, key: 'movieBanner',
            showMenu: true
        },
        { label: 'Lịch Chiếu', key: 'schedule' },
        { label: 'Cụm Rạp', key: 'groupcinema' },
        { label: 'Tin Tức', key: 'myNews' },
        { label: 'Ứng Dụng', key: 'myApps' },
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
            label: showMobileMenu ? <CloseOutlined /> : (<button className={`mx-auto ${isMobileWidth ? 'block' : 'hidden'}`}><MenuOutlined /></button>),
            key: 'menuBar',
            showMenu: true,
        },
    ]
    const renderMenu = ({ className, mode, filterCondition }) => (
        <Menu
            id="myHeader"
            theme="dark"
            className={className}
            onClick={({ key }) => handleMenuItemClick(key)}
            selectedKeys={[current]}
            mode={mode}
        >
            {menuArr.map((item) => {
                if (filterCondition && !filterCondition(item)) return null;
                return (
                    <Menu.Item
                        key={item.key}
                        className={`btn-yellow ${item.flexRight && (!showMobileMenu ? 'ml-auto' : '')} ${!item.flexRight || showMobileMenu ? 'ml-0' : ''} px-2`}
                    >
                        {item.label}
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    const menuAdminComponent = renderMenu({
        className: 'p-2 gap-3 flex-auto',
        mode: 'horizontal',
        filterCondition: item => item.showMenu === true,
    });

    const menuUserMobileComponent = renderMenu({
        className: 'py-2 m-0 text-center align-middle',
        mode: showMobileMenu ? 'vertical' : 'horizontal',
        filterCondition: (item) => item.showMenu || showMobileMenu,
    });

    const menuUserDestopComponent = renderMenu({
        className: 'lg:p-2 leading-extra-loose py-2 m-0 text-center lg:text-left align-middle',
        mode: 'horizontal',
    });
    return <div className='mb-20'>
        <ConfigProvider theme={{ token: { colorPrimary: '#fff00', colorTextLightSolid: '#ffd700' }, }}>
            {(isAdmin) ? (menuAdminComponent) : (
                <div style={{ backgroundColor: '#001529' }} className='fixed top-0 w-screen z-50 font-bold'>
                    <div className="container">
                        {(isMobileWidth) ? (menuUserMobileComponent) : (menuUserDestopComponent)}
                    </div>
                </div>)}
        </ConfigProvider>
    </div>
};