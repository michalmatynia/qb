import React, { useCallback } from "react";

import cx from "classnames";

// core components
import GridContainer from "../../../../components/Grid/GridContainer.js";
import GridItem from "../../../../components/Grid/GridItem.js";
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'

import {
  reveal_array_name,
  reveal_array_description,
  reveal_array_title,
  reveal_array_image_all,
  reveal_array_image_one,
  reveal_array_image_two,
  reveal_array_image_three,
  reveal_array_image_four,
  reveal_array_image_five,
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ProcessSingleImage from '../../../../../../../functions/HookFuncs/ProcessSingleImage'


import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

import componentsStyle from "../../../../assets/jss/material-kit-pro-react/views/presentationSections/componentsStyle";
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
const useStyles = makeStyles(componentsStyle);

export function SectionComponents01({ item, i }) {


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

  // console.log(isBrickStyle);
  const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
  const dynoclasses = useDynoStyles();

  const RevealImageWrapper = useCallback(
    (props) => {
      return <FuncRevealWrapper key={item._id} item={item} revealarray={props.reveal_array_image}>{props.children}</FuncRevealWrapper>
    }, [item])
  const loopImages = useCallback(
    ({ item }) => {

      let parentStyle

      parentStyle = { objectFit: "cover" }
      return item.images.length > 0 ? item.images.map((image, i) => {

        let classes_array = [cx(classes.componentsMacbook, dynoclasses.image_one_style), cx(classes.shoppingCart, dynoclasses.image_two_style), cx(classes.cardImage, dynoclasses.image_three_style), cx(classes.twitterImage, dynoclasses.image_four_style), cx(classes.iconsImage, dynoclasses.image_five_style), cx(classes.repostImage, dynoclasses.image_five_style)]
        let reveal_array_image = [reveal_array_image_one, reveal_array_image_two, reveal_array_image_three, reveal_array_image_four, reveal_array_image_five]


        return <RevealImageWrapper key={image.asset_id} i={i} reveal_array_image={reveal_array_image[i]}><ProcessSingleImage
          key={image.asset_id}
          parentClassName={classes_array[i]}
          parentStyle={parentStyle}
          image={image}
          item={item}
          i={i}
          alt={'content'}
        /></RevealImageWrapper>

      }) : null

    }, [classes.cardImage, classes.componentsMacbook, classes.iconsImage, classes.repostImage, classes.shoppingCart, classes.twitterImage, dynoclasses.image_five_style, dynoclasses.image_four_style, dynoclasses.image_one_style, dynoclasses.image_three_style, dynoclasses.image_two_style])


  const WrapperOutputNext = useCallback(
    (props) => {
      try {

        if (item.blockstyle.length > 0 && !item.css_wrap_card) {

          if (item.blockstyle[0].referenceID.images.length > 0) {
            return <ProcessAsWrapperBG
              props={props}
              list={item.blockstyle[0].referenceID}
              parentClassName={classes.wrapperasbg}
            />

          } else {
            throw item.blockstyle
          }
        } else {
          throw item.blockstyle
        }
      } catch (err) {
        return <div
        >{props.children}</div>
      }

    }, [classes.wrapperasbg, item.blockstyle, item.css_wrap_card])

  return (
    !isLoading ? <WrapperOutputNext>
      <div className={dynoclasses.dynamiccontainer}>

        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem md={5} lg={5} sm={12} xs={12}>
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
            </GridItem>
            <GridItem xs={12} sm={12} md={6} lg={6} className={classes.mlAuto}>
              <div className={cx(classes.imageContainer, dynoclasses.image_all_style)}>
                <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all}>{loopImages({ item })}</FuncRevealWrapper>
              </div>
            </GridItem>
          </GridContainer>
        </div></div>
    </WrapperOutputNext> : null
  );
}
