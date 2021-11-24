import {
    LIST_LANGUAGE,
    MENU_LANGUAGE,
    DETAIL_LANGUAGE

} from '../../actions/types';

export default function language(state = {}, action) {
    switch (action.type) {
        case LIST_LANGUAGE:
            return { ...state, list: action.payload }
        case MENU_LANGUAGE:
            return { ...state, menu: action.payload }
        case DETAIL_LANGUAGE:
            return {
                ...state, detail: action.payload
            }
        default:
            return state;
    }

}