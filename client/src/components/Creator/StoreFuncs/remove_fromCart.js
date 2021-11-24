import {
    act_injectProp,
  } from '../../../redux/actions/generic/generic_actions';

export async function remove_fromCart({ event, value = null, itemkey, dispatch = null, cart_user = null}) {
  let newCart = [...cart_user]

  newCart.splice(itemkey, 1)

  await dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))

}