import React from "react";
// @material-ui/core components
// material ui icons
// core components
import PropTypes from "prop-types";

import FormCustomInput from "./FormCustomInput.js";
import FormCustomSwitch from "./FormCustomSwitch.js";
import FormCustomSelect from "./FormCustomSelect.js";
import FormImageUpload from "./FormImageUpload";
import FormVideoUpload from "./FormVideoUpload";
import FormMultiUpload from "./FormMultiUpload";

import FormUIAutocomplete from "./FormUIAutocomplete";
import FormUITable from "./FormUITable";
import FormColorPicker from "./FormColorPicker";

// uim_autocompletetaxo
export default function SetElement({ formcell, formcellkey, localStorage, change, remove, removefile, changePosition, removeItem, changeSort, changeQuantity }) {

    if (formcell.element === 'input') {
        return <FormCustomInput
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
        />
    } else if (formcell.element === 'switch') {
        return <FormCustomSwitch
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
        />

    }
    else if (formcell.element === 'select') {
        return <FormCustomSelect
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
        />

    } else if (formcell.element === 'upload') {
        return <FormImageUpload
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
            removefile={removefile}
        />
    } else if (formcell.element === 'multiupload') {
        return <FormMultiUpload
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
            removefile={removefile}
        />
    } else if (formcell.element === 'uploadvideo') {

        return <FormVideoUpload
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
            removefile={removefile}
        />
    } else if (formcell.element === 'colorpicker') {
        return <FormColorPicker
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
        />


    } else if (formcell.element === 'autocomplete') {
        return <FormUIAutocomplete
            formcell={formcell}
            formcellkey={formcellkey}
            change={change}
            remove={remove}
        />
    } else if (formcell.element === 'table') {

    //  console.log(formcell);
    //  console.log(formcellkey);
    //  console.log(localStorage);

    //  return null

        return <FormUITable
            localStorage={localStorage}
            formcell={formcell}
            formcellkey={formcellkey}
            // change={change}
            // remove={remove}
            // changePosition={changePosition}
            // removeItem={removeItem}
            // changeSort={changeSort}
            // changeQuantity={changeQuantity}

        />
    }
    else {
        return null
    }

}

SetElement.propTypes = {
    formcell: PropTypes.shape({
        config: PropTypes.shape({
            valuetype: PropTypes.oneOf([
                "array",
                "arrayofrefs",
                "string",
                "integer",
                "boolean"
            ])
        })
    })
};
SetElement.propTypes = {
    formcell: PropTypes.shape({
        element: PropTypes.oneOf([
            "input",
            "switch",
            "select",
            "upload",
            "autocomplete"
        ])
    })
};
SetElement.propTypes = {
    formcell: PropTypes.shape({
        inputprops: PropTypes.shape({
            type: PropTypes.oneOf([
                "button",
                "checkbox",
                "color",
                "date",
                "datetime-local",
                "email",
                "file",
                "hidden",
                "image",
                "month",
                "number",
                "password",
                "radio",
                "range",
                "reset",
                "search",
                "submit",
                "tel",
                "text",
                "time",
                "url",
                "week"
            ])
        })
    })
};