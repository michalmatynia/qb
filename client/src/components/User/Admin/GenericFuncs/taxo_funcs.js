import {
    plg_findOne_QueMod,
    plg_updateOne_queMod_oprMod,
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';
import { submitFuncs_fullSubmit } from './submit_funcs'
import { arraysEqualAsync } from '../../../utils/Funcs/array_funcs'
import { taxoFuncs_sub_removeLoopTags, taxoFuncs_sub_addLoopTags } from './taxo_sub_funcs'

export async function taxoFuncs_onChangeTaxoSync({ cell = null, mystate = null, myprops = null, model = null }) {

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    let newLocalStorage = { ...mystate.localStorage }
    let inQuery
    let combinedTags_Arr
    let uniqueCombinedTags_Arr

    // SET VALUE SOURCE
    newLocalStorage['form']['formdata'][cellkey] = cellvalue

    // SET VALUE TARGET
    if (cellvalue.value.length > 0) {

        // Get tags from taxonomies and flatten them
        let uniqueExtractTags_Arr = await taxoFuncs_editSyncFiltertags({ tags: cellvalue.value })

        combinedTags_Arr = [...cellvalue.filterfield.value, ...uniqueExtractTags_Arr]

        // Check for duplicates
        uniqueCombinedTags_Arr = combinedTags_Arr.reduce((accum, currentvalue) => {
            return accum.find(obj => obj.name === currentvalue.name) ? accum : [...accum, currentvalue]
        }, []);

        newLocalStorage['form']['formdata'][cellkey]['filterfield'].value = uniqueCombinedTags_Arr
    }

    // SET OPTIONS
    if (cellvalue.filterfield.value.length > 0) {


        inQuery = {
            _id: { "$ne": myprops.match.params.id ? myprops.match.params.id : null },
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 },
            "$or": [{ typetagmain: { "$in": cellvalue.filterfield.value } }, { typetagmain: [] }],

        }


    } else if (cellvalue.filterfield.value.length === 0) {

        inQuery = {
            _id: { "$ne": myprops.match.params.id ? myprops.match.params.id : null },
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 },
        }

    }

    let response = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

    newLocalStorage['form']['formdata'][cellkey].config.options = response.payload

    return newLocalStorage

}
export async function taxoFuncs_onRemoveTaxoSync_v2({ cell = null, mystate = null, myprops = null, model = null }) {

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    let newLocalStorage = { ...mystate.localStorage }
    let inQuery
    let combinedTags_Arr
    let uniqueCombinedTags_Arr

    if (cellvalue.value.length > 0) {

        // SET VALUE

        // FILTER cellkey value on the basis of available  FILTERS
        let filteredTaxo_Arr = cellvalue.value.reduce((accum, currentvalue) => {

            // This is to account for taxonomies with empty filters
            if (currentvalue.typetagmain.length > 0) {
                return currentvalue.typetagmain.find(item => {
                    return cellvalue.filterfield.value.find(obj => obj.name === item.name) ? true : false

                }) ? [...accum, currentvalue] : accum
            } else {
                return [...accum, currentvalue]
            }

        }, []);


        newLocalStorage['form']['formdata'][cellkey].value = filteredTaxo_Arr

        // ===================== SET UP FILTERS
        // // Get tags from taxonomies and flatten them
        let uniqueExtractTags_Arr = await taxoFuncs_editSyncFiltertags({ tags: filteredTaxo_Arr })

        combinedTags_Arr = [...uniqueExtractTags_Arr]

        // // Check for duplicates
        uniqueCombinedTags_Arr = combinedTags_Arr.reduce((accum, currentvalue) => {
            return accum.find(obj => obj.name === currentvalue.name) ? accum : [...accum, currentvalue]
        }, []);

        newLocalStorage['form']['formdata'][cellkey]['filterfield'].value = uniqueCombinedTags_Arr

    } else if (cellvalue.value.length === 0) {

        // Ponizsza opcja powoduje ze po usunieciu values zostaje ostatni filtr - nie wiem jeszcze czy tego chce
        // uniqueCombinedTags_Arr = [...cellvalue.filterfield.value]

        newLocalStorage['form']['formdata'][cellkey]['filterfield'].value = []
        uniqueCombinedTags_Arr = []

    }

    // SET OPTIONS
    if (uniqueCombinedTags_Arr.length > 0) {

        inQuery = {
            _id: { "$ne": myprops.match.params.id ? myprops.match.params.id : null },
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 },
            "$or": [{ typetagmain: { "$in": uniqueCombinedTags_Arr } }, { typetagmain: [] }],
        }


    } else if (uniqueCombinedTags_Arr.length === 0) {

        inQuery = {
            _id: { "$ne": myprops.match.params.id ? myprops.match.params.id : null },
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 },
        }

    }

    let response = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

    newLocalStorage['form']['formdata'][cellkey].config.options = response.payload

    return newLocalStorage

}
export async function taxoFuncs_addTag({ language = null, country = null, model = null, mystate = null, myprops = null, tagcollection = null, source_lg = null, target_lg = null }) {

    let inQuery

    let tagArray = []
    inQuery = {
        _id: { "$in": tagcollection }
    }

    let tagAssets = await plg_findMany({ mystate, model, myprops, actionType: 'samestate', inQuery })

    for (let tagItem of Object.values(tagAssets.payload)) {

        // Additional Check for duplicates - because submitFuncs_fullSubmit goes deep into creation, which can result in duplicates
        if (tagItem.lgbinder === '') {
            inQuery = {
                language: {
                    "$eq": language
                },
                country: {
                    "$eq": country
                },
                lgbinder: {
                    "$eq": tagItem._id
                }
            }

        } else {
            inQuery = {
                language: {
                    "$eq": language
                },
                country: {
                    "$eq": country
                },
                lgbinder: {
                    "$eq": tagItem.lgbinder
                }
            }

        }
        let founddupe = await plg_findOne_QueMod({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery })

        if (founddupe.payload === '') {
            let createdTag = await submitFuncs_fullSubmit({
                model,
                myprops,
                mystate,
                current: tagItem,
                prospect: tagItem,
                source_lg,
                target_lg,
                language,
                country
            })

            if (createdTag.payload._id) { tagArray.push(createdTag.payload._id) }

        } else {

            if (founddupe.payload._id) {
                tagArray.push(founddupe.payload._id)

            }
        }

    }


    return tagArray
}

