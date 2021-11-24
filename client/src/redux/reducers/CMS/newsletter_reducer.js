import {
    LIST_NEWSLETTER,
    DETAIL_NEWSLETTER

} from '../../actions/types';

export default function newsletter (state = {}, action) {

    switch (action.type) {
        case LIST_NEWSLETTER:
            return { ...state, list: action.payload }
        case DETAIL_NEWSLETTER:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}