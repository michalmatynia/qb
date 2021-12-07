import React, { useCallback } from "react";
// nodejs library that concatenates classes
import cx from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { parseBlockstyle } from "../../../../../theming/Funcs/blockstyleFunc";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/buttonStyle";
const useStyles = makeStyles(styles);

const RegularButton = React.forwardRef((props, ref) => {
  let redux_overtheme_mysite = useSelector(state => state.mysite.OverthemeMysite)

  const [isBrickStyle, setBrickStyle] = React.useState();

  const [isLoading, setIsLoading] = React.useState(true);
  const classes = useStyles({ overtheme: redux_overtheme_mysite });


  const processStyle = useCallback(async (item) => {

    return await parseBlockstyle(item)
  }, [])

  React.useEffect(() => {

    if (props.item && isLoading) {

          if (props.item.blockstyle.length > 0) {
            processStyle({ item: props.item }).then((result) => {

              setBrickStyle(result)
              setIsLoading(false)

            })
          } else {

            setIsLoading(false)
            
          }

    } 

 
  }, [ isLoading,  processStyle, props.item])

  const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
  const dynoclasses = useDynoStyles();

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
    item,
    classCustomback,
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
    [classes.justIcon]: justIcon,
    [className]: className,
    [dynoclasses.btn_launch_innerbtn]: dynoclasses.btn_launch_innerbtn
  });

  return  (
    <Button {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  )
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
