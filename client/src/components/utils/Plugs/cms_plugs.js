import {
    act_findOne_QueMod,
    act_removeOne_queMod,
    act_clearProps_v2,
    act_updateOne_queMod_oprMod,
    act_updateMany_queMod_oprMod,
    act_insertMany_ModMod,
    act_deleteMany_ModMod,
    act_create_oprMod,
    act_countDocuments,
    act_APIcall_mod_redux,
    act_uploadFile_Cloudinary,
    act_removeFile_Cloudinary_v2,
    act_findMany_queMod,
    act_sendMail,
    act_aggregate

} from '../../../redux/actions/generic/generic_actions';


export async function plg_insertMany_ModMod({ model = null, myprops = null, inQuery = null, inOperator = null, inParams = null, inInsert = null, actionType = null }) {

    let reqBody = { reqhelper: {}, reqquery: inQuery, reqoperator: inOperator, reqparams: inParams, reqinsertmodel: inInsert }

    Object.assign(reqBody, { model: model });

    await myprops.dispatch(act_insertMany_ModMod({ dataToSubmit: reqBody, actionType }))

}
export async function plg_deleteMany_ModMod({ model = null, myprops = null, inQuery = null, actionType = null }) {

    let reqBody = { reqhelper: {}, reqquery: inQuery }

    Object.assign(reqBody, { model: model });

    await myprops.dispatch(act_deleteMany_ModMod({ dataToSubmit: reqBody, actionType }))

}
export async function plg_findMany({ viewparams = null, model = null, myprops = null, actionType = null, populate = null, inQuery = null, inSortOrder = null, inSortBy = null, inLimit = null, inSkip = null, inSearch = null, distinct = null, dispatch = null }) {
    let reqBody = { reqhelper: {}, reqquery: inQuery }
    Object.assign(reqBody, { model: model });

    if (populate) {
        Object.assign(reqBody.reqhelper, { populate: populate });
    }
    if (distinct) {
        Object.assign(reqBody.reqhelper, { distinct: distinct });
    }

    // Viewparams

    if (inSortOrder) {
        Object.assign(reqBody.reqhelper, { sortOrder: inSortOrder });
    } else if (!inSortOrder && viewparams) {
        Object.assign(reqBody.reqhelper, { sortOrder: viewparams.sortOrder });
    }

    if (inSortBy) {
        Object.assign(reqBody.reqhelper, { sortBy: inSortBy });
    } else if (!inSortBy && viewparams) {
        Object.assign(reqBody.reqhelper, { sortBy: viewparams.sortBy });
    }

    if (inLimit) {
        Object.assign(reqBody.reqhelper, { limit: inLimit });
    } else if (!inLimit && viewparams) {
        Object.assign(reqBody.reqhelper, { limit: viewparams.limit });
    }

    if (inSkip) {
        Object.assign(reqBody.reqhelper, { skip: inSkip });
    } else if (!inSkip && viewparams) {
        Object.assign(reqBody.reqhelper, { skip: viewparams.skip });
    }

    if (inSearch) {
        // If I use inSearch, the whole object (searchtext, searchrange) needs to be inserted
        //   let inSearch =  {searchtext: 'text', searchrange: 'range', searchdepth: 'depth'}
        Object.assign(reqBody.reqhelper, { search: inSearch });
    } else if (!inSearch && viewparams) {
        Object.assign(reqBody.reqhelper, { search: {} });

        if ('search' in viewparams) {

            // && viewparams.search.value !== ''
            if (viewparams.search.value) {
                Object.assign(reqBody.reqhelper.search, { searchtext: viewparams.search.value });
            }
            if (viewparams.search.range) {
                Object.assign(reqBody.reqhelper.search, { searchrange: viewparams.search.range });
            }
        }

    }

    // console.log(reqBody.reqhelper);

    if (dispatch) {
        return await dispatch(act_findMany_queMod({ dataToSubmit: reqBody, actionType }))

    } else {

        return await myprops.dispatch(act_findMany_queMod({ dataToSubmit: reqBody, actionType }))

    }

}
export async function plg_updateOne_queMod_oprMod({ model = null, dispatch = null, myprops = null, inQuery = null, inOperator = null, inParams = null, actionType = null, populate = null }) {
    let reqBody = { reqhelper: {}, reqquery: inQuery, reqoperator: inOperator, reqparams: inParams }
    Object.assign(reqBody, { model: model });

    if (populate) {
        Object.assign(reqBody.reqhelper, { populate: populate });
    }
    if (dispatch) {

        return await dispatch(act_updateOne_queMod_oprMod({ dataToSubmit: reqBody, actionType }))

    } else {
        return await myprops.dispatch(act_updateOne_queMod_oprMod({ dataToSubmit: reqBody, actionType }))

    }

}
export async function plg_create_oprMod({ model = null, dispatch = null, myprops = null, inParams = null, inInsert = null, inModelParams = null, actionType = null }) {

    let reqBody = { reqhelper: {}, reqmodelparams: inModelParams, reqinsertmodel: inInsert, reqparams: inParams }
    Object.assign(reqBody, { model: model });

    if (dispatch) {

        return await dispatch(act_create_oprMod({ dataToSubmit: reqBody, actionType }))


    } else {

        return await myprops.dispatch(act_create_oprMod({ dataToSubmit: reqBody, actionType }))

    }
}
export async function plg_clearProps({ model = null, myprops = null, actionType = null, dispatch = null }) {

    let reqBody = {}
    Object.assign(reqBody, { model: model });

    if (dispatch) {
        await dispatch(act_clearProps_v2({ dataToSubmit: reqBody, actionType }))

    } else {

        await myprops.dispatch(act_clearProps_v2({ dataToSubmit: reqBody, actionType }))

    }
}
export async function plg_updateMany({ model = null, myprops = null, dispatch = null, inQuery = null, inOperator = null, inParams = null, actionType = null }) {

    let reqBody = { reqhelper: {}, reqquery: inQuery, reqoperator: inOperator, reqparams: inParams }
    Object.assign(reqBody, { model: model });

    if (dispatch) {
        await dispatch(act_updateMany_queMod_oprMod({ dataToSubmit: reqBody, actionType }))

    } else {

        await myprops.dispatch(act_updateMany_queMod_oprMod({ dataToSubmit: reqBody, actionType }))

    }


}
export async function plg_removeOne({ dispatch, model = null, myprops = null, inQuery = null, inParams = null, actionType = null, populate }) {

    let reqBody = { reqhelper: {}, reqquery: inQuery, reqparams: inParams }
    Object.assign(reqBody, { model: model });

    if (populate) {
        Object.assign(reqBody.reqhelper, { populate: populate });
    }


    if (dispatch) {
        return await dispatch(act_removeOne_queMod({ actionType, dataToSubmit: reqBody }))

    } else {

        return await myprops.dispatch(act_removeOne_queMod({ actionType, dataToSubmit: reqBody }))

    }


}
export async function plg_aggregate({ dispatch = null, model = null, myprops = null, actionType = null, inPipeline = null }) {
    
    let reqBody = { reqhelper: {}, reqquery: inPipeline }
    Object.assign(reqBody, { model: model });


    if (dispatch) {
        return await dispatch(act_aggregate({ actionType, dataToSubmit: reqBody }))

    } else {

        return await myprops.dispatch(act_aggregate({ actionType, dataToSubmit: reqBody }))

    }
}
export async function plg_countDocuments({ viewparams = null, dispatch = null, model = null, myprops = null, actionType = null, inLimit = null, inSkip = null, inSearch = null, inQuery = null }) {

    let reqBody = { reqhelper: {}, reqquery: inQuery }
    Object.assign(reqBody, { model: model });

    if (inLimit) {
        Object.assign(reqBody.reqhelper, { limit: inLimit });
    } else if (!inLimit && viewparams) {
        Object.assign(reqBody.reqhelper, { limit: viewparams.limit });
    }

    if (inSkip) {
        Object.assign(reqBody.reqhelper, { skip: inSkip });
    } else if (!inSkip && viewparams) {
        Object.assign(reqBody.reqhelper, { skip: viewparams.skip });
    }

    if (inSearch) {
        // If I use inSearch, the whole object (searchtext, searchrange) needs to be inserted
        //   let inSearch =  {searchtext: 'text', searchrange: 'range', searchdepth: 'depth'}
        Object.assign(reqBody.reqhelper, { search: inSearch });
    } else if (!inSearch && viewparams) {
        Object.assign(reqBody.reqhelper, { search: {} });

        // && viewparams.search.value !== ''
        if (viewparams.search.value) {
            Object.assign(reqBody.reqhelper.search, { searchtext: viewparams.search.value });
        }
        if (viewparams.search.range) {
            Object.assign(reqBody.reqhelper.search, { searchrange: viewparams.search.range });
        }

    }

    if (dispatch) {
        return await dispatch(act_countDocuments({ actionType, dataToSubmit: reqBody }))

    } else {

        return await myprops.dispatch(act_countDocuments({ actionType, dataToSubmit: reqBody }))

    }


}
export async function plg_findOne_QueMod({ model = null, myprops = null, inQuery = null, actionType = null, populate = null, dispatch = null }) {

    let reqBody = { reqhelper: {}, reqquery: inQuery }
    Object.assign(reqBody, { model: model });

    if (populate) {
        Object.assign(reqBody.reqhelper, { populate: populate });
    }

    if (dispatch) {
        return await dispatch(act_findOne_QueMod({ dataToSubmit: reqBody, actionType }))
    } else {
        return await myprops.dispatch(act_findOne_QueMod({ dataToSubmit: reqBody, actionType }))
    }
}
export async function plg_removeFile_Cloudinary_v2({ model = null, dispatch = null, myprops = null, dataToSubmit = null, actionType = null }) {

    let reqBody = { reqhelper: {}, reqoperator: dataToSubmit }
    Object.assign(reqBody, { model: model });

    if (dispatch) {
        return await dispatch(act_removeFile_Cloudinary_v2({ dataToSubmit: reqBody, actionType }))

    } else {
        return await myprops.dispatch(act_removeFile_Cloudinary_v2({ dataToSubmit: reqBody, actionType }))
    }

}
export async function plg_uploadFile_Cloudinary_v2({
    dispatch = null,
    folder = null,
    myprops = null,
    fileFormData = null,
    actionType = null,
    uploaddefaultsize = null,
    uploadsizeheight = null,
    uploadsizewidth = null
}) {

    let reqBody = { reqhelper: {}, reqfileformdata: fileFormData, reqfilefolder: folder, requploaddefaultsize: uploaddefaultsize, requploadsizewidth: uploadsizewidth, requploadsizeheight: uploadsizeheight }

    const axiosheaders = {
        header: { 'content-type': 'multipart/form-data' }
    }

    if (dispatch) {
        return await dispatch(act_uploadFile_Cloudinary({ folder, dataToSubmit: reqBody, actionType, axiosheaders }))

    } else {
        return await myprops.dispatch(act_uploadFile_Cloudinary({ folder, dataToSubmit: reqBody, actionType, axiosheaders }))
    }
}
export async function plg_apiCall_mod_redux({ model = null, myprops = null, axiosconfig = null, actionType = null }) {

    return await myprops.dispatch(act_APIcall_mod_redux({ model, actionType, axiosconfig }))
}

export async function plg_sendMail({ to = null, from = null, html = null, subject = null, dispatch, myprops = null }) {

    let reqBody = { to, from, html, subject }
    return await act_sendMail({ dataToSubmit: reqBody })

}




