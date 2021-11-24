import {
    LIST_BRICK,
    SUBLIST_BRICK,
    DETAIL_BRICK

} from '../../actions/types';

export default function brick(state = {}, action) {

    switch (action.type) {
        case LIST_BRICK:
            return { ...state, list: action.payload }
        case SUBLIST_BRICK:
            return { ...state, sublist: action.payload }
        case DETAIL_BRICK:
            return { ...state, detail: action.payload }
        default:
            return state;
    }
}