
import { arraysStringifyEqualAsync } from '../../../utils/Funcs/array_funcs'

import {
    plg_findMany,
    plg_updateOne_queMod_oprMod,
    plg_findOne_QueMod
} from '../../../utils/Plugs/cms_plugs';


export async function attachtoFuncs_overModel_Add({ translate = null, model = null, submodel = null, myprops = null, mystate = null, attacher = null, newLocalStorage = null, added = null }) {

    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }
    let inQuery = {}
    let inOperator = {}

    if (attacher.length > 0) {

        /* to get the latest attacher versions */
        inQuery = { _id: { "$in": attacher.map(item => item._id) }, }

        let attacher_freshlist = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery})

        for (let eachattach of attacher_freshlist.payload) {

            // Prepare arrayofrefs formula
            let refs_formula = {
                model: submodel,
                position: eachattach.checked.length + 1,
                referenceID: added.payload._id,
                visible: added.payload.visible
            }
            // each.checked.push(formula)
            let newChecked = [...eachattach.checked]

            newChecked.push(refs_formula)

            inQuery = { _id: { "$eq": eachattach._id }, }
            inOperator = { '$set': { checked: newChecked } }

            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator })
            if (translate) {
                // If translate
                inQuery = {}
                Object.assign(inQuery, {
                    referenceID: { "$ne": myprops.user.localeUser.referenceID._id },
                });
                let lglist = await plg_findMany({ model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

                for (let eachlg of lglist.payload) {

                    /* find a brick in this language */

                    inQuery = {}
                    Object.assign(inQuery, {
                        language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                        country: { "$eq": eachlg.referenceID.alpha2Code },
                        lgbinder: { "$eq": eachattach.lgbinder }
                    });
                    let lgbound_attachee = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                    if (lgbound_attachee.payload !== '') {
                        /* find a slide in this language */

                        inQuery = {}
                        Object.assign(inQuery, {
                            language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                            country: { "$eq": eachlg.referenceID.alpha2Code },
                            lgbinder: { "$eq": added.payload.lgbinder }
                        });
                        let lgbound_grab = await plg_findOne_QueMod({ model: submodel, myprops, actionType: 'samestate', inQuery })

                        if (lgbound_grab.payload !== '') {
                            // Find slide in that language
                            // Prepare arrayofrefs formula
                            let refs_formula_lgbound = {
                                model: submodel,
                                position: lgbound_attachee.payload.checked.length + 1,
                                referenceID: lgbound_grab.payload._id,
                                visible: lgbound_grab.payload.visible
                            }
                            // each.checked.push(formula)
                            let lgbound_newChecked = [...lgbound_attachee.payload.checked]

                            lgbound_newChecked.push(refs_formula_lgbound)

                            inQuery = { _id: { "$eq": lgbound_attachee.payload._id }, }
                            inOperator = { '$set': { checked: lgbound_newChecked } }

                            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator })

                        }

                    }

                }
            }
        }
    }

    return newLocalStorage
}

export async function attachtoFuncs_populateEdit({ found = null, model = null, myprops = null, newLocalStorage = null }) {
    let inQuery = {
        checked: { "$elemMatch": { referenceID: { "$eq": found._id } } }
    }
    let match = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })
    newLocalStorage.attachto[model] = match.payload
    // Find Bricks and populate filter them with reduce to only those that contain rootid

    return newLocalStorage

}

