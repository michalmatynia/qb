import { listFuncs_loadList_v2, listFuncs_RemoveItem_v2 } from '../GenericFuncs/list_funcs'
import { checkFuncs_handleRemove_Brick } from '../GenericFuncs/check_funcs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'

import {
    plg_findMany,
    plg_updateOne_queMod_oprMod,
    plg_updateMany,
    plg_findOne_QueMod
} from '../../../utils/Plugs/cms_plugs';

export async function remove_fromDatabase({ event, value, removeall, cell = null, sublistkey = null, tiedtoformkey = null, mystate = null, myprops = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        await listFuncs_RemoveItem_v2({
            item: value,
            removeall,
            myprops,
            mystate,
            model,
            poliglot,
        })
        // ========
        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell, })

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
export async function remove_fromFormTable({ event, value, cell = null, sublistkey = null, tiedtoformkey = null, mystate = null, myprops = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        // ============
        newLocalStorage = await checkFuncs_handleRemove_Brick({
            value,
            cell,
            newLocalStorage
        })
        // ========
        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell, })

        await listFuncs_loadList_v2({
            cell,
            sublistkey,
            myprops,
            mystate,
            poliglot,
            hideIDs: checkedIDs,
            newLocalStorage
        })


    }
    return newLocalStorage

}
export async function remove_fromOverMods({ overmodel = null, submodel = null, value, removeall,  mystate = null, myprops = null }) {

    // convert vairables
    let attachtobinder = mystate.localStorage.attachtobinder
    let translate = removeall
    let inOperator
    let inParams
    let inQuery

    inQuery = {
        [attachtobinder]: { "$elemMatch": { referenceID: { "$eq": value._id } } }
    }


    let match = await plg_findMany({ model: overmodel, myprops, actionType: 'samestate', inQuery })

    let attacherRemoved_arr = match.payload

    for (let atremoved of attacherRemoved_arr) {

        if (translate) {

            inQuery = {}

            let lglist = await plg_findMany({ mystate, model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

            for (const eachlg of lglist.payload) {
                /* find brick in this language */
                inQuery = {}
                Object.assign(inQuery, {
                    language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                    country: { "$eq": eachlg.referenceID.alpha2Code },
                    lgbinder: { "$eq": atremoved.lgbinder }
                });

                let lgbound_overmod = await plg_findOne_QueMod({ model: overmodel, myprops, actionType: 'samestate', inQuery })

                if (lgbound_overmod.payload !== '') {

                    inQuery = {}
                    Object.assign(inQuery, {
                        language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                        country: { "$eq": eachlg.referenceID.alpha2Code },
                        lgbinder: { "$eq": value.lgbinder }
                    });
                    let lgbound_undermod = await plg_findOne_QueMod({ model: submodel, myprops, actionType: 'samestate', inQuery })

                    if (lgbound_undermod.payload !== '') {
                        let counter = 1
                        let newChecked = [...lgbound_overmod.payload[attachtobinder]]
                        newChecked.sort(function (a, b) {
                            return a.position - b.position;
                        });
                        newChecked = newChecked.reduce((accum, currentvalue, CurrentIndex) => {

                            if (currentvalue.referenceID !== lgbound_undermod.payload._id) {

                                accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID, position: counter, visible: currentvalue.visible }]
                                counter++

                            } else { accum = [...accum] }

                            return accum

                        }, []);

                        inQuery = {
                            _id: { "$eq": lgbound_overmod.payload._id },
                        }
                        inOperator = {
                            "$set": { [attachtobinder]: newChecked }
                        }

                        await plg_updateOne_queMod_oprMod({ model: overmodel, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

                    }

                }

            }
        } else {

            let counter = 1
            let newChecked = [...atremoved[attachtobinder]]
            newChecked.sort(function (a, b) {
                return a.position - b.position;
            });

            newChecked = newChecked.reduce((accum, currentvalue, CurrentIndex) => {

                if (currentvalue.referenceID !== value._id) {

                    accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID, position: counter, visible: currentvalue.visible }]
                    counter++

                } else { accum = [...accum] }

                return accum

            }, []);

                inQuery = {
                    _id: { "$eq": atremoved._id },
                }
            
  
            inOperator = {
                "$set": { [attachtobinder]: newChecked }
            }


            await plg_updateMany({ model: overmodel, myprops, actionType: 'samestate', inQuery, inOperator, inParams })
        }
    }




}
