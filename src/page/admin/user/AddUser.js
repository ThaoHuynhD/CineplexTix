import React from 'react'
import { getDataUserAddNew, } from '../../../api/api';
import { Button, Form, Input, Select, message } from 'antd';

export default function AddUser({ form, setIsAddModalOpen }) {
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const handleUserAdd = async (values) => {
        try {
            await getDataUserAddNew(values);
            message.success("Thêm người dùng thành công");
            setIsAddModalOpen(false);
        } catch (error) {
            message.error(error.response.data.content);
            console.log(error);
        }
    };
    return (
        <Form className='mx-auto my-5 border p-3 text-center'
            {...formItemLayout}
            form={form}
            name="AddUserForm"
            onFinish={handleUserAdd}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item name="taiKhoan"
                label="Tên Tài Khoản"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên tài khoản',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="hoTen"
                label="Họ Và Tên"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập họ tên của bạn!',
                        whitespace: true,
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item name="matKhau"
                label="Mật Khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="email"
                label="Địa Chỉ Email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="soDt"
                label="Số Điện Thoại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!',
                        whitespace: true,
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item name="maNhom"
                label="maNhom"
                initialValue={'GP09'}
                className='hidden'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã nhóm!',
                        whitespace: true,
                    },
                ]}>
                <Input placeholder={'GP09'} />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung"
                label="maLoaiNguoiDung"
                initialValue={'KhachHang'}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã nhóm!',
                        whitespace: true,
                    },
                ]}>

                <Select
                    defaultValue="KhachHang"
                    style={{ width: 120 }}
                    allowClear
                    options={[{ value: 'KhachHang', label: 'Khách Hàng' }, { value: 'QuanTri', label: 'Quản Trị' }]}
                />
            </Form.Item>
            <Button className='btn btn-red pb-1' htmlType="submit">
                Thêm người dùng
            </Button>
        </Form>
    )
}