export async function attachtoFuncs_overModel_Edit_v2({ current = null, updated = null, translate = null, model = null, submodel = null, myprops = null, mystate = null, attacher_updated_arr = null, newLocalStorage = null, added = null }) {

    let inOperator
    let inParams
    let inQuery = {
        checked: { "$elemMatch": { referenceID: { "$eq": current._id } } }
    }
    let match = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

    let attacher_current_arr = [...match.payload]
    let arrayCompare = await arraysStringifyEqualAsync(attacher_updated_arr, attacher_current_arr);

    if (!arrayCompare) {
        if (attacher_updated_arr.length > attacher_current_arr.length) {
            /* Add */

            let attacherAdded_arr = attacher_updated_arr.reduce((accum, currentvalue) => {
                return attacher_current_arr.find(item => item._id === currentvalue._id) ? accum : [...accum, currentvalue]
            }, []);

            if (attacherAdded_arr.length > 0) {
                for (let atadded of attacherAdded_arr) {

                    if (translate) {
                        inQuery = {}
                        let lglist = await plg_findMany({ mystate, model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

                        for (const eachlg of lglist.payload) {

                            // ==============================
                            /* find  brick in this language */
                            inQuery = {}
                            Object.assign(inQuery, {
                                language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                                country: { "$eq": eachlg.referenceID.alpha2Code },
                                lgbinder: { "$eq": atadded.lgbinder }
                            });

                            let lgbound_attachee = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })
                            if (lgbound_attachee.payload !== '') {
                                /* find a slide in this language */

                                inQuery = {}
                                Object.assign(inQuery, {
                                    language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                                    country: { "$eq": eachlg.referenceID.alpha2Code },
                                    lgbinder: { "$eq": updated.lgbinder }
                                });
                                let lgbound_grab = await plg_findOne_QueMod({ model: submodel, myprops, actionType: 'samestate', inQuery })

                                if (lgbound_grab.payload !== '') {
                                    /* Prepare arrayofrefs formula */
                                    let refs_formula_lgbound = {
                                        model: submodel,
                                        position: lgbound_attachee.payload.checked.length + 1,
                                        referenceID: lgbound_grab.payload._id,
                                        visible: lgbound_grab.payload.visible
                                    }
                                    let lgbound_newChecked = [...lgbound_attachee.payload.checked]

                                    lgbound_newChecked.push(refs_formula_lgbound)

                                    inQuery = { _id: { "$eq": lgbound_attachee.payload._id }, }
                                    inOperator = { '$set': { checked: lgbound_newChecked } }
                                    await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator })

                                }

                            }

                        }

                    } else {

                        let refs_formula = {
                            model: submodel,
                            position: atadded.checked.length + 1,
                            referenceID: updated._id,
                            visible: updated.visible
                        }
                        let newChecked = [...atadded.checked]

                        newChecked.push(refs_formula)

                        inQuery = { _id: { "$eq": atadded._id }, }
                        inOperator = { '$set': { checked: newChecked } }

                        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator })
                    }
                }
            }

        } else if (attacher_updated_arr.length < attacher_current_arr.length) {

            /* Removal */
            let attacherRemoved_arr = attacher_current_arr.reduce((accum, currentvalue) => {
                return attacher_updated_arr.find(item => item._id === currentvalue._id) ? accum : [...accum, currentvalue]
            }, []);

            if (attacherRemoved_arr.length > 0) {

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

                            let lgbound_overmod = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                            if (lgbound_overmod.payload !== '') {

                                inQuery = {}
                                Object.assign(inQuery, {
                                    language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                                    country: { "$eq": eachlg.referenceID.alpha2Code },
                                    lgbinder: { "$eq": updated.lgbinder }
                                });
                                let lgbound_undermod = await plg_findOne_QueMod({ model: submodel, myprops, actionType: 'samestate', inQuery })


                                if (lgbound_undermod.payload !== '') {
                                    let counter = 1
                                    let newChecked = [...lgbound_overmod.payload.checked]
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
                                        "$set": { checked: newChecked }
                                    }

                                    await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

                                }

                            }

                        }
                    } else {

                        let counter = 1
                        let newChecked = [...atremoved.checked]
                        newChecked.sort(function (a, b) {
                            return a.position - b.position;
                        });

                        newChecked = newChecked.reduce((accum, currentvalue, CurrentIndex) => {

                            if (currentvalue.referenceID !== updated._id) {

                                accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID, position: counter, visible: currentvalue.visible }]
                                counter++

                            } else { accum = [...accum] }

                            return accum

                        }, []);


                        inQuery = {
                            _id: { "$eq": atremoved._id },
                        }
                        inOperator = {
                            "$set": { checked: newChecked }
                        }

                        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })
                    }
                }
            }
        }


    }
    // Create Attacher current
}
