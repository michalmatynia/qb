import {
    act_injectProp,
  } from '../../../../redux/actions/generic/generic_actions';

export async function productFuncs_handleAddToCart({ value, variantOneSelect = null, variantTwoSelect = null, redux_cart_user, dispatch }) {

    let newCart = []
    let cart_item
  
    if (redux_cart_user) {
      newCart = [...redux_cart_user]
  
      // console.log(cart_user);
  
      let indexToChange = redux_cart_user.findIndex((item) => { return item.referenceID.lgbinder === value.lgbinder })
  
  
  // [variantOneSelect]
      if (indexToChange !== -1) {
  
        newCart[indexToChange] = {
          model: 'product',
          position: newCart[indexToChange].position,
          referenceID: value,
          quantity: newCart[indexToChange].quantity + 1,
          variantone: variantOneSelect && value.variant_one_taxo[variantOneSelect].visible ? value.variant_one_taxo[variantOneSelect].name : null,
          varianttwo: variantOneSelect && value.variant_two_taxo[variantTwoSelect].visible ? value.variant_two_taxo[variantTwoSelect].name : null
  
        }
      } else {
        cart_item = {
          model: 'product',
          position: redux_cart_user.length + 1,
          referenceID: value,
          quantity: 1,
          variantone: variantOneSelect && value.variant_one_taxo[variantOneSelect].visible ? value.variant_one_taxo[variantOneSelect].name : null,
          varianttwo: variantOneSelect && value.variant_two_taxo[variantTwoSelect].visible ? value.variant_two_taxo[variantTwoSelect].name : null
        }
  
        newCart.push(cart_item)
      }
  
    } else {
      cart_item = {
        model: 'product',
        position: 1,
        referenceID: value,
        quantity: 1,
        variantone: variantOneSelect && value.variant_one_taxo[variantOneSelect].visible ? value.variant_one_taxo[variantOneSelect].name : null,
        varianttwo: variantOneSelect && value.variant_two_taxo[variantTwoSelect].visible ? value.variant_two_taxo[variantTwoSelect].name : null
      }
  
      newCart.push(cart_item)
  
    }
  
     dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))
  
  };
