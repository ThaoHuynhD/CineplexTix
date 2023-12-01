import { CLEAR_CART, DESELECT_SEAT, PUCHASING_CART, SELECT_SEAT } from "../constant/constant";

const initialCart = {
    cart: [],
}

export const cartReducer = (state = initialCart, { type, payload }) => {
    switch (type) {
        case SELECT_SEAT: {
            let cloneCart = [...state.cart];
            let index = cloneCart.findIndex((seat) => {
                return seat.maGhe === payload.seat.maGhe;
            });
            if (index === -1) {
                let newSeat = { ...payload.seat };
                cloneCart.push(newSeat);
            }
            return { ...state, cart: cloneCart };
        }
        case DESELECT_SEAT: {
            let cloneCart = [...state.cart];
            let index = cloneCart.findIndex((seat) => {
                return seat.maGhe === payload.seat.maGhe;
            });
            cloneCart.splice(index, 1);
            return { ...state, cart: cloneCart };
        }
        case PUCHASING_CART: {
            return { ...state, cart: null }
        }
        case CLEAR_CART: {
            return { ...state, cart: null }
        }
        default:
            return state;
    }
}
