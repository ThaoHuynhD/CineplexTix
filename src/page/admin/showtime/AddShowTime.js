import { Button, DatePicker, Form, Input, Select, TimePicker, message } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { getShowTimeCreate } from '../../../api/api';
import { getTheaterByTheaterGroup, getTheaterGroup } from '../../../api/api';

export default function AddShowTime({ form, setIsModalOpen, movieSelected }) {
    const [theaterGroupList, setTheaterGroupList] = useState([]);
    const [theaterList, setTheaterList] = useState([]);
    const [theaterGroupSelected, setTheaterGroupSelected] = useState(null);
    const [theaterSelected, setTheaterSelected] = useState(null);

    const formItemLayout = {
        labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
        wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
    };
    const handleTheaterGroupSelection = (theaterGroupSelected) => {
        setTheaterGroupSelected(theaterGroupSelected);
        setTheaterSelected(null);
        setFieldMaCumRap();
    };
    const handleTheaterSelection = (theaterSelected) => {
        setTheaterSelected(theaterSelected);
    };

    const handleAddShowTime = async (values) => {
        let ngayChieuGioChieu = moment(values.ngayChieu).format('DD-MM-YYYY') + ' ' + moment(values.gioChieu).format('HH:mm:ss')
        let showTimeUpdate = {
            maPhim: movieSelected,
            maRap: theaterSelected,
            ngayChieuGioChieu: ngayChieuGioChieu,
            giaVe: values.giaVe,
        }
        try {
            await getShowTimeCreate(showTimeUpdate);
            message.success("Tạo Lịch Chiếu thành công");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Đã có lỗi xảy ra");
            console.log(error);
        }
    };

    let fetchDataTheaterGroupList = async () => {
        try {
            let response = await getTheaterGroup();
            setTheaterGroupList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };

    let fetchDataTheaterList = async (theaterGroupSelected) => {
        if (theaterGroupSelected === null) return;
        try {
            let response = await getTheaterByTheaterGroup(theaterGroupSelected);
            setTheaterList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchDataTheaterGroupList();
    }, []);
    useEffect(() => {
        fetchDataTheaterList(theaterGroupSelected)
    }, [theaterGroupSelected]);
    const [myvalues, setMyvalues] = React.useState({});
    const setFieldMaCumRap = () => {
        setMyvalues({ maCumRap: null, });
        if (theaterGroupSelected !== null) { form.setFieldsValue(myvalues); }
    };
    const theaterGroupArr = [];
    const theaterArr = [];
    theaterGroupList.forEach((theaterGroup) => {
        const TheaterGroupUpdate = {
            value: theaterGroup.maHeThongRap,
            label: theaterGroup.tenHeThongRap,
        }
        theaterGroupArr.push(TheaterGroupUpdate);

        theaterList.forEach((theater) => {
            if (theaterGroup.maHeThongRap === theaterGroupSelected) {
                const theaterUpdate = {
                    value: theater.maCumRap,
                    label: theater.tenCumRap,
                }
                theaterArr.push(theaterUpdate);
            }
        })
    })
    return (
        <Form className='mx-auto my-5 border p-5'
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleAddShowTime}
            style={{
                maxWidth: 1200,
            }}
            scrollToFirstError
            initialValues={{
                maHeThongRap: theaterGroupSelected === null ? 'Chọn Hệ Thống Rạp' : '',
                maCumRap: theaterSelected === null ? 'Chọn Cụm Rạp' : ''
            }}
        >
            <Form.Item name="maHeThongRap" label="Mã Hệ Thống Rạp">
                <Select
                    options={theaterGroupArr}
                    onChange={handleTheaterGroupSelection}
                />
            </Form.Item>
            <Form.Item name="maCumRap" label="Mã Cụm Rạp" shouldUpdate>
                <Select
                    options={theaterArr}
                    onChange={handleTheaterSelection}
                    disabled={theaterGroupSelected === null}
                />
            </Form.Item>
            <div className='flex flex-auto'>
                <div className='w-32 mr-2'></div>
                <Form.Item name="ngayChieu"
                    label="Ngày Chiếu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập ngày Chiếu!',
                        },
                    ]}
                >
                    <DatePicker
                        size="large"
                        format="YYYY-MM-DD"
                        className='mx-2'
                    />
                </Form.Item>
                <Form.Item name="gioChieu"
                    label="Giờ Chiếu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giờ Chiếu!',
                        },
                    ]}
                >
                    <TimePicker
                        size="large"
                        format="HH:mm"
                    />
                </Form.Item>
            </div>
            <Form.Item name="giaVe"
                label="Giá Vé"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập giá vé!',
                        whitespace: true,
                    },
                ]}>
                <Input />
            </Form.Item>
            <div className='text-center'>
                <Button className='btn btn-red' htmlType="submit">
                    Tạo Lịch Chiếu
                </Button>
            </div>
        </Form>
    )
}
