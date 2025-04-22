import React, { useState } from 'react'
import { getDataMovieUpdated } from '../../../api/api';
import { Form, Input, Switch, message, Button, Image, DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ERROR_MESSAGE, SUCCESS_MESSAGE_UPDATE_MOVIE } from '../../../constant/constant';

export default function FixMovie({ setIsFixModalOpen, form, setSelectedImage, selectedImage, dayjs }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
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


    const handleMovieFix = async (values) => {

        const parsedDate = dayjs(values.ngayKhoiChieu, { timeZone: "GMT" });
        const formattedDate = parsedDate.format('DD/MM/YYYY');

        const formFix = new FormData();
        formFix.append("maPhim", values.maPhim);
        formFix.append("tenPhim", values.tenPhim);
        formFix.append("trailer", values.trailer);
        formFix.append("moTa", values.moTa);
        formFix.append("ngayKhoiChieu", formattedDate);
        formFix.append("sapChieu", values.sapChieu);
        formFix.append("dangChieu", values.dangChieu);
        formFix.append("hot", values.hot);
        formFix.append("maNhom", values.maNhom);
        formFix.append("danhGia", values.danhGia);
        if (selectedFile) {
            formFix.append("hinhAnh", selectedFile, selectedFile.name);
        }
        try {
            await getDataMovieUpdated(formFix);
            message.success(SUCCESS_MESSAGE_UPDATE_MOVIE);
            setIsFixModalOpen(false);
        } catch (error) {
            message.error(ERROR_MESSAGE);
        }
    };

    return (
        <div className='FixMovie'>
            <Form className='mx-auto my-5 border p-3 text-center'
                {...formItemLayout} form={form}
                name="FormFixMovie" onFinish={handleMovieFix}
                scrollToFirstError
            >
                <Form.Item name="maPhim" label="Mã Phim" hasFeedback>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="tenPhim" label="Tên Phim" hasFeedback
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
                <Form.Item name="trailer" label="Trailer" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trailer của bạn!',
                            whitespace: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="moTa" label="Mô Tả" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="ngayKhoiChieu" label="Ngày Khởi Chiếu" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập ngày khởi chiếu!',
                        },
                    ]}
                >
                    <DatePicker format={dateFormatList} />
                </Form.Item>
                <div className="grid grid-cols-4">
                    <div></div>
                    <Form.Item name="sapChieu" label="Sắp Chiếu" className='flex-auto'>
                        <Switch />
                    </Form.Item>
                    <Form.Item name="dangChieu" label="Đang Chiếu" className='flex-auto'>
                        <Switch />
                    </Form.Item>
                    <Form.Item name="hot" label="Hot" className='flex-auto'>
                        <Switch />
                    </Form.Item>
                </div>
                <Form.Item name="maNhom" label="Mã Nhóm"
                    className='hidden'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mã nhóm!',
                            whitespace: true,
                        },
                    ]}>
                    <Input readOnly />
                </Form.Item>
                <Form.Item name="danhGia" label="Đánh Giá" hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item name="hinhAnh" label="Hình Ảnh" hasFeedback>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                    )}
                </Form.Item>
                <Button className='btn btn-red mb-1' htmlType="submit">
                    Cập nhật Phim
                </Button>
            </Form>
        </div>
    )
}
