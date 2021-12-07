import {
    plg_countDocuments,
    plg_updateMany,
    plg_create_oprMod,
    plg_findMany,
    plg_updateOne_queMod_oprMod,
    plg_findOne_QueMod
} from '../../../utils/Plugs/cms_plugs';
import { submitFuncs_SyncLgbinder } from './submit_funcs'
import { brickFuncs_populateMultimodel_preInput, brickFuncs_populateMultimodelWithQty_preInput } from './brick_funcs'

export async function preinputFuncs_formatData_Add({ combinedTranslation = null, myprops = null, model = null, mystate = null, current = null, prospect = null, language = null, country = null, target_lg = null, source_lg = null }) {

    let inQuery
    let inOperator

    const { _id, _v, ...restprospect } = prospect

    let translatedDataToSubmit = { ...restprospect }

    if (prospect.lgbinder === '') {
        await submitFuncs_SyncLgbinder({ model, myprops, input: prospect, mystate })
        prospect.lgbinder = prospect._id
    }

    translatedDataToSubmit['lgbinder'] = prospect.lgbinder

    if (model === 'taxonomy') {
        // COMMENT: Te pola są uzupełnione w dalszej części
        translatedDataToSubmit['tagparent'] = []
        translatedDataToSubmit['tagchild'] = []
    }

    if (model === 'product') {

        let category_values
        let type_values
        let variant_one_taxo
        let variant_two_taxo

        if ('category' in mystate.localStorage.form.formdata) {
            category_values = [...mystate.localStorage.form.formdata.category.value]
        } else {
            /* Prospect here refers to original _id not lg binder, so it doesn't work when changed not from root language */
            category_values = [...prospect.category]
        }

        if ('type' in mystate.localStorage.form.formdata) {
            type_values = [...mystate.localStorage.form.formdata.type.value]
        } else {
            /* Prospect here refers to original _id not lg binder, so it doesn't work when changed not from root language */
            type_values = [...prospect.type]
        }
  

        if ('variant_one_taxo' in mystate.localStorage.form.formdata) {
            variant_one_taxo = [...mystate.localStorage.form.formdata.variant_one_taxo.value]
        } else {
            variant_one_taxo = [...prospect.type]
        }

        if ('variant_two_taxo' in mystate.localStorage.form.formdata) {
            variant_two_taxo = [...mystate.localStorage.form.formdata.variant_two_taxo.value]
        } else {
            variant_two_taxo = [...prospect.type]
        }

        translatedDataToSubmit['price'] = 0
        if (category_values.length > 0) {

            let category_lgbinders = category_values.map(a => a.lgbinder);

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": category_lgbinders }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['category'] = filteredresult
        }

        if (type_values.length > 0) {

            let type_lgbinders = type_values.map(a => a.lgbinder);

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": type_lgbinders }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['type'] = filteredresult
        }

        if (variant_one_taxo.length > 0) {

            let variant_one_taxo_lgbinders = type_values.map(a => a.lgbinder);

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": variant_one_taxo_lgbinders }
            }


            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['variant_one_taxo'] = filteredresult
        }

        if (variant_two_taxo.length > 0) {

            let variant_two_taxo_lgbinders = type_values.map(a => a.lgbinder);

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": variant_two_taxo_lgbinders }
            }


            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['variant_two_taxo'] = filteredresult
        }
    }

    // ===============
    if (model === 'productgroup') {

        let category_values

        if ('category' in mystate.localStorage.form.formdata) {
            category_values = [...mystate.localStorage.form.formdata.category.value]
        } else {
            /* Prospect here refers to original _id not lg binder, so it doesn't work when changed not from root language */
            category_values = [...prospect.category]
        }

        translatedDataToSubmit['price'] = 0
        if (category_values.length > 0) {

            let category_lgbinders = category_values.map(a => a.lgbinder);

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": category_lgbinders }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['category'] = filteredresult
        }

        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodelWithQty_preInput({ myprops, mystate, country, language,  prospect, target_lg, source_lg })

    }
    // ===============
    if (model === 'brick') {

        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodel_preInput({ myprops, mystate, country, language, prospect, target_lg, source_lg })
    }
    if (model === 'page') {

        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodel_preInput({ myprops, mystate, country, language,  prospect, target_lg, source_lg })
        
        // Clear isdefault
        if (translatedDataToSubmit['isdefault'] === true) {
            inQuery = {
                language: { "$eq": language },
                country: { "$eq": country }
            }
            inOperator = {
                "$set": { isdefault: false }
            }

            await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
        }
    }

    if (model === 'trnsdetailproduct') {

        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodel_preInput({ myprops, mystate, country, language,  prospect, target_lg, source_lg })
        
        // Clear isdefault
        if (translatedDataToSubmit['isdefault'] === true) {
            inQuery = {
                language: { "$eq": language },
                country: { "$eq": country }
            }
            inOperator = {
                "$set": { isdefault: false }
            }

            await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
        }
    }

    if (
        model === 'cart'
        || model === 'login'
        || model === 'mystore'
        || model === 'mysite'
        || model === 'contact'
        || model === 'newsletter'

    ) {
        
        // Clear isdefault
        if (translatedDataToSubmit['isdefault'] === true) {
            inQuery = {
                language: { "$eq": language },
                country: { "$eq": country }
            }
            inOperator = {
                "$set": { isdefault: false }
            }

            await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
        }
    }

    translatedDataToSubmit['language'] = language
    translatedDataToSubmit['country'] = country
    for (let value of combinedTranslation) {
        translatedDataToSubmit[value.field] = value.output.result
    }

    inQuery = {
        country: { "$eq": country },
        language: { "$eq": language },
    }

    let count = await plg_countDocuments({ model, myprops, actionType: 'samestate', inQuery })

    if (count.payload === 0) {
        translatedDataToSubmit['position'] = 1
    } else if (current.position > count.payload) {
        translatedDataToSubmit['position'] = count.payload + 1
    } else {
        translatedDataToSubmit['position'] = current.position
    }

    let addedtranslated = await plg_create_oprMod({ model, myprops, actionType: 'samestate', inInsert: translatedDataToSubmit })

    let totaltranslated = count.payload + 1

    if (addedtranslated.payload.position < totaltranslated) {

        inQuery = {
            _id: { "$ne": addedtranslated.payload._id },
            country: { "$eq": addedtranslated.payload.country },
            language: { "$eq": addedtranslated.payload.language },
            position: { "$gte": addedtranslated.payload.position },
        }
        inOperator = {
            "$inc": { position: 1 }
        }

        await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
    }

    return addedtranslated
}

