import React from "react";
// nodejs library that concatenates classes
import cx from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/buttonStyle";
import processOverTheme from "../../../../../theming/Funcs/processOverTheme"

const useStyles = makeStyles(styles);

const RegularButton = React.forwardRef((props, ref) => {

  let currentmysite = useSelector(state => state.mysite.CurrentMysite)
  const [isOverTheme, setOverTheme] = React.useState();

  const classes = useStyles({overtheme: isOverTheme});


  React.useEffect(() => {

    if (!isOverTheme && currentmysite) {
      processOverTheme({currentmysite}).then((theme)=>{

        setOverTheme(theme)
      })
    }


  },[currentmysite, isOverTheme])

  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;

  const btnClasses = cx({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });

  return isOverTheme ? (
    <Button {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  ) : null
});

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "twitter",
    "facebook",
    "google",
    "linkedin",
    "pinterest",
    "youtube",
    "tumblr",
    "github",
    "behance",
    "dribbble",
    "reddit",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  children: PropTypes.node
};

export default RegularButton;
