import { messageCompleted, messageLoading } from '../../GenericFuncs/errormsg_funcs'

import {
    plg_updateOne_queMod_oprMod,
} from '../../../../utils/Plugs/cms_plugs';
import {
    act_APIcall_mod
} from '../../../../../redux/actions/generic/generic_actions'
export async function nationFuncs_syncDataSet({ sublistkey = null, mystate = null, myprops = null, }) {

    let inQuery
    let inOperator
    let inParams
    let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

    await messageLoading({ myprops })

    let axiosconfig = {
        method: 'GET',
        baseURL: 'https://restcountries.com/v2/all',
        // mode: 'no-cors',
        withCredentials: true,
        // credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        // proxy: {
        //     host: 'localhost',
        //     port: 3000
        // }
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json',
        //   },
    }

    let restcountries = await act_APIcall_mod({ axiosconfig })


    // UPDATE
    if (restcountries.payload) {
        for (const value of Object.values(restcountries.payload)) {
            inQuery = { name:  { "$eq": value.name} }
            inOperator = { '$set': value }
            inParams = { upsert: true }

            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inParams, inQuery, inOperator })

        }
    }

    await messageCompleted({ myprops })


}