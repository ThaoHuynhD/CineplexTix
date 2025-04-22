import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { userDetailLocalStorage } from '../../api/localServices';
import { ERROR_MESSAGE, SUCCESS_MESSAGE_UPDATE_USER, UPDATE_USER } from '../../constant/constant';
import { getUserInfoUpdated } from '../../api/api';
import { useDispatch } from 'react-redux';
import Loader from '../../component/Loader';

export default function PersonalDetail({ userDetail }) {
    const [form] = Form.useForm();
    let dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    useEffect(() => {
        if (userDetail !== null) {
            form.setFieldsValue({
                taiKhoan: userDetail.taiKhoan,
                matKhau: userDetail.matKhau,
                soDT: userDetail.soDT,
                hoTen: userDetail.hoTen,
                email: userDetail.email,
                maLoaiNguoiDung: userDetail.maLoaiNguoiDung,
                maNhom: userDetail.maNhom,
            });
        }
    }, [userDetail, form]);

    if (!userDetail || userDetail.length === 0) {
        return <Loader />;
    }

    const fetchData = async (values) => {
        try {
            const response = await getUserInfoUpdated(values);
            dispatch({
                type: UPDATE_USER,
                payload: response.data.content,
            });
            userDetailLocalStorage.set(response.data.content);
            message.success(SUCCESS_MESSAGE_UPDATE_USER);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };

    const onFinish = (values) => {
        fetchData(values);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const maskedPassword = '*'.repeat(userDetail.matKhau.length);
    return (
        <div className='container pt-20'>
            <div className="text-center py-5"><span className='lg:px-5 px-2 py-2 text-3xl my-5 mx-auto font-semibold 
            bg-red-700 text-white text-center rounded-lg'>Thông tin cá nhân</span></div>
            <div className=' lg:w-1/2 mx-auto'>
                <table className='table border-hidden text-white bg-slate-600 rounded-2xl overflow-hidden'>
                    <tbody>
                        <tr>
                            <th>Tên Tài Khoản</th>
                            <td>{userDetail.taiKhoan}</td>
                        </tr>
                        <tr>
                            <th>Mật Khẩu</th>
                            <td>{maskedPassword}</td>
                        </tr>
                        <tr>
                            <th>Số Điện Thoại</th>
                            <td>{userDetail.soDT}</td>
                        </tr>
                        <tr>
                            <th>Họ Và Tên</th>
                            <td>{userDetail.hoTen}</td>
                        </tr>
                        <tr>
                            <th>Địa Chỉ Email</th>
                            <td>{userDetail.email}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center mb-20">
                    <Button className='btn-red' onClick={showModal}>
                        Cập nhật
                    </Button>
                </div>
            </div>
            <Modal title="Cập Nhật Thông Tin" open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}
                footer={null}
            >
                <div className='p-10 mb-20 border bg-white rounded-2xl text-center'>
                    <Form
                        theme={'dark'}
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 1000,
                        }}
                        scrollToFirstError
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
                        <Form.Item name="soDT"
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã nhóm!',
                                    whitespace: true,
                                },
                            ]}>
                            <Input disabled={true} placeholder={userDetail.maNhom} />
                        </Form.Item>
                        <Form.Item name="maLoaiNguoiDung"
                            label="Mã Loại Người Dùng"
                            className='d-none'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã loại người dùng!',
                                    whitespace: true,
                                },
                            ]}>
                            <Input disabled={true} placeholder={userDetail.maLoaiNguoiDung} />
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
                            Cập nhật
                        </Button>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};
