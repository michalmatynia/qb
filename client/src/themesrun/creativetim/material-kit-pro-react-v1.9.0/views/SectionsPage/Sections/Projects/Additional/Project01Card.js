import React, {useCallback} from "react";

import Refresh from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Card from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import Button from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import GridItem from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";

import projectsStyle from "../../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";

// import ProcessBackground from '../../../../../../../../functions/HookFuncs/ProcessBackground'

const useStyles = makeStyles(projectsStyle);

function LoopCategory({ item, value }) {
    const classes = useStyles();
  
    return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
      return <h6 key={item._id} className={classes.cardCategoryWhite}>{item.name}</h6>
    }) : null
  }

export default function FCProject01Card({ item, value, i, toggleModal, list }) {
    const classes = useStyles();
  
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [isFileType, setIsFileType] = React.useState();

    React.useEffect(() => {

      async function processImage() {
          if (list.images[0].secure_url !== undefined) {

              // is Cloudinary
              setImagePreviewUrl(list.images[0].secure_url);
          } else {

              // is Blob
              let reader = new FileReader();
              reader.onloadend = () => {
                  setImagePreviewUrl(reader.result);
              };
              reader.readAsDataURL(list.images[0]);
          }
      }

      if (list.images.length > 0) {
          processImage()
      } else {
          setImagePreviewUrl(null);
      }

  }, [list.images])

  React.useEffect(() => {
    let parsedfiletype

    if (list.images.length > 0 && imagePreviewUrl) {

        if ('secure_url' in list.images[0]) {
            if (list.images[0].resource_type.includes('video')) { parsedfiletype = 'video' }
            else if (list.images[0].resource_type.includes('image')) { parsedfiletype = 'image' }
        } else {
            if (list.images[0].type.includes('video')) { parsedfiletype = 'video' }
            else if (list.images[0].type.includes('image')) { parsedfiletype = 'image' }
        }
    } else {
        parsedfiletype = 'image'
    }

    setIsFileType(parsedfiletype)
}, [imagePreviewUrl, list.images])

const MemoizedWrapper = useCallback(
  (props) => {


      if (isFileType === 'image') {

          return <div
              style={{ backgroundImage: `url(${imagePreviewUrl})` }}
          >
                  {props.children}
          </div>
      } else if (isFileType === 'video') {
          return <div

          ><video autoPlay loop muted
              style={{
                  // position: 'absolute',
                  width: "100%",
                  height: "100%",
                  flex: "100%",
                  display: "flex",
                  objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
              }}
               >
                  <source src={imagePreviewUrl ? imagePreviewUrl : null} type="video/mp4" />
              </video>
                  {props.children}
          </div>
      } else {
          return null
      }
  },
  [imagePreviewUrl, isFileType],
);
  // ============
  const addStylesForRotatingCards = () => {
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);

    console.log(rotatingCards);

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


    let render = () => {
  
      return <Card className={classes.cardRotate}>
                  {/* <div
                      className={classes.back + " " + classes.wrapperBackground}
                    > */}
                                        <div
                      className={classes.back + " " + classes.wrapperBackground}
                      style={{ backgroundImage: `url(${myimage})` }}
                    >
                      {/* <ProcessBackground
                    list={value.referenceID}
                >                       </ ProcessBackground >  */}

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
                          onClick={() => toggleModal({cb_toggle: true, value})}
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
    }
    return render()
  }