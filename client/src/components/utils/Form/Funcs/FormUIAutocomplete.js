import React from "react";
// @material-ui/core components

// @material-ui/core components
import {
    TextField,
    Chip,
    Checkbox
} from '@material-ui/core';
import {
    Autocomplete
} from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';



import GridContainer from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";

// style for this view
// function that returns true if value is email, false otherwise

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function FormUIAutocomplete({ formcell, change, remove, formcellkey, onclick }) {


    const renderTemplate = () => {
        let formTemplate = null;
        switch (formcell.category) {
            case ('uim_autocompletetaxo'):
                formTemplate = (
                    <GridContainer >
                        <GridItem style={{ marginTop: '10px' }} xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined} sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined} md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined}>
                            <Autocomplete
                                {...formcell.inputprops}
                                value={formcell.value}
                                multiple
                                clearOnBlur
                                disableClearable
                                filterSelectedOptions={true}
                                disableCloseOnSelect={true}
                                options={formcell.config.options}
                                getOptionLabel={ formcell.inputprops.getOptionLabel !== undefined ? formcell.inputprops.getOptionLabel : (option) => option.name }
                                getOptionSelected={formcell.inputprops.getOptionSelected !== undefined ? formcell.inputprops.getOptionSelected : (option, value) => {
                                    if (option.name === value.name) {
                                        return true
                                    }
                                }
                                }
                                onChange={(event, checked) => {
                                    formcell['value'] = checked

                                    change({ event, checked, cell: { [formcellkey]: formcell } })
                                }}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            /* You should place getTagProps on the first line, to avoid unwanted prop override */
                                            variant="outlined"
                                            key={index}
                                            label={option.name}
                                            onDelete={(event) => {
                                                getTagProps({ index }).onDelete();

                                                let alltags_Arr_new = formcell['value'].filter((el) => option !== el);
                                                formcell['value'] = alltags_Arr_new

                                                change({ event, cell: { [formcellkey]: formcell } })

                                            }}
                                            onClick={(event)=>{
                         
                                                onclick({ event, cell: { [formcellkey]: formcell }, index })
                                            }}
                                        />
                                    ))
                                }
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </React.Fragment>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={formcell.configparams.showlabel ? formcell.config.label : null} />
                                )}
                            />
                        </GridItem>
                    </GridContainer>
                )
                break
            case ('uim_autocompleteandfilter'):
                formTemplate = (
                    <GridContainer>
                        <GridItem style={{ marginTop: '10px' }} xs={formcell.filterfield.wrapcompos.griditem.xs ? formcell.filterfield.wrapcompos.griditem.xs : undefined} sm={formcell.filterfield.wrapcompos.griditem.sm ? formcell.filterfield.wrapcompos.griditem.sm : undefined} md={formcell.filterfield.wrapcompos.griditem.md ? formcell.filterfield.wrapcompos.griditem.md : undefined}>
                            <Autocomplete

                                {...formcell.filterfield.inputprops}
                                value={formcell.filterfield.value}
                                multiple
                                onChange={(event, checked) => {
                                    formcell['filterfield']['value'] = checked
                                    change({ event, cell: { [formcellkey]: formcell } })
                                }}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            // You should place getTagProps on the first line, to avoid unwanted prop override
                                            variant="outlined"
                                            key={index}
                                            label={option.name}
                                            onDelete={(event) => {
                                                getTagProps({ index }).onDelete(event);

                                                let alltags_Arr_new = formcell['filterfield']['value'].filter((el) => option !== el);
                                                formcell['filterfield']['value'] = alltags_Arr_new

                                                remove({ event, cell: { [formcellkey]: formcell } })

                                            }}
                                        />
                                    ))
                                }
                                // selectOnFocus
                                clearOnBlur
                                disableClearable
                                filterSelectedOptions={true}
                                disableCloseOnSelect={true}
                                handleHomeEndKeys
                                options={formcell.filterfield.config.options}
                                getOptionLabel={(option) => option.name}
                                // GetOptionsSelected  is specific for Taxonomy, has to use .name
                                // getOptionSelected={(option, value) => {
                                //     if (option.name === value.name) {
                                //         return true
                                //     }
                                // }
                                // }
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </React.Fragment>
                                )}
                                style={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label={formcell.filterfield.configparams.showlabel ? formcell.filterfield.config.label : null} />
                                )}
                            />
                            </GridItem>
                            <GridItem style={{ marginTop: '10px' }} xs={formcell.filterfield.wrapcompos.griditem.xs ? formcell.filterfield.wrapcompos.griditem.xs : undefined} sm={formcell.filterfield.wrapcompos.griditem.sm ? formcell.filterfield.wrapcompos.griditem.sm : undefined} md={formcell.filterfield.wrapcompos.griditem.md ? formcell.filterfield.wrapcompos.griditem.md : undefined}>

                                <Autocomplete
                                    {...formcell.inputprops}
                                    value={formcell.value}
                                    multiple
                                    clearOnBlur
                                    disableClearable
                                    filterSelectedOptions={true}
                                    disableCloseOnSelect={true}

                                    options={formcell.config.options}
                                    getOptionLabel={(option) => option.name}
                                    // getOptionSelected={(option, value) => {
                                    //     if (option._id === value._id) {

                                    //         return true
                                    //     }
                                    // }
                                    // }
                                    onChange={(event, checked) => {

                                        formcell['value'] = checked

                                        change({ event, cell: { [formcellkey]: formcell } })
                                    }}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                // You should place getTagProps on the first line, to avoid unwanted prop override
                                                variant="outlined"
                                                key={index}

                                                label={option.name}
                                                onDelete={(event) => {
                                                    getTagProps({ index }).onDelete(event);

                                                    let alltags_Arr_new = formcell['value'].filter((el) => option !== el);
                                                    formcell['value'] = alltags_Arr_new

                                                    remove({ event, cell: { [formcellkey]: formcell } })
                                                }}
                                            />
                                        ))
                                    }
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </React.Fragment>
                                    )}
                                    style={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label={formcell.configparams.showlabel ? formcell.config.label : null} />
                                    )}
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