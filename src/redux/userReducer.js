import { GET_DETAIL_USER, SIGN_IN_USER, SIGN_OUT_USER, SIGN_UP_USER, UPDATE_USER } from "../constant/constant";

const initialStateUser = {
    info: userLocalStorage.get(),
    userDetail: userDetailLocalStorage.get(),
}

export const userReducer = (state = initialStateUser, { type, payload }) => {
    switch (type) {
        case SIGN_IN_USER:
            return { ...state, info: payload };
        case SIGN_UP_USER:
            return { ...state, info: payload };
        case GET_DETAIL_USER:
            return { ...state, info: payload };
        case UPDATE_USER:
            return { ...state, info: payload };
        case SIGN_OUT_USER:
            return { ...state, info: null };
        default:
            return state;
    }
}
