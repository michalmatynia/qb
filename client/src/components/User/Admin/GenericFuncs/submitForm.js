import { messageCompleted, errorClosure, messageLoading } from './errormsg_funcs'
import { partsFuncs_submitForm_Add_vh2 } from '../../../User/Admin/GenericFuncs/parts_funcs_vh'
import { attachtoFuncs_overModel_Add_vh2 } from '../../../User/Admin/GenericFuncs/attachto_funcs_vh'


export async function submitForm({
    model,
    event = null,
    dispatch,
    translate = null,
    isLocalStorage,
    current,
    redux_module,
    redux_localeuser,
    redux_current_mysite
}) {
    let newLocalStorage = { ...isLocalStorage }

    await messageLoading({ dispatch })

    let submit_result = await partsFuncs_submitForm_Add_vh2({
        translate,
        model,
        poliglot: isLocalStorage.poliglot,
        type: 'add',
        newLocalStorage: isLocalStorage,
        dispatch,
        redux_localeuser,
        redux_current_mysite
    })
    
    if (submit_result.formIsValid) {

        newLocalStorage = { ...submit_result.newLocalStorage }

        let added = { ...submit_result.added }


        if (added && 'attachto' in newLocalStorage) {
            newLocalStorage = await attachtoFuncs_overModel_Add_vh2({
                translate,
                model: Object.keys(newLocalStorage.attachto)[0],
                submodel: model,
                newLocalStorage,
                added,
                attacher: newLocalStorage.attachto.brick,
                dispatch,
                redux_localeuser,

            })
            /* Reset the attach to field */
            newLocalStorage.attachto[Object.keys(newLocalStorage.attachto)[0]] = []

        }

    }

    // czy tu nie powinno byc newLocalStorage.added ?
    if (newLocalStorage) {

        if (submit_result.formIsValid) {
            await messageCompleted({ dispatch })
        } else {
            await errorClosure({ dispatch })
        }
    }
}