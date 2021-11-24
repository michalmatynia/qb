import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/core components

// material ui icons
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import GridContainer from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import CustomDropdown from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomDropdown/CustomDropdown.js";

import { validateForm } from "./validateForm"

// style for this view
import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
// function that returns true if value is email, false otherwise

const useStyles = makeStyles(styles);

export default function FormCustomSelect({ formcell, change, formcellkey,  mystate }) {

    const classes = useStyles();

    const renderTemplate = () => {

        let formTemplate = null;
        switch (formcell.category) {
            case ('ct_customselect'):
                formTemplate = (
                    <GridContainer>
                        <GridItem xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined} sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined} md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined}>
                            <FormControl

                                {...formcell.formcontrolprops}
                                className={classes.selectFormControl}
                            >
                                <InputLabel
                                    htmlFor={formcell.inputprops.name}
                                    className={classes.selectLabel}
                                >
                                    {formcell.configparams.showlabel ? formcell.config.label : null}
                                </InputLabel>
                                <Select
                                    // id={formcellkey}
                                    MenuProps={{
                                        className: classes.selectMenu,
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={formcell.value}
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

                                        formcell['value'] = event.target.value

                                        change({ event, cell: { [formcellkey]: formcell } })
                                    }}
                                    inputProps={{ ...formcell.inputprops }}
                                >
                                    {
                                        formcell.config.options.map((item, index) => (
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                // value={item.key}
                                                value={item}
                                                key={index}
                                            >

                                                {item}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                )
                break;
            case ('ct_sidebarselect'):
                formTemplate = (
                    <GridItem
                        xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined}
                        sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined}
                        md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined}
                        lg={formcell.wrapcompos.griditem.lg ? formcell.wrapcompos.griditem.lg : undefined}>
                        <CustomDropdown
                            hoverColor="info"
                            buttonProps={{...formcell.buttonprops}}
                            onClick={change}
                            formcell={formcell}
                            formcellkey={formcellkey}
                        // dropdownHeader="Dropdown header"
                        />
                    </GridItem>
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