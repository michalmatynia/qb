
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    // ADD_TO_CART_USER,
    // GET_CART_ITEMS_USER,
    // REMOVE_CART_ITEM_USER,
    // ON_SUCCESS_BUY_USER,
    // UPDATE_DATA_USER,
    // CLEAR_UPDATE_USER_DATA,
    CART_USER,
    SET_COOKIE_USER,
    LOCALE_USER,
    CURRENCY_USER,
    LIST_USER,
    DETAIL_USER,
    GEO_USER
} from '../../actions/types';

export default function user(state = {}, action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
            case GEO_USER:
                return { ...state, geodata: action.payload }
        // case LOGOUT_USER:
        //     return {  ...state}
        // case ADD_TO_CART_USER:
        //     return {
        //         ...state, userData: {
        //             ...state.userData,
        //             cart: action.payload
        //         }
        //     }
        // case GET_CART_ITEMS_USER:
        //     return {
        //         ...state,
        //         cartDetail: action.payload
        //     }
        // case REMOVE_CART_ITEM_USER:
        //     return {
        //         ...state,
        //         cartDetail: action.payload.cartDetail,
        //         userData: {
        //             ...state.userData,
        //             cart: action.payload.cart
        //         }
        //     }
        // case ON_SUCCESS_BUY_USER:
        //     return {
        //         ...state,
        //         successBuy: action.payload.success,
        //         userData: {
        //             ...state.userData,
        //             cart: action.payload.cart
        //         },
        //         cartDetail: action.payload.cartDetail
        //     }
        // case UPDATE_DATA_USER:
        //     return { ...state, updateUser: action.payload }
        // case CLEAR_UPDATE_USER_DATA:
        //     return { ...state, updateUser: action.payload }
        case SET_COOKIE_USER:
            return { ...state, cookieUser: action.payload }
        case LOCALE_USER:
            return { ...state, localeUser: action.payload }
        case CURRENCY_USER:
            return { ...state, currencyUser: action.payload }
        case CART_USER:
            return { ...state, cartUser: action.payload }
        case LIST_USER:
            return { ...state, list: action.payload }
        case DETAIL_USER:
            return {
                ...state, detail: action.payload
            }
        default:
            return state;
    }

}