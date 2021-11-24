
import rawStateFunctionSlide from "../../CMS/Slides/Additional/func_state"
import rawStateFunctionTheme from "../../system/Theme/Additional/func_state"
import rawStateFunctionBlockstyle from "../../system/Blockstyle/Additional/func_state"



export async function grabFunctionState({ model, redux_current_mysite, dispatch, redux_localeuser }) {
    let rawFunctionState = null;

    switch (model) {
        case ('slide'):
            rawFunctionState = await rawStateFunctionSlide({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case ('theme'):
            rawFunctionState = await rawStateFunctionTheme({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case ('blockstyle'):
            rawFunctionState = await rawStateFunctionBlockstyle({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        default:
            rawFunctionState = null;
    }



    return rawFunctionState
}


