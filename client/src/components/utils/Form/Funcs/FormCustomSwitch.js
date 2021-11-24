import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/core components
import FormControlLabel from "@material-ui/core/FormControlLabel";

// material ui icons
import Switch from "@material-ui/core/Switch";
import { stringToBoolean } from "../../Funcs/basefuncs"
import { validateForm } from "./validateForm"

import GridContainer from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";

// style for this view
import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
// function that returns true if value is email, false otherwise

const useStyles = makeStyles(styles);

export default function FormCustomSwitch({ formcell, change, formcellkey }) {

    const classes = useStyles();

    const renderTemplate = () => {

        let formTemplate = null;
        switch (formcell.category) {
            case ('ct_customswitch'):
                formTemplate = (
                    <GridContainer>
                        <GridItem xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined} sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined} md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined}>
                            <FormControlLabel
                                {...formcell.formcontrolprops}
                                control={
                                    <Switch
                                        checked={formcell.value}
                                        onChange={(event) => {
                                            let validated = { isValid: false }
                                            if (formcell.validation.parse) {
                                                validated = validateForm({ formcell, event })

                                            } else {
                                                validated.isValid = true
                                            }

                                            if (validated) {
                                                formcell['valid'] = validated.isValid
                                            }
                                            formcell['value'] = stringToBoolean(event.target.value)
                                            change({event,  cell: { [formcellkey]: formcell } })
                                        }}
                                        value={!formcell.value}
                                        classes={{
                                            switchBase: classes.switchBase,
                                            checked: classes.switchChecked,
                                            thumb: classes.switchIcon,
                                            track: classes.switchBar
                                        }}
                                    />
                                }
                                inputprops={{...formcell.inputprops}}

                                classes={{
                                    label: classes.label
                                }}
                                label={formcell.configparams.showlabel ? formcell.config.label : null}
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

