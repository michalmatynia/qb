import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import CustomInput from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomInput/CustomInput.js";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";

// style for this view
import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

export default function FormCustomInput({ formcell, change, onblur = (()=> null) }) {

    const classes = useStyles();

    return (<div>
        <CustomInput
            value={formcell.value}
            labelText={formcell.configparams.showlabel ? formcell.config.label : null}
            helperText={formcell.configparams.showhelpertext ? formcell.config.helpertext : null}
            formControlProps={formcell.formcontrolprops}
            inputProps={{
                onChange: async (event) => { change({ event }) },
                onBlur: async (event) => { onblur({ event, blur: true }) },
                ...formcell.inputprops,
            }} />
        {formcell.validation.message.length > 0 && !formcell.valid ? <InputAdornment position="end"><div className={classes.danger}>{formcell.validation.message}
        </div></InputAdornment> : null}
    </div>
    )
}
