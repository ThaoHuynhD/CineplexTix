import React, { useState } from 'react';
import { TeamOutlined, IdcardOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, } from 'antd';
import MyHeader from '../../../component/MyHeader';
import PersonalPage from '../../PersonalPage/PersonalPage';
import MovieList from '../movie/MovieList';
import UserManagement from '../user/UserManagement';
import ShowTimeManagement from '../showtime/ShowTimeManagement';

const { Content, Sider, Header, } = Layout;
function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}

const items = [
    getItem('Quản Lý Người Dùng', 'user', <TeamOutlined />),
    getItem('Quản Lý Phim', 'movie', <CarryOutOutlined />,),
    getItem('Thông Tin Cá Nhân', 'personal', <IdcardOutlined />),
];

export default function MainAdminPage() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
    const [selectedItem, setSelectedItem] = useState('movie');

    const [selectedMaPhim, setSelectedMaPhim] = useState(null);

    const handleMenuItemClick = (key) => {
        setSelectedItem(key);
    }

    const breadcrumbItems = [
        <Breadcrumb.Item key="Admin">Admin</Breadcrumb.Item>,
        <Breadcrumb.Item key={selectedItem}>{selectedItem}</Breadcrumb.Item>
    ];

    const componentMapping = {
        user: <UserManagement />,
        movie: <MovieList setSelectedItem={setSelectedItem} setSelectedMaPhim={setSelectedMaPhim} />,
        showtime: <ShowTimeManagement selectedMaPhim={selectedMaPhim} />,
        personal: <PersonalPage />,
    };

    return (
        <Layout style={{ minHeight: '100vh', scrollBehavior: 'smooth', overflow: 'auto' }}        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className=' my-2 mx-auto text-center w-20 rounded-lg overflow-hidden'>
                    <img className=''
                        src='https://i.pinimg.com/564x/d0/d7/b0/d0d7b047ddef0af6057424fcaf1f19ce.jpg' alt='logo' />
                </div>
                <Menu theme="dark" defaultSelectedKeys={selectedItem} mode="inline" items={items}
                    onClick={({ key }) => handleMenuItemClick(key)} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <MyHeader />
                </Header>
                <Content style={{ margin: '0 16px', paddingTop: 10 }} >
                    <Breadcrumb style={{ margin: '16px 0', }}>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div style={{ padding: 10, minHeight: 800, background: colorBgContainer, }}>
                        {componentMapping[selectedItem]}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};