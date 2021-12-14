import {
    plg_countDocuments,
    plg_updateOne_queMod_oprMod,
    plg_removeOne,
    plg_removeFile_Cloudinary_v2,
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';
import {
    taxoFuncs_removeSubtags_vh3
} from './taxo_funcs_vh'
import {
    reposFuncs_UpdatePosition_vh1
} from './repos_funcs_vh'
import {
    brickFuncs_removeBrickSubs_vh1
} from './brick_funcs_vh'

export async function removeFuncs_delEntityFromDb_v3_vh({
    item = null,
    removeall = null,
    model = null,
    poliglot = null,
    dispatch,
    redux_localeuser,
    isRawState
}) {

    let inQuery
    let response
    let removed

    // BEGIN MULTILANGUAGE REMOVE
    if (removeall && poliglot) {

        // In case you click removeAll, but it's the last entity in this language
        if (item.lgbinder === '') {
            inQuery = { _id: { "$eq": item._id } }
        } else {
            inQuery = { lgbinder: { "$eq": item.lgbinder }, }
        }

        response = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })

        for (const value of Object.values(response.payload)) {

            inQuery = { _id: { "$eq": value._id } }
            removed = await plg_removeOne({ model, dispatch, actionType: 'samestate', inQuery })

            await reposFuncs_UpdatePosition_vh1({ country: value.country, language: value.language, removed, model, dispatch, poliglot })

            if (model === 'taxonomy') {
                await taxoFuncs_removeSubtags_vh3({ dispatch, removed, model })
            }
            if (model === 'product' || model === 'slide') {
                await brickFuncs_removeBrickSubs_vh1({ dispatch, removed: removed.payload, model: 'brick' })
            }
            // ------END OF LANGUAGE LOOP
        }

        // Remove image in Remove All but outside loop, because ALL images are removed anyways
        await removeFuncs_CloudinaryImages_vh2({ dispatch, removed, model })

    } else {
        // REMOVE INDIVIDUAL

        // Clear lgbinder if it's the last instance and remove Images from CLoudinary
        if (!removeall && poliglot) {

            inQuery = { _id: { "$eq": item._id } }
            removed = await plg_removeOne({ model, dispatch, actionType: 'samestate', inQuery })
            if (removed.payload.lgbinder !== '') {
                await removeFuncs_SyncLgbinder_vh1({ dispatch, removed, model })
            } else {
                await removeFuncs_CloudinaryImages_vh2({ dispatch, removed, model })
            }
            if (removed.payload.position) {
                await reposFuncs_UpdatePosition_vh1({ dispatch, country: redux_localeuser.referenceID.alpha2Code, language: redux_localeuser.referenceID.languages[0].iso639_1, removed, model, poliglot })
            }

        } else if (model && !poliglot) {

            inQuery = { _id: { "$eq": item._id } }
            removed = await plg_removeOne({ model, dispatch, actionType: 'samestate', inQuery, populate: redux_localeuser.qhelpers.populate })

            if (removed.payload !== '') {

                if (model === 'language') {
                    await removeFuncs_languageContent_vh3({ model, removed: removed.payload, dispatch, redux_localeuser, poliglot, isRawState })
                }

                await reposFuncs_UpdatePosition_vh1({ country: redux_localeuser.referenceID.alpha2Code, language: redux_localeuser.referenceID.languages[0].iso639_1, removed, model, dispatch, poliglot })
            }
        }

        if (model === 'taxonomy') {
            await taxoFuncs_removeSubtags_vh3({ dispatch, removed, model })
        }
        if (model === 'product' || model === 'slide') {
            await brickFuncs_removeBrickSubs_vh1({ dispatch, removed: removed.payload, model: 'brick' })

        }
    }

}

export async function removeFuncs_CloudinaryImages_vh2({ dispatch = null, removed = null, model = null }) {
    if ('images' in removed.payload && removed.payload.images.length > 0) {
        for (const image of Object.values(removed.payload.images)) {

            await plg_removeFile_Cloudinary_v2({ model, dispatch, dataToSubmit: image.public_id, actionType: 'samestate' })

        }
    }
}
export async function removeFuncs_SyncLgbinder_vh1({ dispatch = null, removed = null, model = null }) {
    let inQuery
    let inOperator

    inQuery = {
        lgbinder: { "$eq": removed.payload.lgbinder }
    }

    let countwithlgbinder = await plg_countDocuments({ model, dispatch, actionType: 'samestate', inQuery })

    if (countwithlgbinder.payload === 1) {

        inQuery = {
            lgbinder: { "$eq": removed.payload.lgbinder }
        }
        inOperator = { '$set': { lgbinder: '' } }

        await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })
    }
}

// Remove Language Content =============
export async function removeFuncs_languageContent_vh3({ model = null, removed = null, dispatch = null, redux_localeuser, poliglot, isRawState}) {
    let inQuery
    let inOperator
    let populate = isRawState.localStorage.qhelpers.populate

    let modelArray = isRawState.localStorage.linguistic.modelArray
    for (let eachid of removed) {

        inQuery = {
            referenceID: { "$eq": eachid },
        }


        let removedlg = await plg_removeOne({ model, dispatch, actionType: 'samestate', inQuery, populate })
        if (removedlg.payload.position) {

            await reposFuncs_UpdatePosition_vh1({ country: redux_localeuser.referenceID.alpha2Code, language: redux_localeuser.referenceID.languages[0].iso639_1, removed, model, dispatch, poliglot })

        }


        for (const modelvalue of modelArray) {
            inQuery = {
                country: { "$eq": removedlg.payload.referenceID.alpha2Code },
                language: { "$eq": removedlg.payload.referenceID.languages[0].iso639_1 },
            }
            let contentinlg = await plg_findMany({ model: modelvalue, actionType: 'samestate', dispatch, inQuery })
            for (const rootcontent of Object.values(contentinlg.payload)) {

                inQuery = { _id: { "$eq": rootcontent._id } }

                let removedcontent = await plg_removeOne({ model: modelvalue, dispatch, actionType: 'samestate', inQuery })

                if (modelvalue === 'product' || modelvalue === 'slide') {
                    await brickFuncs_removeBrickSubs_vh1({ dispatch, removed: removedcontent, model: modelvalue })
                }

                if (removedcontent.payload.lgbinder !== '') {
                    inQuery = { lgbinder: { "$eq": removedcontent.payload.lgbinder } }
                    let countwithlgbinder = await plg_countDocuments({ model: modelvalue, dispatch, actionType: 'samestate', inQuery })

                    if (countwithlgbinder.payload === 1) {

                        inQuery = {
                            lgbinder: { "$eq": removedcontent.payload.lgbinder }
                        }
                        inOperator = { '$set': { lgbinder: '' } }

                        await plg_updateOne_queMod_oprMod({ model: modelvalue, dispatch, actionType: 'samestate', inQuery, inOperator })
                    }
                } else {

                    if (removedcontent.payload.images.length > 0) {
                        for (const image of Object.values(removedcontent.payload.images)) {
                            await plg_removeFile_Cloudinary_v2({ model: modelvalue, dispatch, dataToSubmit: image.public_id, actionType: 'samestate' })
                        }
                    }
                }
            } // END Remove language content
        }
        /// HERE
    }

}