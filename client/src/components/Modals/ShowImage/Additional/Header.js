import React from "react";
// nodejs library that concatenates classes
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import headersStyle from "../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";

const useStyles = makeStyles(headersStyle);

// component Functions
export function FCGridItem({ image, i }) {
  const classes = useStyles();

  return <div className={classes.imgContainer}
    style={{
      justifyContent: "center",
      display: "flex",
      alignItems: "center",

    }}
  > <img
      style={{
        maxHeight: `${window.innerHeight - 64}px`,
      }}
      src={image.secure_url} alt="..." />
  </div>

}

function loopChecked({ images }) {


  return images.map((image, i) => {
    return <FCGridItem
      image={image}
      i={i}
      key={i}
    />
  })

}
export default function SectionHeader({ images, item, i }) {

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

    <Carousel {...settings} >

      {loopChecked({ images })}

    </Carousel>
  );
}