export async function taxoFuncs_removeSubtags_v2({ myprops = null, removed = null, model = null, mystate = null }) {

    let inQuery
    let inOperator

    inQuery = {
        "$or": [{ tagparent: removed.payload._id }, { tagchild: removed.payload._id }],
        country: { "$eq": removed.payload.country },
        language: { "$eq": removed.payload.language },
    }

    let listWithTag = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

    if (Object.keys(listWithTag.payload).length > 0) {

        let idtoremove = removed.payload._id

        for (let value of Object.values(listWithTag.payload)) {

            let resultparent = value.tagparent.filter((item, index) => {
                return item !== idtoremove
            });
            let resultchild = value.tagchild.filter((item, index) => {
                return item !== idtoremove
            });

            if (resultparent !== value.tagparent) {
                inQuery = { _id: { "$eq": value._id } }
                inOperator = { '$set': { tagparent: resultparent, tagchild: resultchild } }

                await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator })

            }

        }
    }

}
// This function takes all the tags from tagparent/tag child and flattens its typetagmain to extract the types of taxonomy
export async function taxoFuncs_editSyncFiltertags({ tags = null }) {

    let extractfiltertags = tags.map(a => a.typetagmain)

    let extractfiltertagsflat = extractfiltertags.flat()

    let uniqueExtractFilterTags_Arr = extractfiltertagsflat.reduce((accum, currentvalue) => {

        return accum.find(obj => obj.name === currentvalue.name) ? accum : [...accum, currentvalue]

    }, []);

    return uniqueExtractFilterTags_Arr

}
export async function taxoFuncs_setTaxonomyTags_v2({ myprops = null, insert = null, model = null, mystate = null, source_lg = null, target_lg = null, language = null, country = null, current = null, key = null }) {
    let inQuery
    let inOperator
    let inParams
    let output = null

    if (current[key].length > 0) {
        let newtagCollection

        newtagCollection = await taxoFuncs_addTag({ source_lg, target_lg, tagcollection: current[key], language, country, model, myprops, mystate })

        inQuery = {
            _id: { "$eq": insert._id }
        }

        inOperator = {
            "$set": { [key]: newtagCollection }
        }
        inParams = { new: true }

        output = await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })
    }
    return output

}

export async function taxoFuncs_syncTaxoAcross({ model = null, myprops = null, mystate = null, updated = null, current = null, language = null, country = null, source_lg = null, target_lg = null }) {
    let inQuery
    let inOperator
    let inParams

    if (updated.typetagmain !== current.typetagmain) {
        inQuery = {
            country: { "$eq": country },
            language: { "$eq": language },
            lgbinder: { "$eq": updated.lgbinder }
        }

        inOperator = {
            "$set": { typetagmain: updated.typetagmain }
        }
        inParams = { new: true }

        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

    }
    if (updated.tagparent !== current.tagparent) {
        let newtags = await taxoFuncs_addTag({ source_lg, target_lg, tagcollection: updated.tagparent, language, country, model, myprops, mystate })

        inQuery = {
            country: { "$eq": country },
            language: { "$eq": language },
            lgbinder: { "$eq": updated.lgbinder }
        }

        inOperator = {
            "$set": { tagparent: newtags }
        }
        inParams = { new: true }

        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })
    }
    if (updated.tagchild !== current.tagchild) {
        let newtags = await taxoFuncs_addTag({ source_lg, target_lg, tagcollection: updated.tagchild, language, country, model, myprops, mystate })
        inQuery = {
            country: { "$eq": country },
            language: { "$eq": language },
            lgbinder: { "$eq": updated.lgbinder }
        }

        inOperator = {
            "$set": { tagchild: newtags }
        }
        inParams = { new: true }
        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

    }
}

