
import rawStateFunctionSlide from "../../CMS/Slides/Additional/func_state"
import rawStateFunctionTheme from "../../system/Theme/Additional/func_state"
import rawStateFunctionBlockstyle from "../../system/Blockstyle/Additional/func_state"
import rawStateFunctionMystore from "../../system/Mystore/Additional/func_state"
import rawStateFunctionCart from "../../system/Cart/Additional/func_state"
import rawStateFunctionContact from "../../system/Contact/Additional/func_state"
import rawStateFunctionLogin from "../../system/Login/Additional/func_state"
import rawStateFunctionTaxonomy from "../../system/Taxonomy/Additional/func_state"

/* List State */
import rawStateFunction_Transdetailproduct_List from "../../system/Trnsdetailproduct/Additional/func_list"
import rawStateFunction_User_List from "../../system/User/Additional/func_list"
import rawStateFunction_Visit_List from "../../system/Visit/Additional/func_list"
import rawStateFunction_Blockstyle_List from "../../system/Blockstyle/Additional/func_list"
import rawStateFunction_Theme_List from "../../system/Theme/Additional/func_list"
import rawStateFunction_Mystore_List from "../../system/Mystore/Additional/func_list"
import rawStateFunction_Cart_List from "../../system/Cart/Additional/func_list"
import rawStateFunction_Contact_List from "../../system/Contact/Additional/func_list"
import rawStateFunction_Login_List from "../../system/Login/Additional/func_list"
import rawStateFunction_Taxonomy_List from "../../system/Taxonomy/Additional/func_list"
import rawStateFunction_Mysite_List from "../../system/Mysite/Additional/func_list"

import rawStateFunction_Product_List from "../../CMS/Products/Additional/func_list"
import rawStateFunction_Productgroup_List from "../../CMS/Productgroup/Additional/func_list"
import rawStateFunction_Slide_List from "../../CMS/Slides/Additional/func_list"
import rawStateFunction_Brick_List from "../../CMS/Brick/Additional/func_list"
import rawStateFunction_Page_List from "../../CMS/Page/Additional/func_list"

import { routing_gotoEdit_vh3 } from '../../EventFuncs/routing_funcs_vh2'


export async function grabFunctionState({
    onRemoveItem,

    model,
    dispatch,
    redux_current_mysite,
    redux_localeuser,
    redux_currencyuser,
    reactrouter_match,
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
        case (model === 'theme' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Theme_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'mystore' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Mystore_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'cart' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Cart_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'login' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Login_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'contact' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Contact_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'blockstyle' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Blockstyle_List({
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
        case (model === 'taxonomy' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Taxonomy_List({
                onRemoveItem,
                onGotoLink
            })
            break;
        case (model === 'product' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Product_List({
                redux_currencyuser,
                onRemoveItem,
                onGotoLink,

            })
            break;
        case (model === 'productgroup' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Productgroup_List({
                redux_currencyuser,
                onRemoveItem,
                onGotoLink,

            })
            break;
        case (model === 'mysite' && kind === 'list'):

            rawFunctionState = await rawStateFunction_Mysite_List({
                redux_currencyuser,
                onRemoveItem,
                onGotoLink,

            })
            break;
        case (model === 'brick' && kind === 'list'):
            rawFunctionState = await rawStateFunction_Brick_List({
                onRemoveItem,
                onGotoLink,
            })
            break;
        case (model === 'page' && kind === 'list'):
            rawFunctionState = await rawStateFunction_Page_List({
                onRemoveItem,
                onGotoLink,
            })
            break;
        case (model === 'slide' && !kind):
            rawFunctionState = await rawStateFunctionSlide({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'cart' && !kind):
            rawFunctionState = await rawStateFunctionCart({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'contact' && !kind):
            rawFunctionState = await rawStateFunctionContact({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'login' && !kind):
            rawFunctionState = await rawStateFunctionLogin({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'mystore' && !kind):
            rawFunctionState = await rawStateFunctionMystore({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'theme' && !kind):
            rawFunctionState = await rawStateFunctionTheme({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'blockstyle' && !kind):
            rawFunctionState = await rawStateFunctionBlockstyle({ redux_current_mysite, dispatch, redux_localeuser, model })
            break;
        case (model === 'taxonomy' && !kind):
            rawFunctionState = await rawStateFunctionTaxonomy({ redux_current_mysite, reactrouter_match, dispatch, redux_localeuser, model })
            break;
        default:
            rawFunctionState = null;
    }

    return rawFunctionState
}


