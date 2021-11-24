import {
    plg_findOne_QueMod,
  } from '../../utils/Plugs/cms_plugs';


export async function refreshHome({ dispatch = null,  myprops = null}) {

    let inQuery = {}
    Object.assign(inQuery, {
      isdefault: { "$eq": true },
      country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
      language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
    });
  
    await plg_findOne_QueMod({ model: 'page', dispatch, myprops, actionType: 'current_detail', inQuery })
  }

