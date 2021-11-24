import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/infoStyle";

const useStyles = makeStyles(styles);

export default function InfoArea(props) {
  const classes = useStyles();
  const { title, description, iconColor } = props;
  return (
    <div className={classes.infoArea}>
      <div className={classes.iconWrapper + " " + classes[iconColor]}>
        <props.icon className={classes.icon} />
      </div>
      <div 
        className={classes.descriptionWrapper}>
        <h4 className={classes.title} style={{ color: '#FFF' }}>{title}</h4>
        <p className={classes.description} style={{ color: '#FFF' }}>{description}</p>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray"
};

InfoArea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};
