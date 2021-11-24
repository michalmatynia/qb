import {
    LIST_MESSAGES,
    DETAIL_MESSAGE
} from '../../actions/types';

export default function messages(state = {}, action) {
    switch (action.type) {
        case LIST_MESSAGES:
            return { ...state, ListMessages: action.payload }
        case DETAIL_MESSAGE:
            return {
                ...state, DetailMessage: action.payload
            }
        default:
            return state;
    }

}