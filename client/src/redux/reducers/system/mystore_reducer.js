import {
    LIST_MYSTORE,
    CURRENT_MYSTORE,
    DETAIL_MYSTORE

} from '../../actions/types';

export default function mystore(state = {}, action) {

    switch (action.type) {
        case LIST_MYSTORE:
            return { ...state, list: action.payload }
        case CURRENT_MYSTORE:
            return { ...state, CurrentMystore: action.payload }
        case DETAIL_MYSTORE:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}