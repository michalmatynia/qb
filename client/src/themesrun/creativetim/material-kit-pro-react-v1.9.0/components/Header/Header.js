import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import Fade from 'react-reveal/Fade';
import processOverTheme from "../../../../../theming/Funcs/processOverTheme"

import Button from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

// core components
import styles from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/headerStyle.js";
import { useSelector, useDispatch } from 'react-redux'

import {
  refreshHome
} from '../../../../../components/utils/Funcs/shortcut_funcs';

const useStyles = makeStyles(styles);

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

export default function Header(props) {
  let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

  const [isOverTheme, setOverTheme] = React.useState();

  React.useEffect(() => {

    if (!isOverTheme && redux_currentmysite) {
      processOverTheme({ currentmysite: redux_currentmysite }).then((theme) => {

        setOverTheme(theme)
      })
    }
  }, [redux_currentmysite, isOverTheme])

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles({ overtheme: isOverTheme });

  console.log(hasWhiteSpace(classes.primary));
  console.log(hasWhiteSpace(classes.customcolor));

  let dispatch = useDispatch()

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;

    const windowsScrollTop = window.pageYOffset;


    let class_var
    let change_color_on_scroll_var

    if(hasWhiteSpace(classes[color])) {
      class_var = classes[color].split(" ");

    } else {
          // filter: 'blur(3px)',
          class_var = classes[color]
    }

    if(hasWhiteSpace(classes[changeColorOnScroll.color])) {
      change_color_on_scroll_var = classes[changeColorOnScroll.color].split(" ");

    } else {
      change_color_on_scroll_var = classes[changeColorOnScroll.color]
    }

    console.log(change_color_on_scroll_var);

    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(class_var);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(change_color_on_scroll_var);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(class_var);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(change_color_on_scroll_var);
    }
  };

  const { color, links, fixed, absolute, images } = props;

  let logostring
  if (images) {
    logostring = images.length > 0 ? `url(${images[0].secure_url}) no-repeat` : null

  } else {
    logostring = null
  }

  // let backgroundstring = logo ? `url(${logo[0].secure_url}) no-repeat` : null

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {
          images ?
          <Fade duration={1000}><Link
              to="/"
              onClick={() => refreshHome({ dispatch})}
            >
              <div
                style={{
                  height: `60px`,
                  width: `200px`,
                  background: logostring,
                }}></div></Link></Fade>
            : null
        }      

        <Hidden smDown implementation="css" className={classes.hidden}>
          <div className={classes.collapse}>{links}</div>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.closeButtonDrawer}
          >
            <Close />
          </IconButton>
          <div className={classes.appResponsive}>{links}</div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
    "customcolor"
  ]),
  links: PropTypes.node,
  logo: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
      "customcolor",
      "customcolorscrollon"
    ]).isRequired,
  }),
};
