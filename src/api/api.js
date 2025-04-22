import { https } from "./config";
const maNhom = 'GP07';
 
export const getTicketBooked = (ticketInfo) => {
    return https.post(`/QuanLyDatVe/DatVe`, ticketInfo);
}
export const getMovieShowTime = (maLichChieu) => {
    return https.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
}
export const getUserSignIn = (userInput) => {
    return https.post(`/QuanLyNguoiDung/DangNhap`, userInput);
};
export const getUserSignUp = (userInput) => {
    return https.post(`/QuanLyNguoiDung/DangKy`, userInput);
};
export const getUserInfo = () => {
    return https.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`);
};
export const getUserInfoUpdated = (userInput) => {
    return https.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userInput);
}
export const getMovieBanner = () => {
    return https.get(`/QuanLyPhim/LayDanhSachBanner?maNhom=${maNhom}`);
};
export const getMovieList = () => {
    return https.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`);
};
export const getMovieListSearchByName = (tenPhim) => {
    return https.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&tenPhim=${tenPhim}`);
};
export const getMovieListPerPage = (soTrang, soPhanTu) => {
    return https.get(`/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`);
};
export const getMovieListPerDay = (tuNgay, denNgay) => {
    return https.get(`/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=${maNhom}&soTrang=1&soPhanTuTrenTrang=10&tuNgay=${tuNgay}&denNgay=${denNgay}`);
};
export const getMovieDetail = (maPhim) => {
    return https.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
};
export const getTheaterGroup = () => {
    return https.get(`/QuanLyRap/LayThongTinHeThongRap`);
}
export const getTheaterByTheaterGroup = (maHeThongRap) => {
    return https.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
}
export const getShowTimeByTheaterGroup = () => {
    return https.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`);
};
export const getShowTimeByMovie = (maPhim) => {
    return https.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
}
export const getShowTimeCreate = (showTimeInfo) => {
    return https.post(`/QuanLyDatVe/TaoLichChieu`, showTimeInfo);
}
export const getUserType = () => {
    return https.get(`/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
}
export const getDataUserList = () => {
    return https.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`);
}
export const getDataUserListPerPage = (soTrang = 1, soPhanTu = 40) => {
    return https.get(`/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`);
}
export const getDataUserSearch = (userSearch) => {
    return https.get(`/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${maNhom}&tuKhoa=${userSearch}`);
}
export const getDataUserSearchPerPage = (userSearch, soTrang = 1, soPhanTu = 40) => {
    return https.get(`/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${userSearch}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`);
}
export const getDataUser = (tenTaiKhoan) => {
    return https.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${tenTaiKhoan}`);
}
export const getDataUserAddNew = (userInfo) => {
    return https.post(`/QuanLyNguoiDung/ThemNguoiDung`, userInfo);
}
export const getDataUserInfoUpdated = (userInfo) => {
    return https.post(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userInfo);
}
export const getDataUserDelete = (tenTaiKhoan) => {
    return https.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${tenTaiKhoan}`);
}
export const getDataMovieUpdated = (movieInfo) => {
    return https.post(`/QuanLyPhim/CapNhatPhimUpload`, movieInfo);
}
export const getDataMovieAddNew = (movieInfo) => {
    return https.post(`/QuanLyPhim/ThemPhimUploadHinh`, movieInfo);
}
export const getDataMovieDeleteIfNoShowTime = (maPhim) => {
    return https.delete(`/QuanLyPhim/XP?MaPhim=${maPhim}`);
}
export const getDataMovieDeleteAll = (maPhim) => {
    return https.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
}
