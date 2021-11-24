import { populateFields_v2 } from '../../../utils/Form/FormActions/populateFields';

import { submitFuncs_genericSubmit_v2, submitFuncs_saveUpdate_v1, submitFuncs_UpdateTranslate, submitFuncs_fullSubmit } from './submit_funcs'
import { taxoFuncs_mirrorAdded, taxoFuncs_mirrorEditCreate } from './taxo_funcs'

import { isFormValid_v2 } from '../../../utils/Form/formActions';

import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function partsFuncs_saveForm_v1({ translate = null, model = null, myprops = null, mystate = null, poliglot = null, sublistkey = null, tiedtoformkey = null }) {

    let current = { ...myprops[model].detail }

    let formdata = { ...mystate.localStorage.form.formdata }

    let formIsValid = isFormValid_v2({ formdata });

    if (formIsValid) {

        let params = await submitFuncs_saveUpdate_v1({ model, myprops, mystate, formdata, current, poliglot })
        if (model === 'taxonomy') {
            await taxoFuncs_mirrorEditCreate({ model, myprops, mystate, updated: params.updated.payload, current, form: 'tagparent' })
            await taxoFuncs_mirrorEditCreate({ model, myprops, mystate, updated: params.updated.payload, current, form: 'tagchild' })
        }

        if (poliglot) {

            await submitFuncs_UpdateTranslate({ model, myprops, mystate, updated: params.updated, current, prospect: params.dataToSubmit, translate, sublistkey, tiedtoformkey })
        }

        return { updated: params.updated.payload, formIsValid, current, prospect: params.dataToSubmit }
    } else {
        return { updated: null, formIsValid, current, prospect: null}
    }

}
export async function partsFuncs_submitForm_Add_v2({ translate = null, model = null, myprops = null, mystate = null, poliglot = null, type = null, newLocalStorage = null }) {

    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }
    let added

    let formIsValid = isFormValid_v2({ formdata: mystate.localStorage.form.formdata });

    if (formIsValid) {
        let inQuery

        added = await submitFuncs_genericSubmit_v2({ model, myprops, mystate, poliglot })

        if (translate) {

            inQuery = { _id: { "$ne": myprops.user.localeUser._id } }

            let lglist = await plg_findMany({ model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

            for (const value of Object.values(lglist.payload)) {
                let addedTranslated = await submitFuncs_fullSubmit({
                    model,
                    myprops,
                    mystate,
                    current: added.payload,
                    prospect: added.payload,
                    source_lg: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                    target_lg: value.referenceID.languages[0].iso639_1,
                    language: value.referenceID.languages[0].iso639_1,
                    country: value.referenceID.alpha2Code,
                })

                if (model === 'taxonomy') {
                    await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: addedTranslated.payload, country: value.referenceID.alpha2Code, language: value.referenceID.languages[0].iso639_1, form: 'tagparent' })
                    await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: addedTranslated.payload, country: value.referenceID.alpha2Code, language: value.referenceID.languages[0].iso639_1, form: 'tagchild' })
                }
            }
        }

        if (added && Object.values(added.payload).length > 0 && mystate.localStorage.resetok) {

            newLocalStorage['form']['formdata'] = await populateFields_v2({ formdata: mystate.localStorage.form.formdata, myprops, poliglot, type, model });

        }  
    } 

    return { newLocalStorage, added, formIsValid }
}
