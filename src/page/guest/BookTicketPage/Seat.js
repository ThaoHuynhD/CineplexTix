import React from 'react';
import { useDispatch } from 'react-redux';
import { DESELECT_SEAT, SELECT_SEAT } from '../../../constant/constant';

export default function Seat({ seat, isChecked }) {
    const dispatch = useDispatch();
    const handleButtonClick = () => {
        if (isChecked) {
            dispatch({ type: DESELECT_SEAT, payload: { seat } });
        } else {
            dispatch({ type: SELECT_SEAT, payload: { seat } });
        }
    };
    return (
        <button
            className={`lg:w-10 lg:h-10 text-xs lg:text-lg leading-none pb-3.5 w-5 h-5 m-1 text-center px-0 btn ${seat.taiKhoanNguoiDat !== null ? 'btn-dark' : isChecked ? 'btn-success' : seat.loaiGhe === 'Thuong' ? 'btn-light' : 'btn-warning'}`}
            disabled={seat.taiKhoanNguoiDat !== null}
            onClick={handleButtonClick}
        >{seat.taiKhoanNguoiDat !== null ? 'X' : seat.tenGhe}
        </button>
    );
}