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


import GridContainer from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";


// style for this view
import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

export default function FormCustomInput({ formcell, change, formcellkey, sublistkey, tiedtoformkey }) {

    const [textcontainer, setTextcontainer] = React.useState("");

    const classes = useStyles();

    const renderTemplate = () => {
        let formTemplate = null;
        switch (formcell.category) {
            case ('ct_custominput'):
                formTemplate = (
                    <GridContainer>
                        <GridItem xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined} sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined} md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined} >
                            <CustomInput
                                value={formcell.value}
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

                                        formcell['valid'] = validated.isValid

                                        formcell['value'] = event.target.value

                                        change({ event, cell: { [formcellkey]: formcell }, sublistkey, tiedtoformkey })
                                    },
                                    ...formcell.inputprops,
                                    endAdornment: textcontainer.length > 0 ? <InputAdornment position="end"><div className={classes.danger}>{textcontainer.map((text) => { return text })}<Close className={classes.danger} />
                                    </div></InputAdornment> : null
                                }}

                            /></GridItem>
                    </GridContainer>
                )
                break;
            case ('ui_textareaautosize'):
                formTemplate = (
                    <GridContainer>
                        <GridItem xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined} sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined} md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined} >
                            <TextareaAutosize
                                value={formcell.value}
                                rowsMin={4}
                                placeholder={formcell.inputprops.placeholder ? formcell.inputprops.placeholder : null}
                                name={formcell.inputprops.name ? formcell.inputprops.name : null}

                                onChange={async (event) => {
                                    let validated = { isValid: false }
                                    if (formcell.validation.parse) {
                                        validated = validateForm({ formcell, event })
                                        setTextcontainer(validated.vtext)

                                    } else {
                                        validated.isValid = true
                                    }

                                    formcell['valid'] = validated.isValid

                                    formcell['value'] = event.target.value

                                    change({ event, cell: { [formcellkey]: formcell }, sublistkey, tiedtoformkey })
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                )
                break;
            default:
                formTemplate = null;
        }

        return formTemplate;

    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )


}
