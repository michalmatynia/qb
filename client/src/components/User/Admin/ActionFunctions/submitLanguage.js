import { runPattern } from '../GenericCompos/format_table'
import {
    plg_findMany,
    plg_updateOne_queMod_oprMod
} from '../../../utils/Plugs/cms_plugs';
import { arraysEqualAsync, arraysStringifyEqualAsync } from '../../../utils/Funcs/array_funcs'
import { checkFuncs_addChecked_language_v2 } from '../../../User/Admin/GenericFuncs/check_funcs'
import { removeFuncs_languageContent_v2 } from '../../../User/Admin/GenericFuncs/remove_funcs'
import { messageCompleted, messageLoading } from '../../../User/Admin/GenericFuncs/errormsg_funcs'

export async function actionFuncs_submitLanguage({ cell = null, myprops = null, model = null, mystate = null, addToCollection = null, poliglot = null, populate = null }) {
    await messageLoading({ myprops })
    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    if (!poliglot) {
        poliglot = mystate.localStorage.poliglot
    }
    if (!model && 'model' in cellvalue.fillfields.value.fromconfig) {
        model = cellvalue.fillfields.value.fromconfig.model
    } else {
        model = mystate.localStorage.model
    }

    // === Extract Ids of prospected array of Reference
    let prospect_distinct_id_Arr = cellvalue.value.map((item) => {
        return runPattern({ column: cellvalue.fillfields.value.toconfig, item, indicator: '_id' })
    })

    // let prospect_distinct_id_Arr = cellvalue.value.map((item) => item._id)

    // FortToTable transfer settings
    let inQuery = {}

    if (poliglot) {
        Object.assign(inQuery, {
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
        });

    }

    let current

    let result = await plg_findMany({ model: addToCollection, myprops, actionType: 'samestate', inQuery, populate })
    current = result.payload

    // === Extract Ids of current array of Reference
    let current_distinct_id_Arr = current.map(a => {
        return runPattern({ column: cellvalue.fillfields.value.toconfig, item: a, indicator: '_id' })

    });

    // let current_distinct_id_Arr = current.map(a => a._id);

    let arraysAreEqual = await arraysEqualAsync(current_distinct_id_Arr, prospect_distinct_id_Arr);

    if (!arraysAreEqual) {

        let tagsRemoved = current_distinct_id_Arr.reduce((accum, currentvalue) => {
            return prospect_distinct_id_Arr.includes(currentvalue) ? accum : [...accum, currentvalue]
        }, []);

        let tagsAdded = prospect_distinct_id_Arr.reduce((accum, currentvalue) => {
            return current_distinct_id_Arr.includes(currentvalue) ? accum : [...accum, currentvalue]
        }, []);

        if (tagsAdded.length > 0) {

            let filteredValues = cellvalue.value.filter((item) => {
                return tagsAdded.includes(runPattern({ column: cellvalue.fillfields.value.toconfig, item: item, indicator: '_id' }))
                // return tagsAdded.includes(item._id)

            })

            // Filter
            let inInsert = filteredValues.map((item) => {

                let extractedID = runPattern({ column: cellvalue.fillfields.value.toconfig, item: item, indicator: '_id' })
                // let extractedID = item._id

                let newItem = { model: item.model, position: item.position, referenceID: extractedID, visible: item.visible }
                return newItem

            })

            await checkFuncs_addChecked_language_v2({ model, inInsert, added: filteredValues, cellvalue, mystate, myprops })

        } else if (tagsRemoved.length > 0) {

            await removeFuncs_languageContent_v2({ model, removed: tagsRemoved, mystate, myprops })

        }

    } else {
        // if only positions are changed
        let arrayCompare = await arraysStringifyEqualAsync(current, cellvalue.value);

        if (!arrayCompare) {

            for (let item of cellvalue.value) {

                inQuery = { _id: { "$eq": item._id }, }
                let inOperator = { '$set': { position: item.position } }

                    await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inOperator, inQuery })

            }
       
        }

    }
    await messageCompleted({ myprops })
    return []

}
