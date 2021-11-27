import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Button from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import {
  act_injectProp,
} from '../../../redux/actions/generic/generic_actions';
import processOverTheme from "../../../theming/Funcs/processOverTheme"
import Tooltip from "@material-ui/core/Tooltip";

import Close from "@material-ui/icons/Close";

import shoppingCartStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

const useStyles = makeStyles(shoppingCartStyle);

export default function LoopCartItems({list, cbTotalSum}) {

  const dispatch = useDispatch()

  let currencyuser = useSelector(state => state.user.currencyUser)

  let cart_user = useSelector(state => state.user.cartUser)
  let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

  const [isOverTheme, setOverTheme] = React.useState();
  const [totalSum, setTotalSum] = useState(0);
  const [showCheckModal, setShowCheckModal] = useState(false);

  const classes = useStyles({ overtheme: isOverTheme });


  React.useEffect(() => {

    if (!isOverTheme && redux_currentmysite) {
      processOverTheme({ currentmysite: redux_currentmysite }).then((theme) => {

        setOverTheme(theme)
      })
    }


  }, [redux_currentmysite, isOverTheme])

  React.useEffect(() => {
    cbTotalSum(totalSum)
  },[cbTotalSum, totalSum])

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

    if (cart_user !== undefined
    ) {

      calculateSum()
    }
  }, [cart_user])

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
        <Button color="secondary" round onClick={() => setShowCheckModal(true)}>
          {list.complete_btn} <KeyboardArrowRight />
        </Button>
      )
    }
  }

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
      text: ('No items in Cart'
      )
    }
  }
  function loopTaxonomies(taxoarray, parent_id) {
    return taxoarray.map((item, index) => {
      return <div key={item._id + '-' + parent_id} id={item._id + '-' + parent_id} style={{ fontSize: '12px' }}>{item.name}<br /></div>
    })
  }
  async function removeCartItem({ value, i }) {
    let newCart = [...cart_user]

    newCart.splice(i, 1)

    dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))

  }
  async function changeQuantity({ value, direction, i }) {
    let newCart = [...cart_user]

    if (newCart[i].quantity + direction <= 0) {
      newCart[i].quantity = 0
    } else {
      newCart[i].quantity = newCart[i].quantity + direction

    }
    dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))

  }


  let maintable = cart_user ? cart_user.map((value, i) => {

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


  if (totalSum > 0) {

    maintable.push(summary)
  } else {
    maintable.push(no_items)
  }

  return maintable
}