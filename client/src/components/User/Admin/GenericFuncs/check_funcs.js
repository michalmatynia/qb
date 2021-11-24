import { submitFuncs_fullSubmit } from './submit_funcs'
import { taxoFuncs_mirrorAdded } from './taxo_funcs'
import { runPattern } from '../GenericCompos/format_table'

import {
    plg_findMany,
    plg_findOne_QueMod,
    // plg_insertMany_ModMod,
    plg_create_oprMod
} from '../../../utils/Plugs/cms_plugs';
import {
    reposFuncs_whenAdded
} from './repos_funcs'

export function indexOf(arr, val, comparer) {
    for (let i = 0, len = arr.length; i < len; ++i) {
        if (i in arr && comparer(arr[i], val)) {
            return i;
        }
    }
    return -1;
}

export async function checkFuncs_handleRemove_Brick({ cell, mystate = null, value = null, newLocalStorage }) {
    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    let oldChecked = [...cellvalue.value]

    let newChecked = oldChecked.reduce((accum, currentvalue) => {

        let currentvalueID = runPattern({ column: cellvalue.fillfields.value.toconfig, item: currentvalue, indicator: '_id' })
        let valueID = runPattern({ column: cellvalue.fillfields.value.toconfig, item: value, indicator: '_id' })

        if (valueID === currentvalueID) {
            return accum
        } else if (currentvalue.position > value.position) {

            currentvalue.position = currentvalue.position - 1

            return [...accum, currentvalue]
        }
        else {
            return [...accum, currentvalue]
        }


    }, []);

    newLocalStorage['form']['formdata'][cellkey].value = newChecked

    return newLocalStorage


}
export async function checkFuncs_addChecked_language_v2({ model, myprops, inInsert, mystate, added, cellvalue }) {

    for (let eachlg of inInsert) {
        let addedlg = await plg_create_oprMod({ model, myprops, actionType: 'samestate', inInsert: eachlg })

        // Synchronize positions for each added language (don't worry about the "removed" argument)

        await reposFuncs_whenAdded({ myprops, added: addedlg, model, mystate })

    }

    let deflanguage = { ...myprops.mysite.CurrentMysite.default_language }

    let modelArray = mystate.localStorage.linguistic.modelArray

    for (let modelvalue of modelArray) {
        console.log('translating ' + modelvalue);
        // Find Slides / Product in Default Language
        let inQuery
        inQuery = {
            country: { "$eq": deflanguage.referenceID.alpha2Code },
            language: { "$eq": deflanguage.referenceID.languages[0].iso639_1 },
        }

        let contentinlg = await plg_findMany({ model: modelvalue, actionType: 'samestate', myprops, inQuery })


        let addedTranslatedCollection = []

        // mystate.localStorage.linguistic.translate = ['name', 'description']
        for (const eachpart of added) {
            /* For Every Language */

            for (const rootcontent of contentinlg.payload) {
                /* Check  if content to be added is already there */

                let founddupe

                inQuery = {
                    language: { "$eq": eachpart.referenceID.languages[0].iso639_1 },
                    country: { "$eq": eachpart.referenceID.alpha2Code },
                }

                if (rootcontent.lgbinder === '') {
                    Object.assign(inQuery, { lgbinder: { "$eq": rootcontent._id } })
                } else {
                    Object.assign(inQuery, { lgbinder: { "$eq": rootcontent.lgbinder } })
                }

                founddupe = await plg_findOne_QueMod({ model: modelvalue, myprops, actionType: 'samestate', inQuery })

                if (founddupe.payload === '') {
                    let addedTranslated = await submitFuncs_fullSubmit({
                        model: modelvalue,
                        myprops,
                        mystate,
                        prospect: rootcontent,
                        current: rootcontent,
                        source_lg: deflanguage.referenceID.languages[0].iso639_1,
                        target_lg: eachpart.referenceID.languages[0].iso639_1,
                        language: eachpart.referenceID.languages[0].iso639_1,
                        country: eachpart.referenceID.alpha2Code
                    })


                    if (modelvalue === 'taxonomy') {
                        // This is used for taxonomy mirroring
                        addedTranslatedCollection.push(addedTranslated.payload)
                    }
                }
            }

            if (modelvalue === 'taxonomy') {

                for (const eachTranslated of Object.values(addedTranslatedCollection)) {
                    await taxoFuncs_mirrorAdded({ model: modelvalue, myprops, mystate, insert: eachTranslated, country: eachpart.referenceID.alpha2Code, language: eachpart.referenceID.languages[0].iso639_1, form: 'tagparent' })
                    await taxoFuncs_mirrorAdded({ model: modelvalue, myprops, mystate, insert: eachTranslated, country: eachpart.referenceID.alpha2Code, language: eachpart.referenceID.languages[0].iso639_1, form: 'tagchild' })
                }
            }
        }
    }
    return null

}
