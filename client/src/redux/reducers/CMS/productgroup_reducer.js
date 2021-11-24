import {
    LIST_PRODUCTGROUP,
    DETAIL_PRODUCTGROUP

} from '../../actions/types';

export default function productgroup (state = {}, action) {

    switch (action.type) {
        case LIST_PRODUCTGROUP:
            return { ...state, list: action.payload }
        case DETAIL_PRODUCTGROUP:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}