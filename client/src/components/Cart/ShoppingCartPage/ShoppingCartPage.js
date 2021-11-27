import React, { useState, useCallback } from "react";

// nodejs library that concatenates classes
import cx from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useSelector } from 'react-redux'

import Parallax from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Parallax/Parallax.js";
import GridContainer from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Table from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Table/Table.js";
import Card from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";

import CheckoutModal from "../Checkout/index"
import { ShowMessages } from '../../Message/Generic/static_msg'
import processOverTheme from "../../../theming/Funcs/processOverTheme"
import loopCartItems from "./LoopCartItems"

import shoppingCartStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

const useStyles = makeStyles(shoppingCartStyle);

export default function ShoppingCartPage({ list }) {

  let currencyuser = useSelector(state => state.user.currencyUser)
  let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

  const [totalSum, setTotalSum] = useState(0);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [isShowMessage, setShowMessage] = useState(false);
  const [isOverTheme, setOverTheme] = React.useState();
  const classes = useStyles({ overtheme: isOverTheme });

  React.useEffect(() => {

    if (!isOverTheme && redux_currentmysite) {
      processOverTheme({ currentmysite: redux_currentmysite }).then((theme) => {
        setOverTheme(theme)
      })
    }


  }, [redux_currentmysite, isOverTheme])
  React.useEffect(() => {

    if (!isOverTheme && redux_currentmysite) {
      processOverTheme({ currentmysite: redux_currentmysite }).then((theme) => {
        setOverTheme(theme)
      })
    }
  }, [redux_currentmysite, isOverTheme])


  const cbTotalSum = useCallback(
    async (integer) => {
      setTotalSum(integer)

    }, [])

  const cbShowCheckModal = useCallback(
    async (boolean) => {

      setShowCheckModal(boolean)

    }, [])


  return (
    <div className={classes.staticwrapper} >
      {isShowMessage ? <ShowMessages
        visible={isShowMessage}
        message={list.ordersent_msg}
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
              className={cx(
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
      <div className={cx(classes.main, classes.mainRaised)} >
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
                  loopCartItems({
                    list,
                    cbTotalSum,
                    cbShowCheckModal
                  })

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
