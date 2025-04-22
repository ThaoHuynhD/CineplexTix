import React from 'react';
import { Button, Form, Input, message, } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ERROR_MESSAGE, SIGN_UP_USER, SUCCESS_MESSAGE_SIGN_UP } from '../../constant/constant';
import { getUserSignUp } from '../../api/api';
export default function SignUpPage() {
    const dispatch = useDispatch();
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
    const [form] = Form.useForm();

    const fetchData = async (values) => {
        try {
            const response = await getUserSignUp(values);
            dispatch({
                type: SIGN_UP_USER,
                payload: response.data.content,
            });
            message.success(SUCCESS_MESSAGE_SIGN_UP);
            setTimeout(() => {
                window.location.reload();
                window.location.href = "/sign-in"
            }, 1000);
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };

    const onFinish = (values) => {
        fetchData(values);
    };
    return (
        <div id='sign-up' className='w-screen h-screen relative bg-black'>
            <div className='container border '>
                <div className='text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 lg:w-1/2'>
                    <Form
                        className=' lg:p-20 p-5 border bg-white rounded-2xl'
                        theme={'dark'}
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 1200,
                        }}
                        scrollToFirstError
                    >
                        <h1 className='pb-5 text-4xl'>Đăng ký</h1>
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
                        <Form.Item name="soDienThoai"
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
                            className='d-none'
                            initialValue={'KhachHang'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã nhóm!',
                                    whitespace: true,
                                },
                            ]}>
                            <Input disabled={true} placeholder={'KhachHang'} />
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
                        <Button className='btn-red' htmlType="submit">
                            Đăng Ký
                        </Button>
                        <p className='pt-3'>Đã có tài khoản, đăng nhập <NavLink to='/sign-in' className={'text-blue-800 font-bold'}>tại đây</NavLink></p>
                    </Form>
                </div>
            </div>
        </div>
    );
};
