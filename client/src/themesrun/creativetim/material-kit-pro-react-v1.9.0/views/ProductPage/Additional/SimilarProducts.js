import React from "react";

import ProcessImage from '../../../../../../functions/HookFuncs/ProcessImage'
import { makeStyles } from "@material-ui/core/styles";


import Card from "../../../../material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../../material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../../material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import GridItem from "../../../../material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import cx from "classnames";

import { useHistory, useLocation } from "react-router-dom";

import GrabProperPrice from "./GrabProperPrice";

import productStyle from "../../../assets/jss/material-kit-pro-react/views/productStyle";

import { useSelector } from 'react-redux'
const useStyles = makeStyles(productStyle);


export default function LoopSimilarProducts(props) {

  let reactrouter_history = useHistory()


  const classes = useStyles();

  let redux_currencyuser = useSelector(state => state.user.currencyUser)

  // let iconArray = [LocalShipping, VerifiedUser]
  // let colorArray = ["info", "success", "rose"]

  async function gotoProductDetail({ value, cb_setLocalUser, cb_setIsLoading }) {


    cb_setIsLoading(true)
    cb_setLocalUser()

    reactrouter_history.push(`/detail/product/${value._id}`)


  }
  function loopTaxonomies(taxoarray, parent_id) {

    return taxoarray.length > 0 ? taxoarray.map((item, index) => {
      return <h6
      key={item._id + '-' + parent_id} id={item._id + '-' + parent_id}
      className={cx(
        classes.cardCategory,
        classes.textRose
      )}
    >
      {item.name}
    </h6> }) : null
  }

  return props.isSimilarProducts.length > 0 ? props.isSimilarProducts.map((eachitem, index) => {

    return <GridItem sm={6} md={3} key={eachitem._id}>
      <Card product className={classes.cardHoverLow}>
        <CardHeader image className={classes.cardHeaderHover}>
          <div style={{ cursor: 'pointer' }} onClick={(e) => { gotoProductDetail({ value: eachitem, cb_setLocalUser: props.cb_setLocalUser, cb_setIsLoading: props.cb_setIsLoading, cb_setSimilarProducts: props.cb_setSimilarProducts }) }} >
            <ProcessImage
              list={eachitem}
            /></div>

        </CardHeader>
        <CardBody>
          {loopTaxonomies(eachitem.category, eachitem._id)}
          <h4 className={classes.cardTitle}>{eachitem.name}</h4>
          <div className={classes.cardDescription}>
            {eachitem.description}
          </div>
        </CardBody>
        <CardFooter className={classes.justifyContentBetween}>
          <div className={classes.price}>
            <h4>
              <GrabProperPrice
                value={eachitem}
              /> {Object.keys(redux_currencyuser.rates)}
            </h4>
          </div>
          {/*         <div className={classes.stats}>
            <Tooltip
              id="tooltip-top"
              title="Save to Wishlist"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button justIcon color="rose" simple>
                <Favorite />
              </Button>
            </Tooltip>
          </div> */}
        </CardFooter>
      </Card>
    </GridItem>
  }) : null
}