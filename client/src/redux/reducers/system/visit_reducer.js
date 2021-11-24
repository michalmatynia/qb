import {
    LIST_VISIT,
    DETAIL_VISIT
} from '../../actions/types';

export default function visit(state = {}, action) {
    switch (action.type) {
        case LIST_VISIT:
            return { ...state, list: action.payload }
        case DETAIL_VISIT:
            return {
                ...state, detail: action.payload
            }
        default:
            return state;
    }

}