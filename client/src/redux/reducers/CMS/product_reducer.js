import {
    LIST_PRODUCT,
    DETAIL_PRODUCT

} from '../../actions/types';

export default function product (state = {}, action) {

    switch (action.type) {
        case LIST_PRODUCT:
            return { ...state, list: action.payload }
        case DETAIL_PRODUCT:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}