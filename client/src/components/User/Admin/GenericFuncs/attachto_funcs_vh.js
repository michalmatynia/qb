
import { arraysStringifyEqualAsync } from '../../../utils/Funcs/array_funcs'

import {
    plg_findMany,
    plg_updateOne_queMod_oprMod,
    plg_findOne_QueMod,
    plg_updateMany
} from '../../../utils/Plugs/cms_plugs';

import { add_overModel_Edit_vh2 } from './Extra_Attachto_Funcs/add_overmodel'
import { remove_overModel_Edit_vh2 } from './Extra_Attachto_Funcs/remove_overmodel'


export async function attachtoFuncs_overModel_Lgchange_vh1({ translate = null, model = null, dispatch = null, submodel = null, attacher = null, newLocalStorage = null,
    added = null, redux_localeuser }) {

    let attachtobinder = newLocalStorage.attachtobinder

    let inQuery = {}
    let inOperator = {}

    inQuery = { _id: { "$in": attacher.map(item => item._id) }, }

    let attacher_freshlist = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })

    for (let eachattach of attacher_freshlist.payload) {


        if (translate) {


            /* find a brick in this language */

            inQuery = {}
            Object.assign(inQuery, {
                language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 },
                country: { "$eq": redux_localeuser.referenceID.alpha2Code },
                lgbinder: { "$eq": eachattach.lgbinder }
            });
            let lgbound_attachee = await plg_findOne_QueMod({ model, dispatch, actionType: 'samestate', inQuery })


            if (lgbound_attachee.payload !== '') {
                /* find a slide in this language */

                inQuery = {}
                Object.assign(inQuery, {
                    language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 },
                    country: { "$eq": redux_localeuser.referenceID.alpha2Code },
                    lgbinder: { "$eq": added.payload.lgbinder }
                });
                let lgbound_grab = await plg_findOne_QueMod({ model: submodel, dispatch, actionType: 'samestate', inQuery })

                if (lgbound_grab.payload !== '') {
                    // Find slide in that language
                    // Prepare arrayofrefs formula
                    let refs_formula_lgbound = {
                        model: submodel,
                        position: lgbound_attachee.payload[attachtobinder].length + 1,
                        referenceID: lgbound_grab.payload._id,
                        visible: lgbound_grab.payload.visible
                    }
                    // each.checked.push(formula)
                    let lgbound_newChecked = [...lgbound_attachee.payload[attachtobinder]]

                    lgbound_newChecked.push(refs_formula_lgbound)

                    inQuery = { _id: { "$eq": lgbound_attachee.payload._id }, }
                    inOperator = { '$set': { [attachtobinder]: lgbound_newChecked } }

                    await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

                }

            }

        }
    }

    // return newLocalStorage
}
export async function attachtoFuncs_overModel_Add_vh2({ translate = null, model = null, dispatch = null, submodel = null, attacher = null, newLocalStorage = null, added = null, redux_localeuser }) {

    let inQuery = {}
    let inOperator = {}
    let attachtobinder = newLocalStorage.attachtobinder

    if (attacher.length > 0) {

        /* to get the latest attacher versions */
        inQuery = { _id: { "$in": attacher.map(item => item._id) }, }

        let attacher_freshlist = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })


        for (let eachattach of attacher_freshlist.payload) {

            // Prepare arrayofrefs formula
            let refs_formula = {
                model: submodel,
                position: eachattach[attachtobinder].length + 1,
                referenceID: added.payload._id,
                visible: added.payload.visible
            }
            let newChecked = [...eachattach[attachtobinder]]

            newChecked.push(refs_formula)

            if (submodel === 'blockstyle' && eachattach.lgbinder !== '') {
                inQuery = { lgbinder: { "$eq": eachattach.lgbinder }, }

            } else {
                inQuery = { _id: { "$eq": eachattach._id }, }

            }
            inOperator = { '$set': { [attachtobinder]: newChecked } }

            await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator })


            // await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })
            if (translate) {
                // If translate
                inQuery = {}
                Object.assign(inQuery, {
                    referenceID: { "$ne": redux_localeuser.referenceID._id },
                });
                let lglist = await plg_findMany({ model: 'language', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

                for (let eachlg of lglist.payload) {

                    /* find a brick in this language */

                    inQuery = {}
                    Object.assign(inQuery, {
                        language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                        country: { "$eq": eachlg.referenceID.alpha2Code },
                        lgbinder: { "$eq": eachattach.lgbinder }
                    });
                    let lgbound_attachee = await plg_findOne_QueMod({ model, dispatch, actionType: 'samestate', inQuery })

                    if (lgbound_attachee.payload !== '') {
                        /* find a slide in this language */

                        inQuery = {}
                        Object.assign(inQuery, {
                            language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                            country: { "$eq": eachlg.referenceID.alpha2Code },
                            lgbinder: { "$eq": added.payload.lgbinder }
                        });
                        let lgbound_grab = await plg_findOne_QueMod({ model: submodel, dispatch, actionType: 'samestate', inQuery })

                        if (lgbound_grab.payload !== '') {
                            // Find slide in that language
                            // Prepare arrayofrefs formula
                            let refs_formula_lgbound = {
                                model: submodel,
                                position: lgbound_attachee.payload[attachtobinder].length + 1,
                                referenceID: lgbound_grab.payload._id,
                                visible: lgbound_grab.payload.visible
                            }
                            let lgbound_newChecked = [...lgbound_attachee.payload[attachtobinder]]

                            lgbound_newChecked.push(refs_formula_lgbound)

                            inQuery = { _id: { "$eq": lgbound_attachee.payload._id }, }
                            inOperator = { '$set': { [attachtobinder]: lgbound_newChecked } }

                            await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

                        }

                    }

                }
            }
        }
    }

    return newLocalStorage
}

