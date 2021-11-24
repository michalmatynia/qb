import {
    LIST_VIEW,
    DETAIL_VIEW

} from '../../actions/types';

export default function view (state = {}, action) {

    switch (action.type) {
        case LIST_VIEW:
            return { ...state, list: action.payload }
        case DETAIL_VIEW:
            return { ...state, detail: action.payload }
        default:
            return state;
    }

}