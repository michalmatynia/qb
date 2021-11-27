import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
// import Parallax from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Parallax/Parallax";
import Parallax from "../../../material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Parallax/ParallaxTransform";

// ============
// sections for this page

// import SectionLatestOffers from "./Sections/SectionLatestOffers.js";
import SectionProducts from "./Sections/SectionProducts.js";
// import SectionBlog from "./Sections/SectionBlog.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons

import styles from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/ecommerceStyle.js";
const useStyles = makeStyles(styles);

export default function EcommercePage({ list }) {

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });
  const classes = useStyles();

  return (
    <div className={classes.staticwrapper}>

      <Parallax
        item={list}
        filter={list.image_filter === 'transparent' ? null : list.image_filter }
        small
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}>{list.name}</h1>
                <h4 style={{color: 'lightgrey'}}>
                  {list.description}
                </h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionProducts
          mystore={list}
        />
      </div>
      </div>
  );
}
