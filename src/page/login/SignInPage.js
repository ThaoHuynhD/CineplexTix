import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserSignIn } from '../../api/api';
import { userLocalStorage } from '../../api/localServices';
import { Button, Form, Input, message } from "antd";
import { ERROR_MESSAGE_WRONG_USER, SIGN_IN_USER, SUCCESS_MESSAGE_SIGN_IN } from '../../constant/constant';

export default function SignInPage() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
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

    const fetchData = async (values) => {
        try {
            const response = await getUserSignIn(values);
            dispatch({
                type: SIGN_IN_USER,
                payload: response.data.content,
            });
            userLocalStorage.set(response.data.content);
            message.success(SUCCESS_MESSAGE_SIGN_IN);
            setTimeout(() => {
                window.location.reload();
                window.location.href = "/"
            }, 1000);
        } catch {
            message.error(ERROR_MESSAGE_WRONG_USER);
        }
    };

    const onFinish = (values) => {
        fetchData(values);
    }

    return (
        <div id='sign-in' className='w-screen h-screen relative bg-black'>
            <div className='container border '>
                <div className='text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 lg:w-1/2'>
                    <Form
                        className='lg:p-20 p-5 border bg-white rounded-2xl w-full'
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
                        <h1 className='pb-5 text-4xl'>Đăng nhập</h1>
                        <Form.Item name="taiKhoan" label="Tài Khoản"
                            rules={[
                                {
                                    type: 'taiKhoan',
                                    message: 'Tài khoản nhập sai hoặc không tồn tại!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập thông tin tài khoản!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="matKhau" label="Mật Khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập thông tin mật khẩu!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button className='btn-red' htmlType="submit">Đăng nhập</Button>
                        <p className='pt-3'>Chưa có tài khoản, đăng ký <NavLink to='/sign-up' className={'text-blue-800 font-bold'}>tại đây</NavLink></p>
                    </Form>
                </div>
            </div>
        </div>
    )
}