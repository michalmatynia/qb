import React from "react";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import Card from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import FormatQuote from "@material-ui/icons/FormatQuote";
import CardAvatar from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardAvatar.js";

import ProcessImage from '../../../../../../../functions/HookFuncs/ProcessImage'
import teamsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
    reveal_array_image_all_sub
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

const useStyles = makeStyles(teamsStyle);


// component Functions
export default function FCGridItem({ value, item, description, title, name, parentClass = null }) {
  // const { title, description, iconColor, vertical, className } = props;

  const classes = useStyles();


  let render = () => {
    return <Card testimonial className={parentClass}>
      <div className={classes.icon}>
        <FormatQuote />
      </div>
      <CardBody>{description}

      </CardBody>
      <CardFooter testimonial>{name}{title}
        <CardAvatar testimonial testimonialFooter>
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all_sub}>
            <ProcessImage
            list={value.referenceID}
            /></FuncRevealWrapper>
          </a>
        </CardAvatar>
      </CardFooter>
    </Card>
  }
  return render()
}



