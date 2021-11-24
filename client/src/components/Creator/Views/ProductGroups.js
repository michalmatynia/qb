import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import Button from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

// core components
import Info from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Typography/Info.js";

import styles from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector,
  //  useDispatch 
} from 'react-redux'

const useStyles = makeStyles(styles);

export default function SectionProductGroups({ mystore, productgroup, addTaxos, isCategoryArray }) {

  let currencyuser = useSelector(state => state.user.currencyUser)


  const classes = useStyles();
  // function loopCategories(array, parent_id) {


  // }

  function loopChecked({array, parent_id}) {

    return array.map((item, index) => {

      return <div key={item.referenceID._id + '-' + parent_id} id={item.referenceID._id + '-' + parent_id} style={{ fontSize: '12px' }}>{item.quantity}x {item.referenceID.name}<br /></div>
    })
  }
  function loopProductGroup({ productgroup }) {


    return productgroup ? productgroup.map((eachone) => {
      let productgroup_image = eachone.images.length > 0 ? eachone.images[0].secure_url : '/images/image_not_availble.png'


      return <GridItem key={eachone._id} xs={12} sm={4} md={4}>
        <Card blog>
          <CardHeader image>
            <a href="#pablo">
              <img src={productgroup_image} alt="..." />
            </a>
            <div
              className={classes.coloredShadow}
              style={{
                backgroundImage: "url(" + productgroup_image + ")",
                opacity: "1",
              }}
            />
          </CardHeader>
          <CardBody>
            <Info>
              <h6>{eachone.price} {Object.keys(currencyuser.rates)}</h6>
            </Info>
            <h4 className={classes.cardTitle}>
              <a href="#pablo">
                {eachone.name}
              </a>
            </h4>
            <p className={classes.description}>
              {eachone.description}
              {/* <a href="#pablo"> Read More </a> */}
            </p>
            {loopChecked({array: eachone.checked, parent_id: eachone._id})}

            {/* {loopCategories({array: eachone.category, parent_id: eachone._id})} */}
            <Button
              color="rose"
              size="sm"
              style={{
                opacity: "0.9",
              }}
              onClick={(e) => {
                e.preventDefault();
                addTaxos({ eachone, target: 'creator' })}}
              className={classes.pullRight}
            >
              {mystore.buy_btn}
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    }) : null

  }

  return (
    <div className={classes.section}
      style={{
        paddingTop: "0"
      }}
    >
      <div className={classes.container}>
        <GridContainer
        // style={{
        //   paddingTop: "5%"
        // }}
        >
          {loopProductGroup({ productgroup })}
        </GridContainer>
      </div></div>
  )

}
