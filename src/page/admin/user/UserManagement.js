import React, { useEffect, useState } from 'react'
import {
  getDataUser, getDataUserDelete, getDataUserList
} from '../../../api/api';
import { Form, Tag, message, Modal } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import AddUser from './AddUser';
import FixUser from './FixUser';
import SearchUser from './SearchUser';
import { ERROR_MESSAGE, SUCCESS_MESSAGE_DELETE_USER } from '../../../constant/constant';

export default function UserManagement() {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [userSearchList, setUserSearchList] = useState([]);

  const [isSearch, setIsSearch] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);

  const fetchDataUserList = async () => {
    try {
      let response = await getDataUserList();
      setUserList(response.data.content);
    } catch {
      message.error(ERROR_MESSAGE);
    }
  };

  const fetchDataUserInfo = async (tenTaiKhoan) => {
    try {
      let response = await getDataUser(tenTaiKhoan);
      let user = response.data.content;
      let upDatedUser = {
        taiKhoan: user.taiKhoan,
        hoTen: user.hoTen,
        matKhau: user.matKhau,
        email: user.email,
        soDt: user.soDT,
        maNhom: user.maNhom,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
      }
      form.setFieldsValue(upDatedUser);
    } catch {
      message.error(ERROR_MESSAGE);
    }
  };

  const showAddModal = () => { setIsAddModalOpen(true); };
  const showFixModal = async (tenTaiKhoan) => {
    try {
      await fetchDataUserInfo(tenTaiKhoan);
      setIsFixModalOpen(true);
    } catch {
      message.error(ERROR_MESSAGE);
    }
  };
  const handleAddCancel = () => { setIsAddModalOpen(false); };
  const handleFixCancel = () => { setIsFixModalOpen(false); };

  const handleUserDel = async (tenTaiKhoan) => {
    try {
      await getDataUserDelete(tenTaiKhoan);
      message.success(SUCCESS_MESSAGE_DELETE_USER);
    } catch {
      message.error(ERROR_MESSAGE);
    }
  };

  const renderList = () => {
    let list = isSearch ? userSearchList : userList;
    return (
      <table className='table text-center'>
        <thead>
          <tr>
            <th>STT</th>
            <th>TÀI KHOẢN</th>
            <th>HỌ TÊN</th>
            <th>LOẠI NGƯỜI DÙNG</th>
            <th>SỐ ĐIỆN THOẠI</th>
            <th>EMAIL</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>{list.map((user, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.taiKhoan.substring(0, 30)}{user.taiKhoan.length > 30 ? '...' : ''}</td>
              <td>{user.hoTen.substring(0, 30)}{user.hoTen.length > 30 ? '...' : ''}</td>
              <td><Tag color={user.maLoaiNguoiDung === 'KhachHang' ? 'green' : 'red'}>{user.maLoaiNguoiDung === 'KhachHang' ? 'Khách Hàng' : 'QTV'}</Tag></td>
              <td>{user.soDT}</td>
              <td>{user.email}</td>
              <td>
                <button className='mr-1 btn btn-warning' onClick={() => { showFixModal(user.taiKhoan) }}><FormOutlined /></button>
                <button className='btn btn-danger' onClick={() => { handleUserDel(user.taiKhoan) }}><DeleteOutlined /></button>
              </td>
            </tr>
          )
        })
        }</tbody>
      </table>
    )

  }

  useEffect(() => {
    fetchDataUserList();
  }, []);
  return (
    <div>
      <div className='ModalAddUser'>
        <Modal width={900} title="Thêm Tài Khoản" open={isAddModalOpen} onCancel={handleAddCancel}
          footer={null}
        >
          <AddUser form={form} setIsAddModalOpen={setIsAddModalOpen} />
        </Modal>
      </div>
      <div className='ModalFixUser'>
        <Modal width={800} title="Cập Nhật Tài Khoản" open={isFixModalOpen} onCancel={handleFixCancel}
          footer={null}
        >
          <FixUser
            form={form}
            setIsFixModalOpen={setIsFixModalOpen} />
        </Modal>
      </div>
      <div className="m-3">
        <div className="text-right mb-2"><button onClick={showAddModal} className='btn btn-success'>Thêm người dùng</button></div>
        <SearchUser setUserSearchList={setUserSearchList}
          setIsSearch={setIsSearch}
          isSearch={isSearch} />
      </div>
      {renderList()}
    </div >
  )
}
