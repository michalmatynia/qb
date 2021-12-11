import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import CustomInput from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomInput/CustomInput.js";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    TextareaAutosize,
} from '@material-ui/core';

// material ui icons
import Close from "@material-ui/icons/Close";

import { validateForm } from "./validateForm"


import GridContainer from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";


// style for this view
import styles from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

export default function FormCustomInput({ formcell, formcellkey, value, change, sublistkey, tiedtoformkey }) {

    const [textcontainer, setTextcontainer] = React.useState("");

    const classes = useStyles();

    return (   <GridContainer>
        <GridItem xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined} sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined} md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined} >
            <CustomInput
                value={value}
                labelText={formcell.configparams.showlabel ? formcell.config.label : null}
                helperText={formcell.configparams.showhelpertext ? formcell.config.helpertext : null}
                formControlProps={formcell.formcontrolprops}
                inputProps={{
                    onChange: async (event) => {
                        let validated = { isValid: false }
                        if (formcell.validation.parse) {
                            validated = validateForm({ formcell, event })
                            setTextcontainer(validated.vtext)
                        } else {
                            validated.isValid = true
                        }
                        // formcell['valid'] = validated.isValid
                        change({ event, cell: { [formcellkey]: formcell }, isValid: validated.isValid, value: event.target.value, sublistkey, tiedtoformkey })
                    },
                    ...formcell.inputprops,
                    endAdornment: textcontainer.length > 0 ? <InputAdornment position="end"><div className={classes.danger}>{textcontainer.map((text) => { return text })}<Close className={classes.danger} />
                    </div></InputAdornment> : null
                }}

            /></GridItem>
    </GridContainer>
    )


}
