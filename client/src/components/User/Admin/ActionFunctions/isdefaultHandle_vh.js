import {
    plg_updateMany,
    plg_findOne_QueMod,
    plg_updateOne_queMod_oprMod,
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_isDefaultHandle_vh1({ cell = null, dispatch = null, model = null,added = null, current = null }) {

    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]
    let inQuery
    let inOperator

    if (added.payload.isdefault === true) {

        if (cellvalue.value === true) {

            // This needs to be enabled, because main page doesn't go through pre-input Funcs
            inQuery = {
                _id: { "$ne": added.payload._id },
            }
            inOperator = {
                "$set": { isdefault: false }
            }

            await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

        }

    } else  if (added.payload.isdefault === false && current) {
        // Create Condition for when isdefault is false and before it was true in Edit

        if (current.isdefault !== added.payload.isdefault) {

            if (added.payload.position === 1) {
                inQuery = { position: { "$eq": 2 }, }
            } else {
                inQuery = { position: { "$eq": 1 }, }
            }
            Object.assign(inQuery, {
                country: { "$eq": added.payload.country },
                language: { "$eq": added.payload.language }
            }
            )
            // find one in this language
            let found = await plg_findOne_QueMod({ model, dispatch, actionType: 'samestate', inQuery })

            inQuery = { position: { "$eq": found.payload.position } }

            if (added.payload.lgbinder !== '') {
                Object.assign(inQuery,
                    { lgbinder: { "$eq": found.payload.lgbinder } }
                )
            }
            inOperator = { '$set': { isdefault: true } }


            await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

            let updatedlist = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator, distinct: '_id' })

            inQuery = { _id: { "$nin": updatedlist.payload }, }
            inOperator = { '$set': { isdefault: false } }
            await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

            // =================    
        }
    }


}

// export async function actionFuncs_isDefaultOnRemove({ poliglot = null, removeall = null, value = null, myprops = null, model = null, mystate = null }) {
//     let inQuery = {}
//     let inOperator = {}

//     if (value.isdefault) {
//         if (value.position === 1) {
//             inQuery = { position: { "$eq": 2 }, }
//         } else {
//             inQuery = { position: { "$eq": 1 }, }
//         }

//         if (poliglot) {
//             inQuery = Object.assign(inQuery, {
//                 country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
//                 language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
//             });
//         }

//         inOperator = { '$set': { isdefault: true } }

//         await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inOperator, inQuery })
//         /// UpdateMany
//         // Doesn't work if I remove just one

//         // if removeall is true
//         // loop through language list

//         if (value.lgbinder !== '' && removeall) {

//             let lglist = await plg_findMany({ mystate, model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })
//             for (const eachlg of Object.values(lglist.payload)) {
//                 inQuery = {
//                     isdefault: { "$eq": true },
//                 }

//                 inQuery = Object.assign(inQuery, {
//                     country: { "$eq": eachlg.referenceID.alpha2Code },
//                     language: { "$eq": eachlg.referenceID.languages[0].iso639_1 }
//                 });

//                 let found = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

//                 if (found.payload !== '' && found.payload.lgbinder === value.lgbinder) {
//                     if (found.payload.position === 1) {
//                         inQuery = { position: { "$eq": 2 }, }
//                     } else {
//                         inQuery = { position: { "$eq": 1 }, }
//                     }

//                     inQuery = Object.assign(inQuery, {
//                         country: { "$eq": eachlg.referenceID.alpha2Code },
//                         language: { "$eq": eachlg.referenceID.languages[0].iso639_1 }
//                     });

//                     inOperator = { '$set': { isdefault: true } }

//                     await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inOperator, inQuery })

//                 } else {
//                     inQuery = { position: { "$eq": 1 }, }

//                     inOperator = { '$set': { isdefault: true } }

//                     await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inOperator, inQuery })
//                 }

//                 // If the result is found and it's lgbinder is equal to updated lgbinder
//                 // 
//             }

//         }

//     }

// }