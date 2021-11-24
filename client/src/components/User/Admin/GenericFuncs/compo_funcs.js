import {
    plg_findOne_QueMod,
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';
import { populateFields_v2 } from '../../../utils/Form/FormActions/populateFields';
import {
    taxoFuncs_mirrorAdded,
} from './taxo_funcs'
import { submitFuncs_fullSubmit } from './submit_funcs'


export async function compoFuncs_fetchOne_Edit({ model = null, myprops = null, mystate = null, rootid = null }) {
    let inQuery

    inQuery = { _id: { "$eq": rootid } }
    await plg_findOne_QueMod({ model, myprops, actionType: 'detail', inQuery, populate: mystate.localStorage.qhelpers.populate })

}

export async function compoFuncs_Refresh_v2({ model = null, myprops = null, rootid = null, mystate = null, poliglot = null, newLocalStorage = null, fields = null, type = null }) {
    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }
    let found
    if (type === 'edit') {

        let inQuery = { _id: { "$eq": rootid } }

        found = await plg_findOne_QueMod({ model, myprops, actionType: 'detail', inQuery, populate: mystate.localStorage.qhelpers.populate ? mystate.localStorage.qhelpers.populate : null })
        fields = found.payload

    } else if (type === 'add') {

    }

    newLocalStorage['form']['formdata'] = await populateFields_v2({ formdata: mystate.localStorage.form.formdata, fields, myprops, poliglot, type, model, mystate });
    
    
    // === DEBUG, DISABLED FOR TESTING
    if (poliglot) {
        newLocalStorage['form']['formdata']['country'].value = myprops.user.localeUser.referenceID.alpha2Code;
        newLocalStorage['form']['formdata']['language'].value = myprops.user.localeUser.referenceID.languages[0].iso639_1;
    }
    return { newLocalStorage, found }
}

export async function compoFuncs_DidUpdate_Edit({ model = null, prevmyprops = null, myprops = null, mystate = null, tiedtoformkey, poliglot = null, newLocalStorage = null, type = null }) {


    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }

    let didmount_result
    // If Edit screen is only Refreshed - NO LG CHANGE
    if ('detail' in myprops[model] === false || 'detail' in myprops[model] === '') {

        didmount_result = await compoFuncs_Refresh_v2({ model, myprops, mystate, rootid: myprops.match.params.id, poliglot, type })

    } else {

        let found = {}

        if (myprops[model].detail.lgbinder !== '' && prevmyprops.user.localeUser !== myprops.user.localeUser) {

            let inQuery
            inQuery = {
                lgbinder: { "$eq": myprops[model].detail.lgbinder },
                country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
                language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
            }

            found = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

            if (found.payload !== '') {

                // FOUND With the same lgbinder
                myprops.history.push(`${found.payload._id}`)
                didmount_result = await compoFuncs_Refresh_v2({ model, myprops, mystate, rootid: found.payload._id, poliglot, type })

            } else {

                // no item for this particular language
                // let prospect = await grabFormdata_v2({ formdata: mystate.localStorage.form.formdata, myprops, model, mystate });
                let added = await submitFuncs_fullSubmit({
                    model,
                    myprops,
                    mystate,
                    current: myprops[model].detail,
                    prospect: myprops[model].detail,
                    source_lg: prevmyprops.user.localeUser.referenceID.languages[0].iso639_1,
                    target_lg: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                    language: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                    country: myprops.user.localeUser.referenceID.alpha2Code
                })
                if (added !== undefined) {

                    myprops.history.push(`${added.payload._id}`)
                    didmount_result = await compoFuncs_Refresh_v2({ model, myprops, mystate, rootid: added.payload._id, poliglot, type })
                }


            }

        } else if (myprops[model].detail.lgbinder === '' && prevmyprops.user.localeUser !== myprops.user.localeUser) {

            // no item for this particular language
            // let prospect = await grabFormdata_v2({ formdata: mystate.localStorage.formdata, myprops, model, mystate });

            let added = await submitFuncs_fullSubmit({
                model,
                myprops,
                mystate,
                current: myprops[model].detail,
                prospect: myprops[model].detail,
                source_lg: prevmyprops.user.localeUser.referenceID.languages[0].iso639_1,
                target_lg: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                language: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                country: myprops.user.localeUser.referenceID.alpha2Code,

            })

            if (added !== undefined) {

                if (model === 'taxonomy') {
                    await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: added.payload, country: myprops.user.localeUser.referenceID.alpha2Code, language: myprops.user.localeUser.referenceID.languages[0].iso639_1, form: 'tagparent' })
                    await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: added.payload, country: myprops.user.localeUser.referenceID.alpha2Code, language: myprops.user.localeUser.referenceID.languages[0].iso639_1, form: 'tagchild' })
                }

                myprops.history.push(`${added.payload._id}`)
                didmount_result = await compoFuncs_Refresh_v2({ model, myprops, mystate, rootid: added.payload._id, poliglot, type })

            }
        }
    }
    return didmount_result
}

export async function compoFuncs_DidUpdate_List_v2({ model = null, myprops = null,  mystate = null, poliglot = null, viewparams = null, inLimit = null, inSortOrder = null, inSortBy = null, inQuery = {}, newLocalStorage }) {

    if(!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }

        if (poliglot) {

            Object.assign(inQuery, {
                country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
                language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 },
            })
        }

        let response = await plg_findMany({ viewparams, model, myprops, actionType: 'list', inQuery, inLimit, inSortOrder, inSortBy })

        newLocalStorage.viewparams.size = Object.keys(response.payload).length

    return newLocalStorage

}