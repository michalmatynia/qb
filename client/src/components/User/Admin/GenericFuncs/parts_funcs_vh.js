import { populateFields_vh3 } from '../../../utils/Form/FormActions/populateFields_vh';

import { submitFuncs_genericSubmit_vh2, submitFuncs_saveUpdate_v1, submitFuncs_saveUpdate_vh2, submitFuncs_UpdateTranslate_vh1, submitFuncs_fullSubmit_vh2 } from './submit_funcs_vh'
import { taxoFuncs_mirrorAdded, taxoFuncs_mirrorEditCreate } from './taxo_funcs'

import { isFormValid_v2 } from '../../../utils/Form/formActions';
import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';
export async function partsFuncs_saveForm_vh2({ isLocalStorage, redux_localeuser, redux_current_mysite, dispatch = null, translate = null, current, model = null,  poliglot = null, sublistkey = null, tiedtoformkey = null, redux_module}) {


    let formdata = { ...isLocalStorage.form.formdata }

    let formIsValid = isFormValid_v2({ formdata });

    if (formIsValid) {

        let params = await submitFuncs_saveUpdate_vh2({ model, isLocalStorage, dispatch, formdata, current, poliglot, redux_current_mysite })
/*         if (model === 'taxonomy') {
            await taxoFuncs_mirrorEditCreate({ model, myprops, mystate, updated: params.updated.payload, current, form: 'tagparent' })
            await taxoFuncs_mirrorEditCreate({ model, myprops, mystate, updated: params.updated.payload, current, form: 'tagchild' })
        }
 */
        if (poliglot) {
           await submitFuncs_UpdateTranslate_vh1({ model, redux_localeuser, dispatch, isLocalStorage, redux_current_mysite, updated: params.updated, current, redux_module, prospect: params.dataToSubmit, translate, sublistkey, tiedtoformkey })
         }

        return { updated: params.updated.payload, formIsValid, current, prospect: params.dataToSubmit }
    } else {
        return { updated: null, formIsValid, current, prospect: null}
    }

}
export async function partsFuncs_submitForm_Add_vh2({ 
    translate = null, 
    model = null,  
    poliglot = null, 
    type = null, 
    newLocalStorage = null, 
    dispatch, 
    redux_localeuser,
    redux_current_mysite
 }) {

    let added

    let formIsValid = isFormValid_v2({ formdata: newLocalStorage.form.formdata });

    if (formIsValid) {
        let inQuery

        added = await submitFuncs_genericSubmit_vh2({ model, poliglot, dispatch, isLocalStorage: newLocalStorage, redux_current_mysite  })

        if (translate) {

            inQuery = { _id: { "$ne": redux_localeuser._id } }

            let lglist = await plg_findMany({ model: 'language', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

            for (const value of Object.values(lglist.payload)) {
                let addedTranslated = await submitFuncs_fullSubmit_vh2({
                    model,
                    current: added.payload,
                    prospect: added.payload,
                    source_lg: redux_localeuser.referenceID.languages[0].iso639_1,
                    target_lg: value.referenceID.languages[0].iso639_1,
                    language: value.referenceID.languages[0].iso639_1,
                    country: value.referenceID.alpha2Code,
                    redux_current_mysite,
                    dispatch,
                    isLocalStorage: newLocalStorage
                })

/*                 if (model === 'taxonomy') {
                    await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: addedTranslated.payload, country: value.referenceID.alpha2Code, language: value.referenceID.languages[0].iso639_1, form: 'tagparent' })
                    await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: addedTranslated.payload, country: value.referenceID.alpha2Code, language: value.referenceID.languages[0].iso639_1, form: 'tagchild' })
                } */
            }
        }

        if (added && Object.values(added.payload).length > 0 && newLocalStorage.resetok) {

            newLocalStorage['form']['formdata'] = await populateFields_vh3({ formdata: newLocalStorage.form.formdata, fields: null, dispatch, redux_localeuser, poliglot, type, model });
        
            console.log(newLocalStorage['form']['formdata']);
        
        }  
    } 

    return { newLocalStorage, added, formIsValid }
}
