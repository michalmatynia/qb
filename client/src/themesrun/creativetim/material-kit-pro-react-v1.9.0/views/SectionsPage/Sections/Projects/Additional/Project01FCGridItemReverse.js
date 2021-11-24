import React, { useCallback } from "react";

import Refresh from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Card from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import Button from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import GridItem from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import ProcessAsWrapperBG from '../../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import FuncRevealWrapper from '../../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
    reveal_array_image_all_sub
} from '../../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'


import projectsStyle from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";

// import ProcessBackground from '../../../../../../../../functions/HookFuncs/ProcessBackground'

const useStyles = makeStyles(projectsStyle);

function LoopCategory({ item, value }) {
  const classes = useStyles();

  return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
    return <h6 key={item._id} className={classes.cardCategoryWhite}>{item.name}</h6>
  }) : null
}

export default function FCGridItem({ item, value, i, toggleModal, title, name, description, parentClass }) {
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

  // === Temat rotowanych filmów jest na potem
/* 
  const WrapperOutputNext = useCallback(
    (props) => {

      if (value.referenceID.images.length > 0) {

        return <ProcessAsWrapperBG
          props={props}
          list={value.referenceID}
          parentClassName={props.parentClassName}
        />
      } else {
        return <div className={props.parentClassName}>{props.children}</div>
      }

    }, [value.referenceID]) */

  let render = () => {
    let myimage = value.referenceID.images.length > 0 ? value.referenceID.images[0].secure_url : '/images/image_not_availble.png'

    return <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all_sub}><div
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
          className={classes.back + " " + classes.wrapperBackground}
          style={{ backgroundImage: `url(${myimage})` }}
        >            {/* <WrapperOutputNext> */}

          <CardBody background className={classes.cardBodyRotate}>
            {title}
            {name}
            {description}
            <div className={classes.textCenter}>
              <Button
                round
                color="github"
                onClick={() => setActiveRotate2("")}
              >
                <Refresh /> {item.title}...
              </Button>
            </div>

          </CardBody>
        </div>
        <div
          className={
            classes.front + " " + classes.wrapperBackgroundNoFilter
          }
          style={{ backgroundImage: `url(${myimage})` }}
        >

          <CardBody background className={classes.cardBodyRotate}>

            <div className={classes.textCenter}>
              <br />
              <br />
              <br />
              <br />
              <br />
              <Button round justIcon
                onClick={() => toggleModal({ cb_toggle: true, value })}
              >
                <Icon fontSize="large">fullscreen</Icon>
              </Button>
              <br />
              <Button
                round
                color="github"
                onClick={() =>
                  setActiveRotate2(classes.activateRotate)
                }
              >
                <Refresh /> {item.title}
              </Button>
            </div>

          </CardBody>
        </div>
      </Card>

    </div></FuncRevealWrapper>
  }
  return render()
}