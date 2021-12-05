import React from "react";

import { useSelector } from 'react-redux'

// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(styles);

export default  function  FCTaxonomyListOne({ value, i, togglefunction, sumofchecked }) {
  let redux_overtheme_mysite = useSelector(state => state.mysite.OverthemeMysite)

    const classes = useStyles({overtheme: redux_overtheme_mysite});

    let render = () => {
      return <FormControlLabel
        control={
          <Checkbox
            // id={value._id}

            disableRipple
            tabIndex={-1}
            onClick={() => togglefunction({value, i})}
            checked={
              sumofchecked.find((chvalue) => chvalue._id === value._id) === value ? true : false
            }
            classes={{
              checked: classes.checked,
              root: classes.checkRoot,
            }}
          />
        }
        classes={{ label: classes.label }}
        label={value.name}
      />
    }

    return render()


  }