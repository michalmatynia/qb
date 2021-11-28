import {
  plg_findOne_QueMod,
  plg_clearProps
} from '../../utils/Plugs/cms_plugs';


export async function refreshHome({ dispatch = null, myprops = null }) {

  // let inQuery = {}
  // Object.assign(inQuery, {
  //   isdefault: { "$eq": true },
  //   country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
  //   language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
  // });

  if(dispatch) {
  // await plg_findOne_QueMod({ model: 'page', dispatch, myprops, actionType: 'current_detail', inQuery })

  plg_clearProps({ dispatch, model: 'page', actionType: 'current_detail' })
  plg_clearProps({ dispatch, model: 'page', actionType: 'current_list' })
  plg_clearProps({ dispatch, model: 'visit', actionType: 'list' })

  } else {
  // await plg_findOne_QueMod({ model: 'page', myprops, actionType: 'current_detail', inQuery })

  plg_clearProps({ myprops, model: 'page', actionType: 'current_detail' })
  plg_clearProps({ myprops, model: 'page', actionType: 'current_list' })
  plg_clearProps({ myprops, model: 'visit', actionType: 'list' })

  }


}

