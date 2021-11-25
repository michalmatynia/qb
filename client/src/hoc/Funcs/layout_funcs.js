import { act_injectProp } from '../../redux/actions/generic/generic_actions';


import {
    plg_findOne_QueMod,
} from '../../components/utils/Plugs/cms_plugs';

export async function layoutFuncs_findCurrency({ localeuser = null,  myprops = null, currentmysite = null, dispatch = null }) {

    if(!currentmysite && myprops) {
        currentmysite = myprops.mysite.CurrentMysite
    }
   
    let inQuery = {
        name: { "$eq": currentmysite.conversion_engine }
    }

    let engine = await plg_findOne_QueMod({ model: 'transengine', myprops, dispatch, actionType: 'samestate', inQuery })

    let matchCurrency = {}

    for (const [key, value] of Object.entries(engine.payload.syncdata.rates)) {
        if (currentmysite.default_language.referenceID.currencies[0].code === key) {
            Object.assign(matchCurrency, { deflgrates: { [key]: value } });
            break
        }
    }
    if (matchCurrency.deflgrates === undefined) {
        Object.assign(matchCurrency, { deflgrates: { [engine.payload.syncdata.base]: 1 }});
    }

    for (const [key, value] of Object.entries(engine.payload.syncdata.rates)) {
        if (localeuser.referenceID.currencies[0].code === key) {
            Object.assign(matchCurrency, { rates: { [key]: value }, base: engine.payload.syncdata.base });
            break
        }
    }
    if (matchCurrency.rates === undefined) {
        Object.assign(matchCurrency, { rates: { [engine.payload.syncdata.base]: 1 }, base: engine.payload.syncdata.base });
    }
    if(dispatch) {
         dispatch(act_injectProp({ dataToSubmit: matchCurrency, model: 'user', actionType: 'currency' }))

    } else {
         myprops.dispatch(act_injectProp({ dataToSubmit: matchCurrency, model: 'user', actionType: 'currency' }))
    }   
}
