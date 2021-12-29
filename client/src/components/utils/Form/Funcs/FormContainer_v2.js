
import React, { useCallback } from "react";
// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";

// // material ui icons
import Contacts from "@material-ui/icons/Contacts";
import SetElement from "./FormElement";

// core components
import GridContainer from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
// import GridItem from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";

import Card from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardIcon from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardIcon.js";
import CardBody from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";

import Button from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import styles from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);
export default function FormContainer({
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
  changeQuantity = null,
  localStorage = null,
  isComponentType = null
}) {

  const [isFormColor, setFormColor] = React.useState();

  let poliglot = localStorage.poliglot

  let gatherElements = useCallback((props) => {
    let ShowComponents = []

    for (let [key, value] of Object.entries(formdata)) {
      if (value.configparams.showfield) {
        ShowComponents.push(<SetElement
          localStorage={localStorage}
          key={key}
          formcellkey={key}
          formcell={value}
          change={props.change}
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
  },[changePosition, changeQuantity, changeSort, formdata, localStorage, remove, removeItem, removefile])


  React.useEffect(() => {

    if(isComponentType === 'edit') {
      setFormColor('info')
    } else if(isComponentType === 'add') {
      setFormColor('primary')
    }
  },[isComponentType])

  const classes = useStyles();

  let generateButtons = ({ save, submit }) => {


    if (isComponentType === 'edit') {
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

    } else if (isComponentType === 'add') {
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


    const MemoizedWrapper = useCallback(
    (props ) => {

      return <GridContainer>
      <Card>
        <CardHeader color={isFormColor} icon>
          <CardIcon color={isFormColor}>
            <Contacts />
          </CardIcon>
          <h4 className={classes.cardIconTitle}> { isComponentType.toUpperCase()} {model.toUpperCase()}</h4> 
        </CardHeader>
        <CardBody>
          {props.children}
         
        </CardBody>
      </Card>
    </GridContainer>

    },[classes.cardIconTitle, isComponentType, isFormColor, model]
    )

  return <MemoizedWrapper>{gatherElements({ formdata, change })} {generateButtons({ save, submit })} </MemoizedWrapper>

}
