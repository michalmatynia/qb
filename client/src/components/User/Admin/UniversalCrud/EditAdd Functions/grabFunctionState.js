
import rawStateFunctionSlide from "../../CMS/Slides/Additional/func_state"
import rawStateFunctionTheme from "../../system/Theme/Additional/func_state"
import rawStateFunctionBlockstyle from "../../system/Blockstyle/Additional/func_state"

import rawStateFunction_Slide_List from "../../CMS/Slides/Additional/func_list"


export async function grabFunctionState({ 
    onRemoveItem,
    
    model, 
    redux_current_mysite, 
    dispatch, 
    redux_localeuser, 
    kind = null,
}) {
    let rawFunctionState = null;

    switch (true) {
        case (model === 'slide' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Slide_List({ 
   
                onRemoveItem
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


