import {
LIST_NATION,
DETAIL_NATION
} from '../../actions/types';

export default function nation(state = {}, action) {
    switch (action.type) {
        case LIST_NATION:
            return { ...state, list: action.payload }
        case DETAIL_NATION:
            return {
                ...state, detail: action.payload
            }
        default:
            return state;
    }

}