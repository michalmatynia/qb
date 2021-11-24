import {
    plg_updateOne_queMod_oprMod,
    plg_removeFile_Cloudinary_v2
} from '../../../utils/Plugs/cms_plugs';
import { submitFuncs_syncEditImages} from './submit_funcs'

export async function imageFuncs_removeImagesHandler_v2({ cell = null, fileid = null, model = null, myprops = null, mystate = null, poliglot = null }) {

    await plg_removeFile_Cloudinary_v2({ model, myprops, dataToSubmit: fileid, actionType: 'samestate' })

    await imageFuncs_removeImages_Edit_v2({ cell, poliglot, myprops, mystate, model })
}

export async function imageFuncs_removeImages_Edit_v2({ cell = null, fileid = null, myprops = null, mystate = null, model = null, poliglot = null }) {

    let inQuery
    let inOperator
    let inParams

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    // Update removed image
    inQuery = { _id: { "$eq": myprops[mystate.localStorage.model].detail._id } }
    inOperator = { '$set': { [cellkey]: cellvalue.value } }
    inParams = { new: true }

    await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'detail', inQuery, inOperator, inParams })
    
    if (poliglot) {
        await submitFuncs_syncEditImages({ model, myprops, actionType: 'detail', inQuery, inOperator, inParams, dataToSubmit: cellvalue.value, detail: myprops[model].detail })
    }

}

