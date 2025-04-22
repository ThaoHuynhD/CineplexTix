import React, { useState } from 'react'
import { getDataMovieAddNew } from '../../../api/api';
import { Button, DatePicker, Form, Image, Input, Switch, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ERROR_MESSAGE, SUCCESS_MESSAGE_ADD_MOVIE } from '../../../constant/constant';

export default function AddMovie({ setIsAddModalOpen, form, dayjs }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const formItemLayout = {
        labelCol: {
            xs: { span: 24, },
            sm: { span: 8, },
        },
        wrapperCol: {
            xs: { span: 24, },
            sm: { span: 16, },
        },
    };
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMovieAdd = async (values) => {
        const parsedDate = dayjs(values.ngayKhoiChieu, { timeZone: "GMT" });
        const formattedDate = parsedDate.format('DD/MM/YYYY');

        const formAdd = new FormData();
        formAdd.append("tenPhim", values.tenPhim);
        formAdd.append("trailer", values.trailer);
        formAdd.append("moTa", values.moTa);
        formAdd.append("ngayKhoiChieu", formattedDate);
        formAdd.append("sapChieu", values.sapChieu);
        formAdd.append("dangChieu", values.dangChieu);
        formAdd.append("hot", values.hot);
        formAdd.append("maNhom", values.maNhom);
        if (selectedFile) {
            formAdd.append("hinhAnh", selectedFile, selectedFile.name);
        }
        try {
            for (const entry of formAdd.entries()) {
                const [key, value] = entry;
                console.log(`${key}: ${value}`);
            }
            await getDataMovieAddNew(formAdd);
            message.success(SUCCESS_MESSAGE_ADD_MOVIE);
            setIsAddModalOpen(false);
        } catch (error) {
            message.error(ERROR_MESSAGE);
        }
    };
    return (
        <div className='AddMovie'>
            <Form className='mx-auto my-5 border p-5 text-center'
                {...formItemLayout}
                form={form}
                name="FormAddMovie"
                onFinish={handleMovieAdd}
                style={{
                    maxWidth: 1000,
                }}
                scrollToFirstError
                initialValues={{ sapChieu: false, dangChieu: false, hot: false }}
            >
                <Form.Item name="tenPhim"
                    label="Tên Phim" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên phim',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="trailer"
                    label="Trailer" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trailer của bạn!',
                            whitespace: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="moTa"
                    label="Mô Tả" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="ngayKhoiChieu"
                    hasFeedback
                    label="Ngày Khởi Chiếu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập ngày khởi chiếu!',
                        },
                    ]}
                >
                    {/* <Input placeholder='example: 10/10/2022' /> */}
                    <DatePicker format={dateFormatList} />
                </Form.Item>
                <div className="grid grid-cols-3 ml-40">
                    <Form.Item name="sapChieu"
                        label="Sắp Chiếu"
                    >
                        <Switch defaultChecked={false} />
                    </Form.Item>
                    <Form.Item name="dangChieu"
                        label="Đang Chiếu">
                        <Switch defaultChecked={false} />
                    </Form.Item>
                    <Form.Item name="hot"
                        label="Hot">
                        <Switch defaultChecked={false} />
                    </Form.Item>
                </div>
                <Form.Item name="maNhom"
                    label="Mã Nhóm"
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

                <Form.Item name="hinhAnh" label="Hình Ảnh" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn hình ảnh!',
                            whitespace: true,
                        },
                    ]}>

                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                    )}
                </Form.Item>
                <Button className='btn btn-red' htmlType="submit">
                    Thêm Phim
                </Button>
            </Form>
        </div>
    )
}