export async function preinputFuncs_formatData_Edit({ combinedTranslation = null, myprops = null, model = null, mystate = null, current = null, prospect = null, updated, language = null, country = null }) {

    // Fromats an object after Edit Save ready to be submitted to Database
    let translatedDataToSubmit
    let inQuery

    for (let value of combinedTranslation) {
        translatedDataToSubmit = { ...translatedDataToSubmit, [value.field]: value.output.result }
    }

    if (model === 'contact') {
        translatedDataToSubmit['images'] = updated['images']
        translatedDataToSubmit['htmltype'] = updated['htmltype']
        translatedDataToSubmit['isdefault'] = updated['isdefault']
    }

    if (model === 'login') {
        translatedDataToSubmit['images'] = updated['images']
        translatedDataToSubmit['htmltype'] = updated['htmltype']
        translatedDataToSubmit['isdefault'] = updated['isdefault']

    }

    if (model === 'mystore') {
        translatedDataToSubmit['images'] = updated['images']
        translatedDataToSubmit['isdefault'] = updated['isdefault']
        translatedDataToSubmit['image_filter'] = updated['image_filter']

    }
    if (model === 'cart') {
        translatedDataToSubmit['images'] = updated['images']
        translatedDataToSubmit['isdefault'] = updated['isdefault']
        translatedDataToSubmit['image_filter'] = updated['image_filter']

    }
    if (model === 'trnsdetailproduct') {
        translatedDataToSubmit['images'] = updated['images']
        translatedDataToSubmit['image_filter'] = updated['image_filter']
        translatedDataToSubmit['isdefault'] = updated['isdefault']
        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodel_preInput({ myprops, mystate, country, prospect, language})
        
    }


    if (model === 'newsletter') {
        translatedDataToSubmit['images'] = updated['images']
        translatedDataToSubmit['isdefault'] = updated['isdefault']

    }

    if (model === 'taxonomy') {
        translatedDataToSubmit['images'] = updated['images']

    }

    if (model === 'product') {

        // translatedDataToSubmit['price'] = 0
        translatedDataToSubmit['images'] = updated['images']

        if (updated['category'].length > 0) {

            // Find Category Ids
            inQuery = {
                _id: { "$in": updated['category'] },
            }
            let lgbinderlist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, distinct: 'lgbinder' })

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": lgbinderlist.payload }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['category'] = filteredresult
        } else {
            translatedDataToSubmit['category'] = []

        }

        // 
        if (updated['type'].length > 0) {

            // Find Category Ids
            inQuery = {
                _id: { "$in": updated['type'] },
            }
            let lgbinderlist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, distinct: 'lgbinder' })

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": lgbinderlist.payload }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['type'] = filteredresult
        } else {
            translatedDataToSubmit['type'] = []

        }

        // ==================

        if (updated['variant_one_taxo'].length > 0) {

            // Find Category Ids
            inQuery = {
                _id: { "$in": updated['variant_one_taxo'] },
            }
            let lgbinderlist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, distinct: 'lgbinder' })

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": lgbinderlist.payload }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['variant_one_taxo'] = filteredresult
        } else {
            translatedDataToSubmit['variant_one_taxo'] = []
        }

        if (updated['variant_two_taxo'].length > 0) {

            // Find Category Ids
            inQuery = {
                _id: { "$in": updated['variant_two_taxo'] },
            }
            let lgbinderlist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, distinct: 'lgbinder' })

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": lgbinderlist.payload }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['variant_two_taxo'] = filteredresult
        } else {
            translatedDataToSubmit['variant_two_taxo'] = []
        }

    }

    if (model === 'productgroup') {
        let models = ['product']

        translatedDataToSubmit['images'] = updated['images']

        if (updated['category'].length > 0) {

            // Find Category Ids
            inQuery = {
                _id: { "$in": updated['category'] },
            }
            let lgbinderlist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, distinct: 'lgbinder' })

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$in": lgbinderlist.payload }
            }

            let taxonomylist = await plg_findMany({ model: 'taxonomy', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })

            let filteredresult = taxonomylist.payload.map(a => a._id);
            translatedDataToSubmit['category'] = filteredresult
        } else {
            translatedDataToSubmit['category'] = []
        }
        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodelWithQty_preInput({ myprops, mystate, country, prospect, language, models })

    }
    // These will synchronize the checked items across languages when I Save in Edit
    if (model === 'brick') {

        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodel_preInput({ myprops, mystate, country, prospect, language})
        translatedDataToSubmit['images'] = updated['images']
        translatedDataToSubmit['htmltype'] = updated['htmltype']
        translatedDataToSubmit['css_wrap_card'] = updated['css_wrap_card']
        translatedDataToSubmit['css_wrap_container'] = updated['css_wrap_container']
        translatedDataToSubmit['css_wrap_mainraised'] = updated['css_wrap_mainraised']
    }

    if (model === 'page') {

        translatedDataToSubmit['checked'] = await brickFuncs_populateMultimodel_preInput({ myprops, mystate, country, prospect, language})
        translatedDataToSubmit['isdefault'] = updated['isdefault']
        translatedDataToSubmit['images'] = updated['images']


        // compare current to updated in terms of isdefautl
        if (updated['isdefault'] === true) {
            inQuery = {
                language: { "$eq": language },
                country: { "$eq": country }
            }
            let inOperator = {
                "$set": { isdefault: false }
            }

            await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
        } else if (current['isdefault'] !== updated['isdefault'] && updated['isdefault'] === false) {

            /* Save Edit synchronization of isDefault across languages  */

            if (updated.lgbinder !== '') {
                let lglist = await plg_findMany({ model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

                for (const eachlg of Object.values(lglist.payload)) {

                    // check if updated is in this language and if it's true, if it is, set a different one to true
                    inQuery = {
                        lgbinder: { "$eq": updated.lgbinder },
                    }
                    inQuery = Object.assign(inQuery, {
                        country: { "$eq": eachlg.referenceID.alpha2Code },
                        language: { "$eq": eachlg.referenceID.languages[0].iso639_1 }
                    });
                    let found = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                    if (found.payload !== '') {
                        /* I need to set up another isdefault, because the found goes false */
                        if (found.payload.position === 1) {
                            inQuery = { position: { "$eq": 2 }, }
                        } else {
                            inQuery = { position: { "$eq": 1 }, }
                        }
                        Object.assign(inQuery, {
                            country: { "$eq": eachlg.referenceID.alpha2Code },
                            language: { "$eq": eachlg.referenceID.languages[0].iso639_1 }
                        })
                        let inOperator = {
                            "$set": { isdefault: true }
                        }

                        await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator })
                    }
                }

            } else {
                if (updated.position === 1) {
                    inQuery = { position: { "$eq": 2 }, }
                } else {
                    inQuery = { position: { "$eq": 1 }, }
                }
                Object.assign(inQuery, {
                    country: { "$eq": updated.country },
                    language: { "$eq": updated.language }
                })
                let inOperator = {
                    "$set": { isdefault: true }
                }

                await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator })
            }

        }
    }
    return translatedDataToSubmit
}