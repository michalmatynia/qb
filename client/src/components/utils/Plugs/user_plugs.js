import {

    act_logoutUser
} from '../../../redux/actions/user_actions';

export async function plg_logoutUser({  model = null, dispatch, actionType = null}) {
    let reqBody = { }
    Object.assign(reqBody , {model: model});

    return await dispatch(act_logoutUser({ dataToSubmit: reqBody, actionType }))

}