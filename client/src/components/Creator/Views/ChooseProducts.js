import React from "react";
// nodejs library that concatenates classes
// plugin that creates slider
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuBook from "@material-ui/icons/MenuBook";
import Add from "@material-ui/icons/Add";

// @material-ui icons
import GridContainer from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardIcon from "../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardIcon.js";

import CardBody from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import Button from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
// import FormCustomInput from '../../Form/Custom/Input/FormCustomInput.js'
import ShowTaxoTable from '../Table/ShowTaxoTable.js'
import MiniCart from '../Table/MiniCart'

import styles from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector,
  //  useDispatch 
  } from 'react-redux'
import { headerparams } from "./Stateparams/chooseProd_tbl_headerparams"
import { viewparams } from "./Stateparams/chooseProd_view_params"
import { rowparams } from "./Stateparams/chooseProd_tbl_rowparams"
import { rowparams_cart } from "./Stateparams/cartProd_tbl_rowparams"


const useStyles = makeStyles(styles);

export default function SectionProducts({ isProductArray, isCreatorCart, removeItem, toggleItem, addMeal, changeQuantity, isSumOfQuantity, isLimitOfQuantity, isLimitOfQuantityName, isPriceRound }) {

/*   const dispatch = useDispatch() */
  let currencyuser = useSelector(state => state.user.currencyUser)

  const classes = useStyles();

  // =============== TABLE ACTIONS
  // async function onSearch({ event, blur, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) {

  //   // let newLocalStorage = { ...this.state.localStorage }

  //   // const cellkey = Object.keys(cell)[0]
  //   // const cellvalue = Object.values(cell)[0]

  //   // newLocalStorage[cellkey] = cellvalue
  //   // this.updateLocalStorage(newLocalStorage)

  //   // await search_inDatabase({
  //   //     value,
  //   //     blur,
  //   //     event,
  //   //     sublistkey,
  //   //     tiedtoformkey,
  //   //     mystate: this.state,
  //   //     myprops: this.props,
  //   //     poliglot: this.state.localStorage.poliglot,
  //   //     newLocalStorage
  //   // })
  // }

  // async function onToggleCheck({ event, value = null }) {

  //   // await toggle_addToCart({
  //   //   value,
  //   //   dispatch,
  //   //   cart_user,
  //   // })

  //   let cart_item

  // }
  return (
    <div className={classes.section}
      style={{
        paddingTop: '1%',
        // marginLeft: '0px',
        // marginRight: '0px',
        // paddingLeft: '0px',
        // paddingRight: '0px',
      }}
    >
      <div className={classes.container}
        style={{
          paddingLeft: '0px',
          paddingRight: '0px',
          // marginLeft: '0px',
          // marginRight: '0px'

        }}
      >
        <GridContainer
          style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            // marginLeft: '0px',
            // marginRight: '0px'
          }}
        >
          <GridItem xs={6} sm={6} md={6}
            style={{
              overflowY: 'scroll',
              height: '600px',
              paddingLeft: '0px',
              paddingRight: '0px',
              marginLeft: '0px',
              marginRight: '0px'
            }}>
            {/* <FormCustomInput
            sublistkey='sublist'
            tiedtoformkey='checked'
            formcell={myViewParams.search}
            formcellkey='search'
            change={({ event, cell, sublistkey, tiedtoformkey }) => onSearch({
              event,
              cell,
              sublistkey,
              tiedtoformkey
            })}
          /> */}

            <ShowTaxoTable
              model={'product'}
              list={isProductArray}
              headerparams={headerparams}
              viewparams={viewparams}
              rowparams={rowparams}
              toggleItem={toggleItem}

            // ================
            // changeSort={({ event, sublistkey, tiedtoformkey }) => {
            //     return this.onChangeSort({
            //         event,
            //         sublistkey,
            //         tiedtoformkey
            //     })
            // }}

            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}

            style={{
              paddingRight: '0'
            }}
          >
            <Card>
              <CardHeader color="danger" icon="true">
                <CardIcon color="warning">
                  <MenuBook />
                </CardIcon>
                <h4 className={classes.cardIconTitle}> Ihre Auswahl </h4>
              </CardHeader>
              <CardBody
                style={{
                  overflowY: 'scroll',
                  height: '400px'
                }}>
                <MiniCart
                  list={isCreatorCart}
                  headerparams={[]}
                  viewparams={viewparams}
                  rowparams={rowparams_cart}
                  changeQuantity={changeQuantity}
                  removeItem={removeItem}
                />
              </CardBody><CardBody
                style={{
                  // backgroundColor: 'lightgrey',
                  // verticalAlign: "center",
                  // marginTop: "2%",

                  paddingTop: "1%",
                  paddingBottom: "1%",

                }}>
                <h4 className={classes.cardTitle}> {isSumOfQuantity} von {isLimitOfQuantity} {isLimitOfQuantityName} ausgewählt</h4>
              </CardBody>
              <CardFooter style={{
                backgroundColor: 'lightgrey',
                // verticalAlign: "center",
                // marginTop: "2%",

                paddingTop: "2%",
                paddingBottom: "2%",

              }}>
                <Button
                  // link
                  style={{

                    marginRight: "3%",
                    // verticalAlign: "center",
                    // textAlign: "centre"
                  }}
                  onClick={addMeal}

                  justIcon
                  size="lg"
                  className={classes.pullRight + " " + classes.refineButton}
                ><Add />
                </Button><span>
                  <h4 className={classes.cardTitle}> Extra {isLimitOfQuantityName} hinzubuchen</h4>
                  <h6 className={classes.cardTitle}> Pro Person nur {isPriceRound} {Object.keys(currencyuser.rates)}</h6>
                </span>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}