import React from 'react'
import { getDataUserInfoUpdated } from '../../../api/api';
import { Form, Input, Select, message, Button } from 'antd';

export default function FixUser({ form, setIsFixModalOpen }) {
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
    const handleUserFix = async (values) => {
        try {
            await getDataUserInfoUpdated(values);
            message.success("Cập nhật thông tin người dùng thành công");
            setIsFixModalOpen(false);
        } catch (error) {
            message.error(error.response.data.content);
            console.log(error);
        }
    };
    return (
        <Form name="FixUser"
            onFinish={handleUserFix}
            className='mx-auto my-5 border p-5 text-center'
            {...formItemLayout}
            form={form}
            scrollToFirstError
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item name="taiKhoan"
                label="Tên Tài Khoản"
                tooltip="Bạn muốn được gọi là?"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên tài khoản',
                        whitespace: true,
                    },
                ]}
            >
                <Input disabled />
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
                label="Mã Nhóm"
                className='hidden'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã nhóm!',
                        whitespace: true,
                    },
                ]}>
                <Input placeholder={'GP09'} disabled />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung"
                label="Mã Loại Người Dùng">
                <Select
                    initialvalues='KhachHang'
                    style={{ width: 332 }}
                    options={[
                        { value: 'KhachHang', label: 'Khách Hàng' },
                        { value: 'QuanTri', label: 'Quản Trị Viên' },
                    ]}
                />
            </Form.Item>
            <Button className='btn btn-red' htmlType="submit">
                Cập Nhật
            </Button>
        </Form>
    )
}
