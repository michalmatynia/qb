import {
    LIST_CONTACT,
    DETAIL_CONTACT

} from '../../actions/types';

export default function contact (state = {}, action) {

    switch (action.type) {
        case LIST_CONTACT:
            return { ...state, list: action.payload }
        case DETAIL_CONTACT:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}