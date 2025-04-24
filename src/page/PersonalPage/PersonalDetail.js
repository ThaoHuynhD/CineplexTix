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
        labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
        wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
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
    let titleList = [
        { title: "Tên Tài Khoản", value: userDetail.taiKhoan },
        { title: "Mật Khẩu", value: maskedPassword },
        { title: "Số Điện Thoại", value: userDetail.soDT },
        { title: "Họ Và Tên", value: userDetail.hoTen },
        { title: "Địa Chỉ Email", value: userDetail.email },];
    let formList = [
        {
            name: "taiKhoan", label: "Tên Tài Khoản",
            rules: [{ required: true, message: 'Vui lòng nhập tên tài khoản', whitespace: true }],
            inputType: <Input />
        },
        {
            name: "matKhau", label: "Mật Khẩu",
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
            inputType: <Input.Password />
        },
        {
            name: "soDT", label: "Số Điện Thoại",
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!', whitespace: true }],
            inputType: <Input />
        },
        {
            name: "maNhom", label: "Mã Nhóm", className: "d-none",
            rules: [{ required: true, message: 'Vui lòng nhập mã nhóm!', whitespace: true }],
            inputType: <Input disabled={true} placeholder={userDetail.maNhom} />
        },
        {
            name: "maLoaiNguoiDung", label: "Mã Loại Người Dùng", className: "d-none",
            rules: [{ required: true, message: 'Vui lòng nhập mã loại người dùng!', whitespace: true }],
            inputType: <Input disabled={true} placeholder={userDetail.maLoaiNguoiDung} />
        },
        {
            name: "hoTen", label: "Họ Và Tên",
            rules: [{ required: true, message: 'Vui lòng nhập họ tên của bạn!', whitespace: true }],
            inputType: <Input />
        },
        {
            name: "email", label: "Địa Chỉ Email",
            rules: [
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' }],
            inputType: <Input />
        },
    ]
    return (
        <div className='container pt-20'>
            <div className="text-center py-5"><span className='lg:px-5 px-2 py-2 text-3xl my-5 mx-auto font-semibold 
            bg-red-700 text-white text-center rounded-lg'>Thông tin cá nhân</span></div>
            <div className=' lg:w-1/2 mx-auto'>
                <table className='table border-hidden text-white bg-slate-600 rounded-2xl overflow-hidden'>
                    <tbody>
                        {titleList.map((item) => {
                            return <tr key={item.key}>
                                <th>{item.title}</th>
                                <td>{item.value}</td>
                            </tr>
                        })}
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
                        style={{ maxWidth: 1000 }}
                        scrollToFirstError
                    >
                        {formList.map((item) => {
                            return <Form.Item name={item.name}
                                label={item.label}
                                rules={item.rules}
                                className={item.className}
                            >
                                {item.inputType}
                            </Form.Item>
                        })}
                        <Button className='btn-red' htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};
