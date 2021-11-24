import {
    LIST_BLOCKSTYLE,
    DETAIL_BLOCKSTYLE
} from '../../actions/types';

export default function blockstyle(state = {}, action) {
    switch (action.type) {
        case LIST_BLOCKSTYLE:
            return { ...state, list: action.payload }
        case DETAIL_BLOCKSTYLE:
            return {
                ...state, detail: action.payload
            }
        default:
            return state;
    }

}