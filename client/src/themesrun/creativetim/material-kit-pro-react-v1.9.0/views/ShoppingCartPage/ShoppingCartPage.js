import React, { useState } from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

import Close from "@material-ui/icons/Close";
/* import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add"; */
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { useSelector, useDispatch } from 'react-redux'

import Parallax from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Parallax/Parallax.js";
import GridContainer from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Table from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Table/Table.js";
import Button from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import Card from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import {
  act_injectProp,
} from '../../../../../redux/actions/generic/generic_actions';
import CheckoutModal from "../../../../../components/Modals/Checkout/index"
import { ShowMessages } from '../../../../../components/Message/Generic/static_msg'

import shoppingCartStyle from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

const useStyles = makeStyles(shoppingCartStyle);

export default function ShoppingCartPage({ list }) {

  let cart_user = useSelector(state => state.user.cartUser)
  let currencyuser = useSelector(state => state.user.currencyUser)

  const dispatch = useDispatch()

  const [totalSum, setTotalSum] = useState(0);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [isShowMessage, setShowMessage] = useState(false);

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
        <Button color="info" round onClick={() => setShowCheckModal(true)}>
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

    await dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))

  }
  async function changeQuantity({ value, direction, i }) {
    let newCart = [...cart_user]

    if (newCart[i].quantity + direction <= 0) {
      newCart[i].quantity = 0
    } else {
      newCart[i].quantity = newCart[i].quantity + direction

    }
    await dispatch(act_injectProp({ dataToSubmit: newCart, model: 'user', actionType: 'cart' }))

  }
  function loopCartItems() {

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
              color="info"
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
              color="info"
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

  const classes = useStyles();
  return (
    <div className={classes.staticwrapper} >
      {isShowMessage ? <ShowMessages
        visible={isShowMessage}
        message='Order Sent'
        color='success'
        place='bl'
      /> : null}
      <CheckoutModal
        list={list}
        showCheckModal={showCheckModal}
        toggleModal={(cb_toggle) => { setShowCheckModal(cb_toggle) }}
        toggleMessage={(cb_toggleMessage) => { setShowMessage(cb_toggleMessage) }}
        totalSum={totalSum}
        currencySymbol={Object.keys(currencyuser.rates)[0]}
      />
      <Parallax
        filter={list.image_filter}
        small
        item={list}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h2 className={classes.title}>{list.name}</h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} >
        <div className={classes.container}>
          <Card plain >
            <CardBody plain >
              <h3 className={classes.cardTitle}>{list.title}</h3>
              <Table
                tableHead={[
                  "",
                  list.product_thead,
                  list.column_one_thead,
                  list.column_two_thead,
                  list.variant_one_thead ? list.variant_one_thead : "",
                  list.variant_two_thead ? list.variant_two_thead : "",
                  list.price_thead,
                  list.quantity_thead,
                  list.amount_thead,
                  ""
                ]}
                tableData={
                  loopCartItems()

                }
                tableShopping
                customHeadCellClasses={[
                  classes.textCenter,
                  classes.description,
                  classes.description,
                  classes.textRight,
                  classes.textRight,
                  classes.textRight
                ]}
                customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                customCellClasses={[
                  classes.tdName,
                  classes.customFont,
                  classes.customFont,
                  classes.tdNumber,
                  classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                  classes.tdNumber + " " + classes.textCenter
                ]}
                customClassesForCells={[1, 2, 3, 4, 5, 6]}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div >
  );
}
