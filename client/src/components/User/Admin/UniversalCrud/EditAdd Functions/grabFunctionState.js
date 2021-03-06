
import rawStateFunctionSlide from "../../CMS/Slides/Additional/func_state"
import rawStateFunctionTheme from "../../system/Theme/Additional/func_state"
import rawStateFunctionBlockstyle from "../../system/Blockstyle/Additional/func_state"

import rawStateFunction_Transdetailproduct_List from "../../system/Trnsdetailproduct/Additional/func_list"
import rawStateFunction_User_List from "../../system/User/Additional/func_list"
import rawStateFunction_Visit_List from "../../system/Visit/Additional/func_list"

import rawStateFunction_Slide_List from "../../CMS/Slides/Additional/func_list"


import { routing_gotoEdit_vh3 } from '../../EventFuncs/routing_funcs_vh2'


export async function grabFunctionState({
    onRemoveItem,

    model,
    redux_current_mysite,
    dispatch,
    redux_localeuser,
    kind = null,
}) {

    const onGotoLink = async ({ event, value = null, reactrouter_history, model, redux_userdata }) => {

        routing_gotoEdit_vh3({ 
            model,
            event, 
            value,
            reactrouter_history,
            redux_userdata
            })
    }


    let rawFunctionState = null;

    switch (true) {

        case (model === 'trnsdetailproduct' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Transdetailproduct_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'user' && kind === 'list'):

            rawFunctionState = await rawStateFunction_User_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'slide' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Slide_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'visit' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Visit_List({
                onRemoveItem,
            })
            break;
        case (model === 'slide' && !kind):
            rawFunctionState = await rawStateFunctionSlide({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'theme' && !kind):
            rawFunctionState = await rawStateFunctionTheme({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'blockstyle' && !kind):
            rawFunctionState = await rawStateFunctionBlockstyle({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        default:
            rawFunctionState = null;
    }

    return rawFunctionState
}


