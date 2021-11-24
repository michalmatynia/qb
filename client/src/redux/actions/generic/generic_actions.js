import axios from 'axios';

import { GENERIC_SERVER } from '../../../components/utils/misc';

import { getOutputType } from '../../actions/generic/generic_types';

// New function type
export async function act_findMany_queMod({ dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/find_many_que_mod`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_insertMany_ModMod({ dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/insertmany_mod_mod`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_deleteMany_ModMod({ dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/deletemany_mod_mod`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_updateOne_queMod_oprMod({ actionType = null, dataToSubmit = null }) {
    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/updateone_que_mod_opr_mod`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_create_oprMod({ dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/create_opr_mod`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_clearProps_v2({ dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    return {
        type: outputType,
        payload: undefined
    }
}
export async function act_removeOne_queMod({ actionType = null, dataToSubmit = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/removeone_que_mod`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }

}
export async function act_aggregate({ actionType = null, dataToSubmit = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/aggregate`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }

}
export async function act_countDocuments({ dataToSubmit = null, actionType = null }) {
    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/countdocuments`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_findOne_QueMod({ args = null, dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/findone_que_mod`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_uploadFile_Cloudinary({ dataToSubmit = null,  actionType = null, axiosheaders = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/uploadfile_cloudinary?folder=${dataToSubmit.reqfilefolder}&uploaddefaultsize=${dataToSubmit.requploaddefaultsize}&uploadsizewidth=${dataToSubmit.requploadsizewidth}&uploadsizeheight=${dataToSubmit.requploadsizeheight}`, dataToSubmit.reqfileformdata, axiosheaders)
    
    return {
        type: outputType,
        payload: request.data
    }
}

export async function act_removeFile_Cloudinary_v2({ dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    let request = await axios.post(`${GENERIC_SERVER}/removefile_cloudinary?`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_updateMany_queMod_oprMod({actionType = null, dataToSubmit = null }) {
    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })


    let request = await axios.post(`${GENERIC_SERVER}/updatemany_que_mod_opr_mod?`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_sendMail({ dataToSubmit = null }) {


    let request = await axios.post(`${GENERIC_SERVER}/sendmail`, dataToSubmit)

    return {
        payload: request.data
    }
}
export async function act_getCreds_Google() {

    let request = await axios.get(`${GENERIC_SERVER}/getGooglecreds`)

    return {
        payload: request.data
    }
}

export async function act_injectProp({dataToSubmit = null, model = null, actionType = null }) {

    const outputType = await getOutputType({ model, actionType })
    return {
        type: outputType,
        payload: dataToSubmit
    }
}
export async function act_APIcall_mod_redux({ model = null, actionType = null, axiosconfig = null }) {
    const outputType = await getOutputType({ model, actionType })

    let request = await axios(axiosconfig)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function act_APIcall_mod({  axiosconfig = null }) {

    let request = await axios(axiosconfig)

    return {
        payload: request.data
    }
}
export async function act_getGeoLocation() {

    let request = await axios.get(`${GENERIC_SERVER}/getGeoLocation`)

    return {
        payload: request.data
    }
}
// Old Function type



// export async function act_syncdata({ args = null, actionType = null, dataToSubmit = null }) {
//     const listOfArgs = await handleActionArgs(args)
//     const outputType = await setOutputType({ args, actionType })

//     let request = await axios.post(`${GENERIC_SERVER}/updatemany_que_mod_opr_mod?${listOfArgs}`, dataToSubmit)

//     return {
//         type: outputType,
//         payload: request.data
//     }
// }


