import React, { useState, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Button from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import {
  act_injectProp,
} from '../../../redux/actions/generic/generic_actions';
import {
  plg_clearProps
} from '../../utils/Plugs/cms_plugs';

import Tooltip from "@material-ui/core/Tooltip";

import Close from "@material-ui/icons/Close";

import shoppingCartStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

const useStyles = makeStyles(shoppingCartStyle);

export default function LoopCartItems({ list, cbTotalSum, cbShowCheckModal }) {

  const dispatch = useDispatch()

  let currencyuser = useSelector(state => state.user.currencyUser)

  let cart_user = useSelector(state => state.user.cartUser)
  let redux_overtheme_mysite = useSelector(state => state.mysite.OverthemeMysite)

  const classes = useStyles({ overtheme: redux_overtheme_mysite });

  const [totalSum, setTotalSum] = useState();
  const [totalQuantity, setTotalQuantity] = useState();

  const [isSummary, setSummary] = React.useState();
  const [isNoItems, setNoItems] = React.useState();
  const [isMainTable, setMainTable] = React.useState();




  React.useEffect(() => {
    if (cart_user) {
      cbTotalSum(totalSum)
    }
  }, [cart_user, cbTotalSum, totalSum])

  /* Clear when no Cart User */

  React.useEffect(() => {

    if(!cart_user) {
      setTotalSum()
      setNoItems()
      setSummary()
    }
  
  },[cart_user])
  

  React.useEffect(() => {

    if (cart_user) {
      let sum_of_products = cart_user.reduce((accum, currentValue) => {
        return accum + currentValue.quantity
      }, 0)

      setTotalQuantity(sum_of_products)
    }

  }, [cart_user])

  React.useEffect(() => {
    async function calculateSum() {

      let sum_array = cart_user.map(item => {

        return item.referenceID.price * item.quantity

      })

      let sum_reduce = sum_array.reduce((accum, currentValue) => {
        return accum + currentValue
      }, 0)

      setTotalSum(Math.round((sum_reduce + Number.EPSILON) * 100) / 100)

    }

    if (!totalSum && totalSum !== 0 && !isSummary && !isNoItems
    ) {

      if (cart_user) {

        calculateSum()

      } else {

        setTotalSum(0)
      }

    }
  }, [cart_user, isNoItems, isSummary, totalSum])



  React.useEffect(() => {
    if (cart_user && !isSummary && (totalSum || totalSum === 0)) {

      let summary = {
        total_translate: list.total,
        purchase: true,
        colspan: "3",
        amount: (
          <span>
            <small>{Object.keys(currencyuser.rates)}</small> {totalSum}
          </span>
        ),
        col: {
          colspan: 3,
          text: (
            totalQuantity > 0 ? <Button color="secondary" round onClick={() => cbShowCheckModal(true)}>
              {list.complete_btn} <KeyboardArrowRight />
            </Button> : null
          )
        }
      }
      setNoItems()
      setSummary(summary)
    }
  }, [cart_user, cbShowCheckModal, currencyuser.rates, isSummary, list.complete_btn, list.total, totalQuantity, totalSum])

  React.useEffect(() => {

    if (!cart_user && !isNoItems && !isSummary && totalSum === 0) {

      let no_items = {
        total_translate: list.total,
        purchase: true,
        colspan: "3",
        amount: (
          <span>
            <small>{Object.keys(currencyuser.rates)}</small> {totalSum}
          </span>
        ),
        col: {
          colspan: 3,
          text: ('No items in Cart')
        }
      }

      setNoItems(no_items)
    }
  }, [cart_user, currencyuser.rates, isNoItems, isSummary, list.total, totalSum])



  const removeCartItem = useCallback(
    async ({ i }) => {

      if (cart_user) {
        let newCart = [...cart_user]

        newCart.splice(i, 1)

        /* Reset Total Counter */

  
        if (newCart.length === 0) {

          await plg_clearProps({ dispatch, model: 'user', actionType: 'cart' })

        } else {
          await dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))

        }
        setTotalSum()
        setSummary()
      }
    }, [cart_user, dispatch])

  const changeQuantity = useCallback(


    async ({ direction, i }) => {

      let newCart = [...cart_user]

      if (newCart[i].quantity + direction <= 0) {
        newCart[i].quantity = 0
      } else {
        newCart[i].quantity = newCart[i].quantity + direction

      }
      /* Reset Total Counter */


      await dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))
      setTotalSum()
      setSummary()


    }, [cart_user, dispatch])

  const parseMaintTable = useCallback(
    async () => {

      return cart_user ? cart_user.map((value, i) => {

         function loopTaxonomies(taxoarray, parent_id) {
          return taxoarray.map((item, index) => {
            return <div key={item._id + '-' + parent_id} id={item._id + '-' + parent_id} style={{ fontSize: '12px' }}>{item.name}<br /></div>
          })
        }


        return [
          <div className={classes.imgContainer} key={value.referenceID._id}>
            <img src={value.referenceID.images.length > 0 ? value.referenceID.images[0].secure_url : '/images/image_not_availble.png'} alt=".." className={classes.img} />
          </div>,
          <span key={value.referenceID._id}>
            <a href="#product" className={classes.tdNameAnchor}>
              {value.referenceID.name}
            </a>
            <br />
            <small className={classes.tdNameSmall}>{value.referenceID.description}</small>
          </span>,
          loopTaxonomies(value.referenceID.category, value.referenceID._id),
          loopTaxonomies(value.referenceID.type, value.referenceID._id),
          <div style={{ fontSize: '12px' }}>{value.variantone}</div>,
          <div style={{ fontSize: '12px' }}>{value.varianttwo}</div>,
          <span key={value.referenceID._id}>
            <small className={classes.tdNumberSmall}>{Object.keys(currencyuser.rates)}</small>  {Math.round((value.referenceID.price + Number.EPSILON) * 100) / 100}
          </span>,
          <span key={value.referenceID._id}>

            <div className={classes.buttonGroup}>
              <Button
                color="secondary"
                size="sm"
                style={{
                  opacity: "0.9",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
                className={classes.lastButton}
                onClick={() => changeQuantity({ value, direction: 1, i })}
              >
                <ArrowDropUpIcon />
              </Button>
              <div
                color="info"
                size="sm"
                // round
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  position: "relative",
                  display: "inline-block",
                  verticalAlign: "middle"

                }}
              >{value.quantity}
              </div>
              <Button
                color="secondary"
                size="sm"
                // round
                style={{
                  opacity: "0.9",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
                variant="text"
                className={classes.firstButton}
                onClick={() => changeQuantity({ value, direction: -1, i })}
              >
                <ArrowDropDownIcon />
              </Button>
            </div>
          </span>,
          <span key={value.referenceID._id}>
            <small className={classes.tdNumberSmall}>{Object.keys(currencyuser.rates)}</small> {Math.round((value.referenceID.price * value.quantity + Number.EPSILON) * 100) / 100}
          </span>,
          <Tooltip
            key={value.referenceID._id}
            id={value.referenceID._id}
            title="Remove item"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
          >
            <Button link className={classes.actionButton}
              onClick={() => { removeCartItem({ value, i }) }}
            >
              <Close />
            </Button>
          </Tooltip>
        ]
      }) : []



    }, [cart_user, changeQuantity, classes.actionButton, classes.buttonGroup, classes.firstButton, classes.img, classes.imgContainer, classes.lastButton, classes.tdNameAnchor, classes.tdNameSmall, classes.tdNumberSmall, classes.tooltip, currencyuser.rates, removeCartItem])

  React.useEffect(() => {

    if (cart_user && cart_user.length > 0 && isSummary) {

      parseMaintTable().then((maintable) => {

        maintable.push(isSummary)
        setMainTable(maintable)

      })
    } else if (!cart_user && isNoItems) {

      setMainTable([isNoItems])

    }

  }, [cart_user, isNoItems, isSummary, parseMaintTable])

  return isMainTable ? isMainTable : []
}