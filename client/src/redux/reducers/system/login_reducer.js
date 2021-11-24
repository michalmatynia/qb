import {
    LIST_LOGIN,
    DETAIL_LOGIN

} from '../../actions/types';

export default function login (state = {}, action) {

    switch (action.type) {
        case LIST_LOGIN:
            return { ...state, list: action.payload }
        case DETAIL_LOGIN:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}