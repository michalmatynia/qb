import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material ui icons
import Contacts from "@material-ui/icons/Contacts";

// core components
import GridContainer from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
// import GridItem from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";

import Card from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardIcon from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardIcon.js";
import CardBody from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";

import Button from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";

import SetElement from "./FormElement";

// style for this view
import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

export default function FormElement({
  myprops = null,
  mystate = null,
  formdata = null,
  model = null,
  change = null,
  remove = null,
  submit = null,
  save = null,
  removefile = null,
  changePosition = null,
  removeItem = null,
  changeSort = null,
  changeQuantity = null
}) {

  let poliglot = mystate.localStorage.poliglot
  let gatherElements = ({ formdata, change }) => {

    let ShowComponents = []

    for (let [key, value] of Object.entries(formdata)) {
      if (value.configparams.showfield) {
        ShowComponents.push(<SetElement
          myprops={myprops}
          mystate={mystate}
          key={key}
          formcellkey={key}
          formcell={value}
          change={change}
          remove={remove}
          removefile={removefile}
          changePosition={changePosition}
          removeItem={removeItem}
          changeSort={changeSort}
          changeQuantity={changeQuantity}
        />)
      }
    }
    return ShowComponents
  }
  const classes = useStyles();

  let generateButtons = ({ save, submit }) => {


    if (save) {
      return save ?
        <div>
          <Button
            onClick={(event) => { save({ event, translate: false }) }}
            color="rose">Save</Button>
          {poliglot ? <Button color="info"
            onClick={(event) => { save({ event, translate: true }) }}
          >with Translate</Button> : null}
        </div>
        : null

    } else if (submit) {
      return submit ?
        <div>
          <Button
            onClick={(event) => { submit({ event, translate: false }) }}
            color="rose">Submit</Button>
          {poliglot ? <Button color="info"
            onClick={(event) => { submit({ event, translate: true }) }}
          >with Translate</Button> : null}
        </div>
        : null
    }

  }


  return (
    <GridContainer>
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Contacts />
          </CardIcon>
          <h4 className={classes.cardIconTitle}> Add {model}</h4> 
        </CardHeader>
        <CardBody>
          {gatherElements({ formdata, change })}
          {generateButtons({ save, submit })}
        </CardBody>
      </Card>
    </GridContainer>
  );
}