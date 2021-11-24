import React, { useState, useCallback } from "react";

import { useSelector, useDispatch } from 'react-redux'

import {
    plg_findOne_QueMod,
  } from '../../../../../../components/utils/Plugs/cms_plugs';



export default function GrabProperPrice(props) {
  const dispatch = useDispatch()


  let redux_localeuser = useSelector(state => state.user.localeUser)
  let redux_current_mysite = useSelector(state => state.mysite.CurrentMysite)
  let redux_currencyuser = useSelector(state => state.user.currencyUser)
  let redux_productdetail = useSelector(state => state.product.detail)

  const [isPrice, setPrice] = useState();
  const [isValue, setValue] = useState(props.value ? props.value : undefined);

  const recalculatePrice = useCallback(async ({value}) => {
      let inQuery = {}
      Object.assign(inQuery, {
        country: { "$eq": redux_current_mysite.default_language.referenceID.alpha2Code },
        language: { "$eq": redux_current_mysite.default_language.referenceID.languages[0].iso639_1 },
        lgbinder: { "$eq": value.lgbinder }
      });

      let root_product = await plg_findOne_QueMod({ model: 'product', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })
  
      let convertedPrice = root_product.payload.price / redux_currencyuser.deflgrates[redux_current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(redux_currencyuser.rates)[0][1]
      let decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100
  
      return decimalPrice


  },[dispatch, redux_currencyuser.deflgrates, redux_currencyuser.rates, redux_current_mysite.default_language.referenceID.alpha2Code, redux_current_mysite.default_language.referenceID.currencies, redux_current_mysite.default_language.referenceID.languages])
  
    React.useEffect(() => {

      if (redux_current_mysite.default_language.referenceID.alpha2Code !== redux_localeuser.referenceID.alpha2Code
          ) {
           recalculatePrice({ value: isValue }).then((price) => setPrice(price))

          } else {
            setPrice(redux_productdetail.price)
          }


  },[isValue, recalculatePrice, redux_current_mysite.default_language.referenceID.alpha2Code, redux_localeuser.referenceID.alpha2Code, redux_productdetail.price])


    return isPrice ? isPrice : null

}