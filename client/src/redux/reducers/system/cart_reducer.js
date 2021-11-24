import {
    LIST_CART,
    DETAIL_CART

} from '../../actions/types';

export default function cart (state = {}, action) {

    switch (action.type) {
        case LIST_CART:
            return { ...state, list: action.payload }
        case DETAIL_CART:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}