import {
    LIST_THEME,
    DETAIL_THEME
} from '../../actions/types';

export default function theme(state = {}, action) {
    switch (action.type) {
        case LIST_THEME:
            return { ...state, list: action.payload }
        case DETAIL_THEME:
            return {
                ...state, detail: action.payload
            }
        default:
            return state;
    }

}