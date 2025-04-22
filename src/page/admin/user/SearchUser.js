import React from 'react'
import { getDataUserSearch } from '../../../api/api';
import { message } from 'antd';
import Search from 'antd/es/input/Search';
import { ERROR_MESSAGE } from '../../../constant/constant';

export default function SearchUser({ setUserSearchList, isSearch, setIsSearch }) {
    const fetchDataUserSearch = async (searchValue) => {
        try {
            if (searchValue === undefined || searchValue === '' || searchValue === null) return;
            let response = await getDataUserSearch(searchValue);
            const updatedUserSearchList = response.data.content;
            setUserSearchList(updatedUserSearchList);
            setIsSearch(true);
            message.success(`Có ${updatedUserSearchList.length} kết quả tìm kiếm tương tự`)
        } catch {
            message.error(ERROR_MESSAGE);
        }
    };
    const handleSearchCancel = () => { setIsSearch(false) };
    return (
        <div className="searchUser">
            <div className='flex'>
                <Search
                    enterButton
                    size="large" onSearch={fetchDataUserSearch}
                    placeholder="input search text(phone number/name)"
                    className='bg-blue-500 overflow-hidden rounded-lg'
                />
                <button className={`btn btn-danger ${isSearch ? 'block' : 'hidden'}`} onClick={() => { handleSearchCancel() }}>CancleSearch</button>
            </div>
        </div>
    )
}
