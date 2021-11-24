import {
    LIST_PAGE,
    DETAIL_PAGE,
    CURRENT_LIST_PAGE,
    CURRENT_DETAIL_PAGE
} from '../../actions/types';

export default function page(state = {}, action) {

    switch (action.type) {
        case LIST_PAGE:
            return { ...state, list: action.payload }
        case CURRENT_LIST_PAGE:
            return { ...state, current_list_page: action.payload }
        case CURRENT_DETAIL_PAGE:
            return { ...state, current_detail_page: action.payload }
        case DETAIL_PAGE:
            return { ...state, detail: action.payload }
        default:
            return state;
    }

}