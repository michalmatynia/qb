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
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
  reveal_array_name,
  reveal_array_description,
  reveal_array_title,
  reveal_array_image_all,
  reveal_array_image_one,
  reveal_array_image_two,
  reveal_array_image_three,
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'
import "animate.css/animate.min.css";
import ProcessSingleImage from '../../../../../../../functions/HookFuncs/ProcessSingleImage'

import contentStyle from "../../../../assets/jss/material-kit-pro-react/views/presentationSections/contentStyle.js";
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'

// images
const useStyles = makeStyles(contentStyle);

export function SectionContent01({ item, i }) {

  const [isBrickStyle, setBrickStyle] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const processStyle = useCallback(async (item) => {
    return await parseBlockstyle(item)
  }, [])
  
  React.useEffect(() => {
    if (item.blockstyle.length > 0) {
      processStyle({ item }).then((result) => {
  
        setBrickStyle(result)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  
  }, [item, processStyle])

  const classes = useStyles();

  const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
  const dynoclasses = useDynoStyles();

  const loopImages = useCallback(
    ({ item }) => {
      function isOdd(num) { return num % 2; }

      let parentClassName
      let parentStyle
      parentStyle = { margin: "0", padding: "0px" }
      /* parentStyle={objectFit: "cover"} */
      return item.images.length > 0 ? item.images.map((image, i) => {
      

        if (i === 0) {
          parentClassName = cx(classes.ipadImg, dynoclasses.image_one_style)

          return <FuncRevealWrapper key={image.asset_id}
          item={item} revealarray={reveal_array_image_one}>
            <ProcessSingleImage
              key={image.asset_id}
              parentClassName={parentClassName}
              image={image}
              item={item}
              i={i}
              alt={'content'}
            /></FuncRevealWrapper>
        } else if (isOdd(i) && i > 0) {
          parentClassName = cx(classes.areaImg, parentStyle, dynoclasses.image_two_style)

          return <div key={image.asset_id} className={classes.animeAreaImg}>
            <FuncRevealWrapper key={image.asset_id} item={item} revealarray={reveal_array_image_two}>
              <ProcessSingleImage
                key={image.asset_id}
                parentClassName={parentClassName}
                // parentStyle={parentStyle}
                image={image}
                item={item}
                i={i}
                alt={'content'}
              />
            </FuncRevealWrapper>
          </div>

        } else if (!isOdd(i) && i > 0) {
          parentClassName = cx(classes.infoImg, parentStyle, dynoclasses.image_three_style)

          return <div key={i} className={classes.animeInfoImg}>
            <FuncRevealWrapper key={image.asset_id} item={item} revealarray={reveal_array_image_three}><ProcessSingleImage
              key={image.asset_id}
              parentClassName={parentClassName}
              // parentStyle={parentStyle}
              image={image}
              item={item}
              i={i}
              alt={'content'}
            /></FuncRevealWrapper></div>

        } else {
          return null
        }

      }) : null
    }, [classes.animeAreaImg, classes.animeInfoImg, classes.areaImg, classes.infoImg, classes.ipadImg, dynoclasses.image_one_style, dynoclasses.image_three_style, dynoclasses.image_two_style])

  const WrapperOutputNext = useCallback(
    (props) => {
      try {
    
        if (item.blockstyle.length > 0 && !item.css_wrap_card) {

          if (item.blockstyle[0].referenceID.images.length > 0) {
            return <ProcessAsWrapperBG
            props={props}
            list={item.blockstyle[0].referenceID}
            parentClassName={cx(classes.section, classes.wrapperasbg)}
  
          />

          } else {
            throw item.blockstyle
          }
        } else {
          throw item.blockstyle
        }
      } catch (err) {
        return <div className={cx(classes.section, classes.wrapperasbg)}>{props.children}</div>
      }

    }, [classes.section, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])

  return (
    isLoading ? <WrapperOutputNext>
      <div className={dynoclasses.dynamiccontainer}>

        <div className={classes.container} >
          <GridContainer justifyContent="center">
            <GridItem md={4}>
              <div className={classes.sectionDescription}>
                <div className={dynoclasses.name_outerdiv} >
                  <h3 className={cx(classes.title, dynoclasses.name_style)}>
                    <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name}>{item.name}</FuncRevealWrapper>
                  </h3>
                </div>
                <div className={dynoclasses.title_outerdiv} >
                  <h6 className={cx(classes.description, dynoclasses.title_style)}>
                    <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title}>{item.title}</FuncRevealWrapper>
                  </h6>
                </div>
                <div className={dynoclasses.description_outerdiv} >
                  <h5 className={cx(classes.description, dynoclasses.description_style)}>
                    <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description}>{item.description}</FuncRevealWrapper>
                  </h5></div>
              </div>
            </GridItem>
            <GridItem md={7} className={classes.mlAuto}>
              <div className={cx(classes.imageContainer, dynoclasses.image_all_style)}>
              <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all}>{loopImages({ item })}</FuncRevealWrapper>

              </div>
            </GridItem>
          </GridContainer>
        </div></div>
    </WrapperOutputNext> : null
  );

}