/* Adds the relation between tags of parent and child */
export async function taxoFuncs_mirrorAdded({ mystate = null, myprops = null, model = null, insert = null, country = null, language = null, form = null }) {
    let inQuery
    let inOperator
    let inParams

    let revform = form === 'tagparent' ? 'tagchild' : 'tagparent'

    inQuery = {
        _id: { "$in": insert[form] },
        country: { "$eq": country },
        language: { "$eq": language },
    }

    let response = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

    if (Object.values(response.payload).length > 0) {

        for (const value of Object.values(response.payload)) {

            let MirrorTags_distinct_id = value[revform].map(a => a._id);

            let MirrorTags_Arr = [...MirrorTags_distinct_id]
            let combinedMirrorTags_Arr

            if (MirrorTags_Arr.includes(insert._id)) {
                combinedMirrorTags_Arr = [...MirrorTags_Arr]
            } else {
                combinedMirrorTags_Arr = [...MirrorTags_Arr, insert._id]
            }

            inQuery = {
                _id: { "$eq": value._id },
            }
            inOperator = {
                "$set": { [revform]: combinedMirrorTags_Arr }
            }

            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

        }
    }
}
export async function taxoFuncs_mirrorEditCreate({ mystate = null, myprops = null, model = null, current = null, updated = null, form = null }) {
    let inQuery
    // let inOperator
    // let inParams

    let current_distinct_id_Arr = [...current[form].map(a => a._id)];
    let updated_distinct_id_Arr = [...updated[form].map(a => a._id)];


    let arraysAreEqual = await arraysEqualAsync(current_distinct_id_Arr, updated_distinct_id_Arr);

    if (!arraysAreEqual) {

        let tagsRemoved = current_distinct_id_Arr.reduce((accum, currentvalue) => {
            return updated_distinct_id_Arr.includes(currentvalue) ? accum : [...accum, currentvalue]
        }, []);

        let tagsAdded = updated_distinct_id_Arr.reduce((accum, currentvalue) => {
            return current_distinct_id_Arr.includes(currentvalue) ? accum : [...accum, currentvalue]
        }, []);

        if (tagsAdded.length > 0) {
            inQuery = { _id: { "$in": tagsAdded } }
            let addto = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })


            for (let v of Object.values(addto.payload)) {

                await taxoFuncs_sub_addLoopTags({ model, form, myprops, actionType: 'samestate', inQuery, loopvalue: v, insert: updated })

                // Translate PART TagsAdded
                // Find the languages in which a childtag exists
                if (v.lgbinder !== '') {

                    inQuery = {
                        _id: { "$ne": v._id },
                        lgbinder: { "$eq": v.lgbinder }
                    }
                    let lglistitems = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

                    for (let vb of Object.values(lglistitems.payload)) {

                        inQuery = {
                            country: { "$eq": vb.country },
                            language: { "$eq": vb.language },
                            lgbinder: { "$eq": updated.lgbinder }
                        }

                        let foundtag_lg_ref = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                        if (foundtag_lg_ref.payload) {

                            await taxoFuncs_sub_addLoopTags({ model, form, myprops, actionType: 'samestate', inQuery, loopvalue: vb, insert: foundtag_lg_ref.payload })
                        }
                    }
                }

            }
        }

        if (tagsRemoved.length > 0) {
            inQuery = { _id: { "$in": tagsRemoved } }
            let removefrom = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

            for (let v of Object.values(removefrom.payload)) {

                await taxoFuncs_sub_removeLoopTags({ model, form, myprops, actionType: 'samestate', inQuery, loopvalue: v, insert: updated })

                // Translated
                if (v.lgbinder !== '') {

                    inQuery = {
                        _id: { "$ne": v._id },
                        lgbinder: { "$eq": v.lgbinder }
                    }
                    let lglistitems = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

                    for (let vb of Object.values(lglistitems.payload)) {

                        inQuery = {
                            country: { "$eq": vb.country },
                            language: { "$eq": vb.language },
                            lgbinder: { "$eq": updated.lgbinder }
                        }

                        let foundtag_lg_ref = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                        if (foundtag_lg_ref.payload) {

                            await taxoFuncs_sub_removeLoopTags({ model, form, myprops, actionType: 'samestate', inQuery, loopvalue: vb, insert: foundtag_lg_ref.payload })

                        }
                    }
                }
            }
        }

    }

}


