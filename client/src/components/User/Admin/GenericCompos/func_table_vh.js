import React from "react";

import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import Button from "../../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";

import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import { makeStyles } from "@material-ui/core/styles";

import {
    runPattern
} from './format_table'
import {
    resolvePath,
} from '../../../utils/Funcs/basefuncs'
// material-ui icons
import {
    Check,
} from '@material-ui/icons';

// @material-ui
import Switch from '@material-ui/core/Switch';

import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

export function ColumnRow({ inform, viewparams, redux_localeuser, redux_userdata, reactrouter_history, column, item, formcellkey, formcell, sublistkey, tiedtoformkey, handleSwitch, toggleItem, changePosition, changeQuantity, removeItem, model = null }) {
    // Do checked musi wejsc formcell options
    const [checked, setChecked] = React.useState([]);
    const handleToggle = ({ value, event, sublistkey, tiedtoformkey, cell }) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);

        // cell: { [formcellkey]: formcell}
        toggleItem({ value, event, sublistkey, tiedtoformkey, cell })
    };

    const classes = useStyles();

    // SHOWTHIS
    let showthis

    if (inform) console.log(column);

    showthis = runPattern({ item, column: column.config, indicator: column.config.indicator })
    if (inform)  console.log(showthis);



    // Cell
    let cell = formcellkey ? { [formcellkey]: formcell } : null
    // IMAGE

    if (column.columntype === 'image') {

        if (!showthis) {
            showthis = '/images/image_not_availble.png'
            return <div className={classes.imgContainer}>
                <img src={showthis} alt="..." className={classes.img} />
            </div>

        } else {
            /*   This is required to encompass both scenarios with item and item.referenceID */

            let imagelist

            if (column.config.leftpath.includes('.')) {
                imagelist = resolvePath({ object: item, path: column.config.leftpath })
            } else {
                imagelist = item[column.config.leftpath]
            }

            let isFile = Array.isArray(imagelist) ? imagelist[0] : undefined

            // ===========
            if (isFile) {

                if(typeof(isFile) === 'object') {
                    if ('secure_url' in isFile) {
                        if (isFile.resource_type.includes('video')) {
                            return <div className={classes.imgContainer}>
                                <video autoPlay loop muted playsInline style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
                                }}>
                                    <source src={showthis} type="video/mp4" />
                                </video></div>
                        } else if (isFile.resource_type.includes('image')) {
                            return <div className={classes.imgContainer}>
                                <img src={showthis} alt="..." className={classes.img} />
                            </div>
                        }
                    }
                } else if (typeof(isFile) === 'string') {
            
                        /* variant to show nation flag */
                        return <div className={classes.imgContainer}>
                            <img src={imagelist[0]} alt="..." className={classes.img} />
                        </div> 
                }

            } 

        }

    } else if (column.columntype === 'switch') {

        // SWITCH
        return <Switch
            id={column.inputprops ? column.inputprops.id : ''}
            checked={showthis}
            onClick={(event) => handleSwitch({ event, value: item, sublistkey, tiedtoformkey, cell })}
            color="primary"
        />

    } else if (column.columntype === 'toggle') {

        return <Checkbox
            id={column.inputprops ? column.inputprops.id : ''}
            key={item._id}
            className={classes.positionRelative}
            tabIndex={-1}
            onClick={(event) => handleToggle({ event, sublistkey, tiedtoformkey, value: item, cell })}
            checkedIcon={<Check className={classes.checkedIcon} />}
            icon={<Check className={classes.uncheckedIcon} />}
            // style={{paddingTop: '100%'}}
            classes={{
                checked: classes.checked,
                root: classes.checkRoot
            }}
        />

    } else if (column.columntype === 'adjust') {
        return <div><div >
            <IconButton size="small" onClick={(event) => changePosition({ event, value: item, sublistkey, tiedtoformkey, cell, direction: -1 })}>
                <ArrowUpwardIcon fontSize="inherit" id='arrowup' />
            </IconButton></div>
            <div >
                <IconButton size="small" onClick={(event) => changePosition({ event, value: item, sublistkey, tiedtoformkey, cell, direction: 1 })}>
                    <ArrowDownwardIcon fontSize="inherit" id='arrowdown' />
                </IconButton></div></div>
    } else if (column.columntype === 'quantity') {

        return <div className={classes.buttonGroup}>
            <Button
                color="info"
                size="sm"
                // round
                style={{
                    opacity: "0.9",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                }}
                variant="text"
                className={classes.firstButton}
                onClick={(event) => changeQuantity({ event, value: item, direction: -1, cell })}
            >
                <Remove />
            </Button>
            <div
                color="info"
                size="sm"
                // round
                style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    position: "relative",
                    display: "inline-block",
                    verticalAlign: "middle"

                }}
            >{showthis}
            </div>
            <Button
                color="info"
                size="sm"
                style={{
                    opacity: "0.9",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                }}
                className={classes.lastButton}
                onClick={(event) => changeQuantity({ event, value: item, direction: 1, cell })}
            >
                <Add />
            </Button>
        </div>
    } else if (column.columntype === 'iconbutton') {

        return <IconButton
            {...column.inputprops}
            onClick={(event) => column.actions.onClick({ viewparams, redux_localeuser, reactrouter_history, redux_userdata, model, event, value: item })}
            key={item._id}
        >
            <column.icon fontSize="small" />
        </IconButton>

    } else if (column.columntype === 'text') {

        // STRING
        return showthis

    } else {
        return null
    }
}
ColumnRow.propTypes = {
    column: PropTypes.shape({
        columntype: PropTypes.oneOf([
            "text", // regular text including numbers
            "button", // Something you push to activate action
            "iconbutton",
            "adjust",
            "toggle",
            "switch",
            "image"
        ])
    })
};
ColumnRow.propTypes = {
    column: PropTypes.shape({
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
ColumnRow.propTypes = {
    column: PropTypes.shape({
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