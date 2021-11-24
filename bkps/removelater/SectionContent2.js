import React, { useCallback } from "react";
import { useSelector } from 'react-redux'

import cx from "classnames";

// core components
import GridContainer from "../../../../components/Grid/GridContainer.js";
import GridItem from "../../../../components/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// library used for cool animations
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";
import Zoom from 'react-reveal/Zoom';

import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import ProcessSingleImage from '../../../../../../../functions/HookFuncs/ProcessSingleImage'

import contentStyle from "../../../../assets/jss/material-kit-pro-react/views/presentationSections/contentStyle.js";
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'

// images
const useStyles = makeStyles(contentStyle);

export function SectionContent01({ item, i }) {

  const [isBrickStyle, setBrickStyle] = React.useState();

  const processStyle = useCallback(async (item) => {
    return await parseBlockstyle(item)
  }, [])

  React.useEffect(() => {

    processStyle({ item }).then((result) => {
      setBrickStyle(result)
    })
  }, [item, processStyle])

  const classes = useStyles();

  // console.log(isBrickStyle);
  const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
  const dynoclasses = useDynoStyles();

  const loopImages = useCallback(
    ({ item }) => {
      function isOdd(num) { return num % 2; }

      let parentClassName
      let parentStyle
      let animateIn
      parentStyle = { margin: "0", padding: "0px" }
      /* parentStyle={objectFit: "cover"} */
      return item.images.map((image, i) => {

        if (i === 0) {
          parentClassName = classes.ipadImg

          return <ProcessSingleImage
            key={image.asset_id}
            parentClassName={parentClassName}
            image={image}
            item={item}
            i={i}
            alt={'content'}
          />
        } else if (isOdd(i) && i > 0) {
          parentClassName = cx(classes.areaImg, parentStyle)
          animateIn = "animate__bounceInRight"

          return <div key={image.asset_id} className={classes.animeAreaImg}><ScrollAnimation delay={2} duration={2} animateIn={animateIn} key={i}>
            <ProcessSingleImage
              key={image.asset_id}
              parentClassName={parentClassName}
              parentStyle={parentStyle}
              image={image}
              item={item}
              i={i}
              alt={'content'}
            /></ScrollAnimation></div>

        } else if (!isOdd(i) && i > 0) {
          parentClassName = classes.infoImg
          animateIn = "animate__fadeInUp"

          return <div key={i} className={classes.animeInfoImg}><ScrollAnimation animateIn={animateIn} key={i}>
            <ProcessSingleImage
              key={image.asset_id}
              parentClassName={parentClassName}
              parentStyle={parentStyle}
              image={image}
              item={item}
              i={i}
              alt={'content'}
            /></ScrollAnimation></div>

        } else {
          return null
        }

      })
    }, [classes.animeAreaImg, classes.animeInfoImg, classes.areaImg, classes.infoImg, classes.ipadImg])

  const WrapperOutputNext = useCallback(
    (props) => {

      if (item.blockstyle.length > 0 && item.blockstyle[0].referenceID.images.length > 0 && !item.css_wrap_card) {

        return <ProcessAsWrapperBG
          props={props}
          list={item.blockstyle[0].referenceID}
          parentClassName={cx(classes.section, classes.wrapperasbg)}

        />
      } else {
        return <div className={cx(classes.section, classes.wrapperasbg)}>{props.children}</div>
      }


    }, [classes.section, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])

  return (
    <WrapperOutputNext>
      <div className={dynoclasses.dynamiccontainer}>

        <div className={classes.container} >
          <GridContainer justifyContent="center">
            <GridItem md={4}>
              <div className={classes.sectionDescription}>
                <div className={dynoclasses.name_outerdiv} >
                  <h3 className={cx(classes.title, dynoclasses.name_style) }>{item.name}</h3>
                </div>
                <div className={dynoclasses.title_outerdiv} >
                <h6 className={cx(classes.description, dynoclasses.title_style)}>
                  {item.title}
                </h6>
                </div>
                <div className={dynoclasses.description_outerdiv} >
                <h5 className={cx(classes.description, dynoclasses.description_style)}>
                  {item.description}
                </h5></div>
              </div>
            </GridItem>
            <GridItem md={7} className={classes.mlAuto}>
              <div className={classes.imageContainer}>
                {loopImages({ item })}

              </div>
            </GridItem>
          </GridContainer>
        </div></div>
    </WrapperOutputNext>
  );

}
