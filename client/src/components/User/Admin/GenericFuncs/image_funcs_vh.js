import {
    plg_updateOne_queMod_oprMod,
    plg_removeFile_Cloudinary_v2
} from '../../../utils/Plugs/cms_plugs';
import { submitFuncs_syncEditImages_vh1 } from './submit_funcs_vh'

export async function imageFuncs_removeImagesHandler_vh2({ cell = null, fileid = null, isLocalStorage = null, redux_module = null, dispatch = null }) {

    await plg_removeFile_Cloudinary_v2({ isLocalStorage, dispatch, dataToSubmit: fileid, actionType: 'samestate' })

    await imageFuncs_removeImages_Edit_vh2({ cell, isLocalStorage, redux_module, dispatch})
}
export async function imageFuncs_removeImages_Edit_vh2({ cell = null, dispatch = null, redux_module = null, isLocalStorage = null }) {

    let inQuery
    let inOperator
    let inParams

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]


    // Update removed image
    inQuery = { _id: { "$eq": redux_module.detail._id } }
    inOperator = { '$set': { [cellkey]: cellvalue.value } }
    inParams = { new: true }

    await plg_updateOne_queMod_oprMod({ model: isLocalStorage.model, dispatch, actionType: 'detail', inQuery, inOperator, inParams })
    
    if (isLocalStorage.poliglot) {
        await submitFuncs_syncEditImages_vh1({ model: isLocalStorage.model, dispatch, dataToSubmit: cellvalue.value, redux_module })
    }

}