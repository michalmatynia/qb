import React, {useCallback} from "react";
import cx from "classnames";

// nodejs library that concatenates classes
import Carousel from "react-slick";

import { makeStyles } from "@material-ui/core/styles";


import FCGridItem from './FCGridItem'
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
    reveal_array_name_sub,
    reveal_array_description_sub,
  } from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

import headersStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

const useStyles = makeStyles(headersStyle);


export function SectionHeadersHeader03({ item, i }) {


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

const loopChecked = useCallback(
    ({ item }) => {
        return item.checked.map((value, i) => {
            return <FCGridItem
                value={value}
                item={item}
                i={i}
                key={value.referenceID._id}
                name={<h1 className={cx(classes.title, dynoclasses.name_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name_sub}>{value.referenceID.name}</FuncRevealWrapper></h1>}
                description={<h4 className={cx(
                  dynoclasses.description_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description_sub}>{value.referenceID.description}</FuncRevealWrapper></h4>
                 }
            />
        })
    }, [classes.title, dynoclasses.description_sub_style, dynoclasses.name_sub_style])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };
  return (

    !isLoading ? <Carousel {...settings} >

      {loopChecked({ item })}

    </Carousel> : null
  );
}