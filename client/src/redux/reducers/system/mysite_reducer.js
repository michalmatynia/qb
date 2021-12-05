import {
    LIST_MYSITE,
    CURRENT_MYSITE,
    DETAIL_MYSITE,
    OVERTHEME_MYSITE
} from '../../actions/types';

export default function mysite(state = {}, action) {

    switch (action.type) {
        case LIST_MYSITE:
            return { ...state, list: action.payload }
        case CURRENT_MYSITE:
            return { ...state, CurrentMysite: action.payload }
        case OVERTHEME_MYSITE:
            return { ...state, OverthemeMysite: action.payload }
        case DETAIL_MYSITE:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}