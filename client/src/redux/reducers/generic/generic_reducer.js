import {
    SAME_STATE

} from '../../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case SAME_STATE:
            return {
                ...state,
            }
        default:
            return state;
    }

}