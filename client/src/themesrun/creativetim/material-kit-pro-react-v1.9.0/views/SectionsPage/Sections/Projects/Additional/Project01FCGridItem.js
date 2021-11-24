import React from "react";

import Refresh from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Card from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import Button from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import GridItem from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import ProcessBackground from '../../../../../../../../functions/HookFuncs/ProcessBackground'



import projectsStyle from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";
const useStyles = makeStyles(projectsStyle);

function LoopCategory({ item, value }) {
    const classes = useStyles();
  
    return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
      return <h6 key={item._id} className={classes.cardCategoryWhite}>{item.name}</h6>
    }) : null
  }

export default function FCGridItem({ item, value, i, toggleModal }) {
    const classes = useStyles();
  
  // ============
  const addStylesForRotatingCards = () => {
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);

    for (let i = 0; i < rotatingCards.length; i++) {
      var rotatingCard = rotatingCards[i];
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      var rotatingWrapper = rotatingCard.parentElement;
      var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + "px";
      rotatingWrapper.style["margin-bottom"] = 30 + "px";
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      cardFront.style.height = cardHeight + 35 + "px";
      cardFront.style.width = cardWidth + "px";
      cardBack.style.height = cardHeight + 35 + "px";
      cardBack.style.width = cardWidth + "px";
    }
  };

  React.useEffect(() => {
    if (window) {
      window.addEventListener("resize", addStylesForRotatingCards);
    }
    addStylesForRotatingCards();
    return function cleanup() {
      if (window) {
        window.removeEventListener("resize", addStylesForRotatingCards);
      }
    };
  });

    const [activeRotate2, setActiveRotate2] = React.useState("");
  
    let myimage = value.referenceID.images.length > 0 ? value.referenceID.images[0].secure_url : '/images/image_not_availble.png'
  
    let dynamic_sm = i === 2 ? 12 : 6
    let dynamic_md = i === 2 ? 12 : 6
  
    let render = () => {
  
      return <GridItem xs={12} sm={dynamic_sm} md={dynamic_md} lg={4}>
                <div
                  className={
                    classes.rotatingCardContainer +
                    " " +
                    classes.manualRotate +
                    " " +
                    activeRotate2
                  }
                >
                  <Card className={classes.cardRotate}>
                    <div
                      className={
                        classes.front + " " + classes.wrapperBackground
                      }
                      style={{ backgroundImage: `url(${myimage})` }}
                    >
                      <CardBody background className={classes.cardBodyRotate}>
                        {value.referenceID.title ? <h6 key={item._id} className={classes.cardCategoryWhite}>{value.referenceID.title}</h6> : <LoopCategory value={value} item={item}/>}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <h3 className={classes.cardTitleWhite}>
                          {value.referenceID.name}
                          </h3>
                        </a>
                        <p className={classes.cardDescriptionWhite}>
                        {value.referenceID.description}
                        </p>
                        <div className={classes.textCenter}>
                          <Button
                            round
                            color="danger"
                            onClick={() =>
                              setActiveRotate2(classes.activateRotate)
                            }
                          >
                            <Refresh /> {item.title}
                          </Button>
                        </div>
                      </CardBody>
                    </div>
                    <div
                      className={classes.back + " " + classes.wrapperBackgroundNoFilter}
                    >
                      {/* <ProcessBackground
                    list={value.referenceID}
                >    */}
                      <CardBody background className={classes.cardBodyRotate}>
                        <div className={classes.textCenter}>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <Button round justIcon color="success"
                          onClick={() => toggleModal({cb_toggle: true, value})}
                          >
                          <Icon fontSize="large">fullscreen</Icon>
  
                          </Button>
                          <br />
                          <Button
                            round
                            color="danger"
                            onClick={() => setActiveRotate2("")}
                          >
                            <Refresh /> {item.title}...
                          </Button>
                        </div>
                      </CardBody>
                      {/* </ProcessBackground >    */}
                    </div>
                  </Card>
                </div>
              </GridItem>
    }
    return render()
  }