export async function attachtoFuncs_populateEdit_vh2({ found = null, model = null, dispatch = null, newLocalStorage = null, redux_localeuser }) {

    let attachtobinder = newLocalStorage.attachtobinder

    /* Find Bricks and populate filter them with reduce to only those that contain rootid */
    let inQuery = {
        [attachtobinder]: { "$elemMatch": { referenceID: { "$eq": found._id } } },
        language: redux_localeuser.referenceID.languages[0].iso639_1,
        country: redux_localeuser.referenceID.alpha2Code
    }
    let match = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })


    newLocalStorage.attachto[model] = match.payload

    return newLocalStorage

}

export async function attachtoFuncs_overModel_Edit_vh2({
    dispatch = null,
    current = null,
    updated = null,
    translate = null,
    model = null,
    submodel = null,
    attacher_updated_arr = null,
    newLocalStorage,
    redux_localeuser
}) {

    let attachtobinder = newLocalStorage.attachtobinder

    let inQuery = {
        [attachtobinder]: { "$elemMatch": { referenceID: { "$eq": current._id } } },
        country: { "$eq": redux_localeuser.referenceID.alpha2Code },
        language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 },
    }
    // =============
    // Jesli 


    let match = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })


    let attacher_current_arr = [...match.payload]
    let arrayCompare = await arraysStringifyEqualAsync(attacher_updated_arr, attacher_current_arr);

    if (!arrayCompare) {

        let attacher_updated_arr_ids = attacher_updated_arr.map(a => a._id)
        let attacher_current_arr_ids = attacher_current_arr.map(a => a._id)

        let overmodel_added_ids = attacher_updated_arr_ids.filter(x => !attacher_current_arr_ids.includes(x));

        let overmodel_removed_ids = attacher_current_arr_ids.filter(x => !attacher_updated_arr_ids.includes(x));

        if (overmodel_added_ids.length > 0) {
            /* Add */

            let attacherAdded_arr = attacher_updated_arr.reduce((accum, currentvalue) => {
                return overmodel_added_ids.includes(currentvalue._id) ? [...accum, currentvalue] : accum
            }, []);

            for (let atadded of attacherAdded_arr) {
                await add_overModel_Edit_vh2({
                    attachtobinder,
                    updated,
                    translate,
                    dispatch,
                    model,
                    submodel,
                    atadded
                })
            }

        }

        if (overmodel_removed_ids.length > 0) {

            /* Removal */
            let attacherRemoved_arr = attacher_current_arr.reduce((accum, currentvalue) => {
                return overmodel_removed_ids.includes(currentvalue._id) ?  [...accum, currentvalue] : accum
            }, []);

            for (let atremoved of attacherRemoved_arr) {
                await remove_overModel_Edit_vh2({
                    attachtobinder,
                    updated,
                    translate,
                    dispatch,
                    model,
                    submodel,
                    atremoved
                })
            }
        }

    }
}
