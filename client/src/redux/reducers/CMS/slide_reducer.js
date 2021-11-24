import {
    LIST_SLIDE,
    DETAIL_SLIDE

} from '../../actions/types';

export default function slide (state = {}, action) {

    switch (action.type) {
        case LIST_SLIDE:
            return { ...state, list: action.payload }
        case DETAIL_SLIDE:
            return { ...state, detail: action.payload }
        default:
            return state;
    }

}