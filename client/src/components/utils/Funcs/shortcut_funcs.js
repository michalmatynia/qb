import {
  plg_findOne_QueMod,
  plg_clearProps
} from '../../utils/Plugs/cms_plugs';


export async function refreshHome({ dispatch = null, myprops = null }) {


  if(dispatch) {

  plg_clearProps({ dispatch, model: 'page', actionType: 'current_detail' })
  plg_clearProps({ dispatch, model: 'page', actionType: 'current_list' })
  plg_clearProps({ dispatch, model: 'visit', actionType: 'list' })

  } else {

  plg_clearProps({ myprops, model: 'page', actionType: 'current_detail' })
  plg_clearProps({ myprops, model: 'page', actionType: 'current_list' })
  plg_clearProps({ myprops, model: 'visit', actionType: 'list' })

  }


}

