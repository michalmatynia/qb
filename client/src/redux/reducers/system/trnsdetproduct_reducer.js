import {
    LIST_TRNSDETAILPRODUCT,
    DETAIL_TRNSDETAILPRODUCT

} from '../../actions/types';

export default function trnsdetailproduct (state = {}, action) {

    switch (action.type) {
        case LIST_TRNSDETAILPRODUCT:
            return { ...state, list: action.payload }
        case DETAIL_TRNSDETAILPRODUCT:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}