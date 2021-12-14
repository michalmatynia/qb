import {
    plg_findMany,
    plg_findOne_QueMod,
    plg_updateOne_queMod_oprMod
} from '../../../utils/Plugs/cms_plugs';
import { submitFuncs_fullSubmit_vh2 } from './submit_funcs_vh'
import { actionFuncs_populateArrayOfRefsForDb_vh2 } from '../ActionFunctions/handleArrayOfRefs_vh'
import { actionFuncs_recalculateOnWall } from '../ActionFunctions/recalculatePrice'

export async function brickFuncs_populateMultimodelWithQty_preInput_vh1({ dispatch, language = null, country = null, prospect = null, poliglot = null, models = null, target_lg, source_lg, isLocalStorage, redux_current_mysite }) {

    let inQuery
    let newChecked = []
    let grabbed_content_array = []

    if (prospect.checked.length > 0) {
        /* prospect has unpopulated ['checked'] field. It needs to be populated */

        let checked_populated = await actionFuncs_populateArrayOfRefsForDb_vh2({ dispatch, getlist: prospect['checked'], populate: [{ path: 'referenceID' }], mypath: 'referenceID', poliglot, language, country })

        for (let submodel of models) {
            /* I have to use mystate, because it has popualted values, no need for another call to DB */
            let filteredsubs = checked_populated.filter(sub => sub.model === submodel)
            if (filteredsubs.length > 0) {

                let my_sub_checked_array = filteredsubs.map(a => a.referenceID)
                // all the attached slides in the arrayofrefs form

                for (let each_checked of my_sub_checked_array) {

                    inQuery = {
                        country: { "$eq": country },
                        language: { "$eq": language },
                        lgbinder: { "$eq": each_checked.lgbinder }
                    }
                    let found_content = await plg_findOne_QueMod({ model: submodel, dispatch, actionType: 'samestate', inQuery })

                    /* if checked is found in a given language */

                    if (found_content.payload !== '') {
                        grabbed_content_array.push(found_content.payload)
                    } else {

                        // Nie powinien tworzyc, one powinny byc juz przetlumaczone
                        /* if no checked is found */
                        let added = await submitFuncs_fullSubmit_vh2({
                            model: submodel,
                            current: each_checked,
                            prospect: each_checked,
                            source_lg,
                            target_lg: language,
                            language, 
                            country,
                            dispatch,
                            isLocalStorage,
                            redux_current_mysite,
                            poliglot: isLocalStorage.poliglot

                        })

                        grabbed_content_array.push(added.payload)

                    }

                }

                /// ===============
                for (let rootvalue of grabbed_content_array) {
                    let foundIndexToPopulate = checked_populated.findIndex((item) => { return item.referenceID.lgbinder === rootvalue.lgbinder })

                    if (foundIndexToPopulate !== -1) {

                        newChecked.push(
                            {
                                model: submodel,
                                position: prospect.checked[foundIndexToPopulate].position,
                                referenceID: rootvalue,
                                quantity: rootvalue.quantity
                            }
                        )
                    }

                }

            }

        }

        newChecked.sort(function (a, b) {
            return a.position - b.position;
        });

        let counter = 1
        newChecked = newChecked.reduce((accum, currentvalue, CurrentIndex) => {


            if (typeof (currentvalue.referenceID) === 'string') {
                return [...accum]

            } else if (currentvalue.position !== counter) {
                accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID._id, position: counter, quantity: currentvalue.quantity }]
                counter = counter + 1

            } else {

                accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID._id, position: currentvalue.position, quantity: currentvalue.quantity }]
                counter = counter + 1

            }
            return accum

        }, []);
        return newChecked
    } else {
        return []
    }
}
export async function brickFuncs_populateMultimodel_preInput_vh1({ 
    dispatch, 
    isLocalStorage, 
    redux_current_mysite, 
    prospect = null, 
    language = null, 
    country = null, 
    poliglot = null, 
    target_lg, 
    source_lg 
}) {

    let inQuery
    let newChecked = []
    let grabbed_content_array = []

    if (prospect.checked.length > 0) {
        /* prospect has unpopulated ['checked'] field. It needs to be populated */

        let checked_populated = await actionFuncs_populateArrayOfRefsForDb_vh2({ dispatch, getlist: prospect['checked'], populate: [{ path: 'referenceID' }], mypath: 'referenceID', poliglot, language, country })


        let checked_models = [...new Set(checked_populated.map(sub => sub.model))]; // ES6 method

            for (let submodel of checked_models) {

                let filteredsubs = checked_populated.filter(sub => sub.model === submodel)

                let my_sub_checked_array = filteredsubs.map(a => a.referenceID)

                for (let each_checked of my_sub_checked_array) {

                    inQuery = {
                        country: { "$eq": country },
                        language: { "$eq": language },
                        lgbinder: { "$eq": each_checked.lgbinder }
                    }
                    let found_content = await plg_findOne_QueMod({ model: submodel, dispatch, actionType: 'samestate', inQuery })
                    /* if checked is found in a given language */

                    if (found_content.payload !== '') {
                        grabbed_content_array.push(found_content.payload)
                    } else {

                        // Nie powinien tworzyc, one powinny byc juz przetlumaczone
                        /* if no checked is found */


                        let added = await submitFuncs_fullSubmit_vh2({
                            model: submodel,
                            current: each_checked,
                            prospect: each_checked,
                            source_lg,
                            target_lg: language,
                            language, 
                            country,
                            dispatch,
                            isLocalStorage,
                            redux_current_mysite,
                            poliglot: isLocalStorage.poliglot

                        })
                        grabbed_content_array.push(added.payload)

                    }
                }

            }

            for (let rootvalue of grabbed_content_array) {
                let foundIndexToPopulate = checked_populated.findIndex((item) => { return item.referenceID.lgbinder === rootvalue.lgbinder })

                if (foundIndexToPopulate !== -1) {

                    newChecked.push(
                        {
                            model: prospect.checked[foundIndexToPopulate].model,
                            position: prospect.checked[foundIndexToPopulate].position,
                            referenceID: rootvalue,
                            visible: prospect.checked[foundIndexToPopulate].visible
                        }
                    )
                }

            }
            // ================= 
            newChecked.sort(function (a, b) {
                return a.position - b.position;
            });
    
            let counter = 1
    
            newChecked = newChecked.reduce((accum, currentvalue, CurrentIndex) => {
    
                if (typeof (currentvalue.referenceID) === 'string') {
                    return [...accum]
    
                } else if (currentvalue.position !== counter) {
                    accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID._id, position: counter, visible: currentvalue.visible }]
                    counter = counter + 1
    
                } else {
    
                    accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID._id, position: currentvalue.position, visible: currentvalue.visible }]
                    counter = counter + 1
    
                }
                return accum
    
            }, []);
            return newChecked
            // ================= 
    } else {
        return []
    }
}
export async function brickFuncs_removeBrickSubs_vh1({ dispatch = null,  removed = null, model = null }) {

    let inQuery
    let inOperator

    // Deep array, find _id in array within an object
    inQuery = {
        checked: { "$elemMatch": { referenceID: { "$eq": removed._id } } }

    }
    let brickstoupdate = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })

    for (let value of brickstoupdate.payload) {

        let indexToRemove = value['checked'].findIndex((item) => { return item.referenceID === removed._id })

        if (indexToRemove !== -1) {
            value.checked = value.checked.reduce((accum, currentvalue) => {

                if (currentvalue.referenceID === removed._id) {
                    return accum
                } else if (currentvalue.position > value.checked[indexToRemove].position) {

                    currentvalue.position = currentvalue.position - 1

                    return [...accum, currentvalue]
                }

                else {
                    return [...accum, currentvalue]
                }

            }, []);

            inQuery = { _id: { "$eq": value._id } }
            inOperator = { '$set': value }

            await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })
        }
    }

}
export async function wallFuncs_populatePage_v2({ tiedtoformkey = null, current_mysite = null, currencyuser = null, current = null, dispatch = null, submodel_collection = [], localeuser = null }) {

    // If detail Page is not present

}
export async function wallFuncs_populatePage({ tiedtoformkey = null, current_mysite = null, currencyuser = null, current = null, dispatch = null, submodel_collection = [], localeuser = null }) {
    // the are differences between this and preInput, maninly this funciton focuses on reading _id not lgbinder
    let inQuery
    let newChecked = []
    let brickNewChecked = []

    if (current[tiedtoformkey].length > 0) {

        let brick_ids = current[tiedtoformkey].map(a => a.referenceID)

        inQuery = {
            _id: { "$in": brick_ids }
        }
        let found_bricks = await plg_findMany({ model: 'brick', dispatch, actionType: 'samestate', inQuery })

        for (let eachbrick of found_bricks.payload) {
            brickNewChecked = []

            for (let submodel of submodel_collection) {

                let filteredsubs = eachbrick['checked'].filter(sub => sub.model === submodel)

                if (filteredsubs.length > 0) {

                    let mySublgbinder = filteredsubs.map(a => a.referenceID)

                    inQuery = {
                        // country: { "$eq": country },
                        // language: { "$eq": language },
                        _id: { "$in": mySublgbinder }
                    }

                    // Extract Slides / Products
                    let translatedSub = await plg_findMany({ model: submodel, dispatch, actionType: 'samestate', inQuery })

                    for (let rootvalue of translatedSub.payload) {

                        /* Product Price Recalculator */
                        if (submodel === 'product') {

                            rootvalue['price'] = await actionFuncs_recalculateOnWall({
                                rootvalue, submodel, dispatch, current_mysite, currencyuser, localeuser
                            })
                        }

                        let foundIndexToPopulate = eachbrick['checked'].findIndex((item) => { return item.referenceID === rootvalue._id })

                        if (foundIndexToPopulate !== -1) {

                            brickNewChecked.push(
                                {
                                    model: submodel,
                                    position: eachbrick['checked'][foundIndexToPopulate].position,
                                    referenceID: rootvalue,
                                    visible: eachbrick['checked'][foundIndexToPopulate].visible
                                }
                            )
                        }

                    }

                }

            }

            eachbrick['checked'] = brickNewChecked

            // ================
            // create Populated Brick Array
            let foundIndexToPopulate = current[tiedtoformkey].findIndex((item) => { return item.referenceID === eachbrick._id })

            if (foundIndexToPopulate !== -1) {

                newChecked.push(
                    {
                        model: current[tiedtoformkey][foundIndexToPopulate].model,
                        position: current[tiedtoformkey][foundIndexToPopulate].position,
                        referenceID: eachbrick,
                        visible: current[tiedtoformkey][foundIndexToPopulate].visible
                    }
                )
            }

        }

        newChecked.sort(function (a, b) {
            return a.position - b.position;
        });

        return newChecked
    } else {

        return []
    }
}