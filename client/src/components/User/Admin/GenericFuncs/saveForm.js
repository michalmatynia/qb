
import { messageCompleted, errorClosure, messageLoading } from './errormsg_funcs'
import { partsFuncs_saveForm_vh2 } from '../../../User/Admin/GenericFuncs/parts_funcs_vh'
import { attachtoFuncs_overModel_Edit_vh2, attachtoFuncs_populateEdit_vh2 } from '../../../User/Admin/GenericFuncs/attachto_funcs_vh'


export async function saveForm({
    model,
    event = null,
    dispatch,
    translate,
    isLocalStorage,
    current,
    redux_module,
    redux_localeuser,
    redux_current_mysite
}) {

    try {
        let newLocalStorage = { ...isLocalStorage }

        await messageLoading({ dispatch })

        let save_result = await partsFuncs_saveForm_vh2({
            model,
            event,
            translate,
            poliglot: isLocalStorage.poliglot,
            current,
            dispatch,
            isLocalStorage,
            redux_module,
            redux_localeuser,
            redux_current_mysite

        })

        if (!current) {
            let errormsg = 'no current found'
            throw errormsg
        }

        if (save_result.updated) {

            if ('attachto' in newLocalStorage) {

                let updated = { ...save_result.updated }
                let current = { ...save_result.current }

                await attachtoFuncs_overModel_Edit_vh2({
                    dispatch,
                    model: Object.keys(isLocalStorage.attachto)[0],
                    translate,
                    submodel: model,
                    updated,
                    current,
                    attacher_updated_arr: newLocalStorage.attachto.brick,
                    newLocalStorage,
                    redux_localeuser
                })

                // console.log('IN');
                // console.log(newLocalStorage);

                newLocalStorage = await attachtoFuncs_populateEdit_vh2({
                    model: Object.keys(newLocalStorage.attachto)[0],
                    newLocalStorage,
                    found: updated,
                    dispatch,
                    redux_localeuser
                })

            }



            if (save_result.formIsValid) {
                await messageCompleted({ dispatch })
                return newLocalStorage
            } else {

                throw save_result
            }
        }
    } catch (err) {
        console.log(err);

        await errorClosure({ dispatch })
        return isLocalStorage

    }


}