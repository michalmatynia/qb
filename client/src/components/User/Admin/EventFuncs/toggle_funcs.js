import { listFuncs_loadList_v2 } from '../GenericFuncs/list_funcs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'

import {
    plg_updateMany,
    plg_updateOne_queMod_oprMod,
    plg_findMany,
    plg_findOne_QueMod
} from '../../../utils/Plugs/cms_plugs';

export async function toggle_addToReferer({ event, value = null, cell = null, sublistkey = null, tiedtoformkey = null, mystate = null, myprops = null, populate = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {

        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        let checked = mystate.localStorage.form.formdata[tiedtoformkey].value

        const newChecked = [...checked];

        let newPosition = checked.length + 1

        let insertAr = { referenceID: value, position: newPosition, model, visible: true, quantity: 1 }
        if (newLocalStorage['form']['formdata'][tiedtoformkey].sublist.viewparams.sortOrder === 1) {
            newChecked.push(insertAr)

        } else {
            newChecked.unshift(insertAr)
        }

        newLocalStorage['form']['formdata'][tiedtoformkey].value = [...newChecked]

        let newCheckedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })

        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model,
            myprops,
            mystate,
            poliglot,
            hideIDs: newCheckedIDs,
            newLocalStorage,
            populate

        })
    }
    return newLocalStorage

}

export async function toggle_boolSwitch_v1({
    value,
    event,
    cell,
    sublistkey,
    tiedtoformkey,
    mystate = null,
    myprops = null,
    poliglot
}) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let cellkey = null
        let cellvalue = null
        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model
        let field = event.target.id
        let checked = !value[field]

        if (cell) {
            // This is where parts of state are Evaluated

            cellkey = Object.keys(cell)[0]
            cellvalue = Object.values(cell)[0]

            newLocalStorage.form.formdata[cellkey] = cellvalue
        }
        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })

        let inQuery

        let inOperator = { '$set': { [field]: checked } }

        if (poliglot) {
            if (value.lgbinder) {
                inQuery = { lgbinder: { "$eq": value.lgbinder } }

                await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })

            } else {
                inQuery = { _id: { "$eq": value._id } }
                await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator })
            }
        } else {
            inQuery = { _id: { "$eq": value._id } }
            await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator })
        }

        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model,
            myprops,
            mystate,
            poliglot,
            hideIDs: checkedIDs,
            newLocalStorage
        })

    }

    return newLocalStorage
}
export async function toggle_isDefault_v1({
    value,
    event,
    cell,
    sublistkey,
    tiedtoformkey,
    mystate = null,
    myprops = null,
    poliglot
}) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let cellkey = null
        let cellvalue = null
        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model
        let field = event.target.id

        if (cell) {
            // This is where parts of state are Evaluated

            cellkey = Object.keys(cell)[0]
            cellvalue = Object.values(cell)[0]

            newLocalStorage.form.formdata[cellkey] = cellvalue
        }

        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })

        let inQuery = {}
        let inOperator = {}

        // // MANAGE ISDEFAULT

        let newBoolean

        if (value.isdefault) {

            newBoolean = value.isdefault
        } else {
            newBoolean = !value.isdefault
        }

        if ('lgbinder' in value && value.lgbinder !== '') {

            let lglist = await plg_findMany({ mystate, model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })
            for (const eachlg of Object.values(lglist.payload)) {
                inQuery = {
                    lgbinder: { "$eq": value.lgbinder },
                }
                inQuery = Object.assign(inQuery, {
                    country: { "$eq": eachlg.referenceID.alpha2Code },
                    language: { "$eq": eachlg.referenceID.languages[0].iso639_1 }
                });

                let found = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                if (found.payload !== '') {
                    inQuery = { _id: { "$eq": found.payload._id }, }

                    inOperator = { '$set': { isdefault: newBoolean } }

                    await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inOperator, inQuery })

                    inQuery = { _id: { "$ne": found.payload._id } }

                    inQuery = Object.assign(inQuery, {
                        country: { "$eq": eachlg.referenceID.alpha2Code },
                        language: { "$eq": eachlg.referenceID.languages[0].iso639_1 }
                    });
                    inOperator = { '$set': { [field]: !newBoolean } }

                    await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })

                } else {
                    // Find any isdefault in a given language
                    inQuery = {
                        isdefault: { "$eq": true },
                    }
                    inQuery = Object.assign(inQuery, {
                        country: { "$eq": eachlg.referenceID.alpha2Code },
                        language: { "$eq": eachlg.referenceID.languages[0].iso639_1 }
                    });

                    let anyisdefault = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                    if (anyisdefault.payload === '') {
                        inQuery = { position: { "$eq": 1 }, }
                        inOperator = { '$set': { [field]: true } }

                        await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inOperator, inQuery })

                    }

                }


            }

        } else {
            inQuery = {}
            Object.assign(inQuery,
                { _id: { "$eq": value._id } }
            )
            Object.assign(inOperator,
                { '$set': { [field]: newBoolean } }
            )
            await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator })

            // Clear the rest
            inQuery = { _id: { "$ne": value._id } }

            inOperator = { '$set': { [field]: !newBoolean } }
            if (poliglot) {
                inQuery = Object.assign(inQuery, {
                    country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
                    language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
                });
            }
            await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
        }

        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model,
            myprops,
            mystate,
            poliglot,
            hideIDs: checkedIDs,
            newLocalStorage
        })

    }

    return newLocalStorage

}