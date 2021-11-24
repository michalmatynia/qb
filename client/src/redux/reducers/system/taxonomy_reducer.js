import {
    LIST_TAXONOMY,
    DETAIL_TAXONOMY
} from '../../actions/types';

export default function taxonomy (state = {}, action) {

    switch (action.type) {
        case LIST_TAXONOMY:
            return { ...state, list: action.payload }
        case DETAIL_TAXONOMY:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}