import {
    plg_findMany,
    plg_findOne_QueMod,
    plg_updateOne_queMod_oprMod,
    plg_updateMany,
    plg_create_oprMod,
} from '../../../utils/Plugs/cms_plugs';
import { runtranslation } from '../../../utils/Funcs/translationfuncs';
import { runtranslation_vh2 } from '../../../utils/Funcs/translationfuncs_hook';

import { taxoFuncs_syncTaxoAcross, taxoFuncs_setTaxonomyTags_v2 } from './taxo_funcs'
import { messageCompleted } from './errormsg_funcs'
import { reposFuncs_syncPositionAcross, } from './repos_funcs'
import { reposFuncs_syncPositionAcross_vh1,  reposFuncs_soloPositionSwap_vh2 } from './repos_funcs_vh'

import { preinputFuncs_formatData_Add_vh2, preinputFuncs_formatData_Edit_vh2 } from './preinput_funcs_vh'
import { grabFormdata_vh2 } from '../../../utils/Form/FormActions/grabFormdata_vh';
import { runPostCreateActionsfromState } from '../../../utils/Form/FormActions/stateActions'

import { attachtoFuncs_overModel_Lgchange_vh1 } from '../../../User/Admin/GenericFuncs/attachto_funcs_vh'


export async function submitFuncs_UpdateTranslate_vh1({ redux_localeuser, isLocalStorage, dispatch, translate = null, updated = null, current = null, redux_module, redux_current_mysite, prospect = null, model = null, }) {
    if (updated.payload) {

        if (updated.payload.lgbinder !== '') {

            let inQuery

            if (model === 'brick'
                || model === 'page'
            ) {
                updated.payload['checked'] = [...isLocalStorage.form.formdata.checked.value]
            }

            inQuery = {
                _id: { "$ne": redux_localeuser._id }
            }
            let lglist = await plg_findMany({ model: 'language', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

            // LOOP through languages

            for (const item of Object.values(lglist.payload)) {

                // SYNCHRONIZE Position & Visible // Create syncPositionAcross
                // Lepiej zostawić jako osobny Run na bazie danych, bo jest tam skomplikowana opcja SWAP

                await reposFuncs_syncPositionAcross_vh1({ dispatch, country: item.referenceID.alpha2Code, language: item.referenceID.languages[0].iso639_1, model, updated, redux_module })

                /// SYNCHRONIZE TagtypeMain

         /*        if (model === 'taxonomy') {

                    await taxoFuncs_syncTaxoAcross({
                        model,
                        myprops,
                        mystate,
                        updated: updated.payload,
                        current,
                        target_lg: item.referenceID.languages[0].iso639_1,
                        source_lg: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                        language: item.referenceID.languages[0].iso639_1,
                        country: item.referenceID.alpha2Code
                    })
                } */

                await submitFuncs_syncContentTranslateAcross_vh1({
                    translate,
                    updated,
                    model,
                    current,
                    prospect,
                    target_lg: item.referenceID.languages[0].iso639_1,
                    source_lg: redux_localeuser.referenceID.languages[0].iso639_1,
                    language: item.referenceID.languages[0].iso639_1,
                    country: item.referenceID.alpha2Code,
                    redux_module,
                    redux_current_mysite,
                    isLocalStorage,
                    dispatch,
                })
            }
        }

    }
}
export async function submitFuncs_SyncLgbinder_vh2({ dispatch = null, input = null, model = null }) {
    let inQuery
    let inOperator

    inQuery = {
        _id: { "$eq": input._id }
    }
    inOperator = { '$set': { lgbinder: input._id } }

    await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

}
export async function submitFuncs_syncContentTranslateAcross_vh1({ translate = null, isLocalStorage, dispatch = null, updated = null, model = null,  source_lg = null, target_lg = null, country = null, language = null, current = null, prospect = null, redux_module = null, redux_current_mysite }) {

    let inQuery
    let inOperator
    let inParams

    if (translate) {

        let merger = await submitFuncs_combineTranslateFields_vh2({ source_lg, target_lg, current: updated.payload, dispatch, redux_current_mysite, isLocalStorage }) 
        if (merger.combinedTranslation) {

            let translatedDataToSubmit = await preinputFuncs_formatData_Edit_vh2({ combinedTranslation: merger.combinedTranslation, language, country, current, prospect, updated: updated.payload, model, dispatch})

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$eq": updated.payload.lgbinder }
            }

            inOperator = {
                "$set": translatedDataToSubmit
            }
            inParams = { new: true }

            await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator, inParams, populate: isLocalStorage.qhelpers.populate })

        } else {

            let inQuery = { _id: { "$eq": redux_module.detail._id} }
            await plg_findOne_QueMod({ model, dispatch, actionType: 'detail', inQuery })

            // =============
            setTimeout(async () => {

            inQuery = { type: { "$eq": 'custom' } }

            inOperator = {
                "$set": { text: merger.output.result }
            }
                await plg_updateOne_queMod_oprMod({ model: 'message', dispatch, actionType: 'detail', inQuery, inOperator })

            }, 2000)



        }
    }

}
export async function submitFuncs_SyncLgbinder_vh1({ dispatch = null, input = null, model = null }) {
    let inQuery
    let inOperator

    inQuery = {
        _id: { "$eq": input._id }
    }
    inOperator = { '$set': { lgbinder: input._id } }
    await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

}
export async function submitFuncs_genericSubmit_vh2({ model = null, current, dispatch, isLocalStorage, redux_current_mysite }) {

    let inQuery = {}
    let inOperator = {}

    let formdata = { ...isLocalStorage.form.formdata }

    let inInsert =  await grabFormdata_vh2({ formdata, model, dispatch, current, redux_current_mysite });

    if (Object.values(inInsert).length > 0) {

        let added = await plg_create_oprMod({ model, dispatch, actionType: 'samestate', inInsert })

        if (added.payload.position < isLocalStorage.form.formdata.position.config.options.length) {


            if (isLocalStorage.poliglot) {

                Object.assign(inQuery,
                    {
                        country: { "$eq": added.payload.country },
                        language: { "$eq": added.payload.language },
                    }
                )
            }

            Object.assign(inQuery,
                {
                    _id: { "$ne": added.payload._id },
                    position: { "$gte": added.payload.position },
                }
            )

            inOperator = {
                "$inc": { position: 1 }
            }

            await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator })
        }

        added = await runPostCreateActionsfromState({ formdata, added, current });


        return added
    } else {
        return null
    }
}
export async function submitFuncs_fullSubmit_vh2({
    model = null,
    current = null,
    prospect = null,
    source_lg = null,
    target_lg = null,
    language = null,
    country = null,
    dispatch = null,
    isLocalStorage = null,
    redux_current_mysite = null,
    poliglot = null,
    redux_localeuser,
}) {
    let addedtranslated = null


    let merger = await submitFuncs_combineTranslateFields_vh2({ source_lg, target_lg, current, dispatch, redux_current_mysite, isLocalStorage })

    if (merger.combinedTranslation) {

        addedtranslated = await preinputFuncs_formatData_Add_vh2({

            combinedTranslation: merger.combinedTranslation,
            model,
            current,
            prospect,
            language,
            country,
            target_lg,
            source_lg,
            dispatch,
            isLocalStorage,
            poliglot,
            redux_current_mysite,
            redux_localeuser
        })

        if ('attachto' in isLocalStorage) {

             await attachtoFuncs_overModel_Lgchange_vh1({
                translate: poliglot,
                model: Object.keys(isLocalStorage.attachto)[0],
                submodel: isLocalStorage.model,
                newLocalStorage: isLocalStorage,
                added: addedtranslated,

                attacher: isLocalStorage.attachto.brick,
                dispatch,
                redux_localeuser,
        
            })
            /* Reset the attach to field */
        }
        /* Once the translation is created, create Translated Tags, do it last to maintain proper position */
        /*         if (model === 'taxonomy') {
        
                    let result
                    let tagArray = ['tagparent', 'tagchild']
        
                    for (let tagcontainer of tagArray) {
        
                        result = await taxoFuncs_setTaxonomyTags_v2({ insert: addedtranslated.payload, current, source_lg, target_lg, language, country, model, myprops, mystate, key: tagcontainer })
                    }
        
                    if (result) {
                        addedtranslated = result
                    }
                } */

    } else {
        setTimeout(async () => {

            let inQuery = { type: { "$eq": 'custom' } }

            let inOperator = {
                "$set": { text: merger.output.result }
            }
            await plg_updateOne_queMod_oprMod({ model: 'message', dispatch, actionType: 'detail', inQuery, inOperator })

        }, 2000)
    }

    return addedtranslated

    // END IF TRANSLATION SUCCESS
}
export async function submitFuncs_combineTranslateFields_vh2({ source_lg = null, target_lg = null, dispatch, current = null, redux_current_mysite, isLocalStorage }) {
    let inQuery

    inQuery = { name: { "$eq": redux_current_mysite.translation_engine } }
    let engine = await plg_findOne_QueMod({ model: 'transengine', dispatch, actionType: 'samestate', inQuery })

    let combinedTranslation = []
    let translationValid = true;
    let output


    for (let value of isLocalStorage.linguistic.translate) {

        output = await runtranslation_vh2({ source_lg, target_lg, content: current[value], engine: engine.payload, dispatch })
        translationValid = output.Success && translationValid

        combinedTranslation = [...combinedTranslation, { output, field: value }]
    }


    if (translationValid) {
        return { combinedTranslation, output }
    } else {
        return { combinedTranslation: null, output }
    }
}
export async function submitFuncs_saveUpdate_vh2({ isLocalStorage = null, formdata = null, model = null, dispatch = null, current = null, poliglot = null, redux_current_mysite }) {
    let inQuery
    let inOperator
    let inParams

    let dataToSubmit = await grabFormdata_vh2({ formdata, model, dispatch, current, redux_current_mysite });

    inQuery = { _id: { "$eq": current._id } }
    inOperator = { '$set': dataToSubmit }
    inParams = { new: true }

    let updated = await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'detail', inQuery, inOperator, inParams, populate: isLocalStorage.qhelpers.populate })

    await reposFuncs_soloPositionSwap_vh2({ model, dispatch, current, updated, poliglot })

    updated = await runPostCreateActionsfromState({ formdata, added: updated, current });

    return { dataToSubmit, updated }
}
export async function submitFuncs_syncEditImages_vh1({ dispatch = null, dataToSubmit = null, model = null, redux_module = null }) {

    let inQuery
    let inOperator
    let inParams

    if (redux_module.detail.lgbinder !== '') {

        inQuery = {
            _id: { "$ne": redux_module.detail._id },
            lgbinder: { "$eq": redux_module.detail.lgbinder }
        }

        let lglist = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })

        for (const item of Object.values(lglist.payload)) {

            inQuery = {
                country: { "$eq": item.country },
                language: { "$eq": item.language },
                lgbinder: { "$eq": redux_module.detail.lgbinder }
            }
            inOperator = { '$set': { images: dataToSubmit } }
            inParams = { new: true }

            await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator, inParams })

        }
    }
}
