import React from "react";
import {  useDispatch } from 'react-redux'

import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import Button from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";


import styles from "../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import { makeStyles } from "@material-ui/core/styles";

import {
    runPattern
} from './format_table'
// material-ui icons
import {
    Check,
} from '@material-ui/icons';

// @material-ui
import Switch from '@material-ui/core/Switch';

import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

export function ColumnRow({ column, item, itemkey, list = null, sublistkey, tiedtoformkey, handleSwitch, toggleItem, changePosition, changeQuantity, removeItem, model = null }) {

    // Do checked musi wejsc formcell options
    const [checked, setChecked] = React.useState([]);
    const dispatch = useDispatch()


    const handleToggle = ({ value, event}) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);

        // cell: { [formcellkey]: formcell}
        toggleItem({ value, event, })
    };

    const classes = useStyles();

    // SHOWTHIS
    let showthis

    showthis = runPattern({
        item,
        column: column.config ? column.config : null,
        indicator: column.config.indicator ? column.config.indicator : null
    })

    // IMAGE
    if (column.columntype === 'image') {

        if (!showthis) {
            showthis = '/images/image_not_availble.png'
        }
        return <div className={classes.imgContainer}
            style={{
                // padding: '0',
                // margin: '0',
                width: '160px'
            }}
        >
            <img src={showthis} alt="..." className={classes.img} />
        </div>

    }  else if (column.columntype === 'switch') {

        // SWITCH
        return <Switch
            id={column.inputprops ? column.inputprops.id : ''}
            checked={showthis}
            onClick={(event) => handleSwitch({ event, value: item, sublistkey, tiedtoformkey })}
            color="primary"
        />

    } else if (column.columntype === 'function_loop') {
        return showthis.map((floop, index) => {
            return <div key={floop._id + '-' + item._id} id={floop._id + '-' + item._id} style={{ fontSize: '12px' }}>{floop.name}<br /></div>
        })
    } else if (column.columntype === 'span') {


        return <div
            style={{
                padding: '0',
                margin: '0',
                display: "inline-flex",
            }}
        ><span >
                <a href="#product" className={classes.tdNameAnchor}>
                    {showthis.name}
                </a>
                <br />
                <small className={classes.tdNameSmall}>{showthis.description}</small>
            </span></div>

    } else if (column.columntype === 'toggle') {

        return <Checkbox
            id={column.inputprops ? column.inputprops.id : ''}
            key={item._id}
            style={{
                padding: '0px', margin: '0px', display: "inline-flex"
            }}
            className={classes.positionRelative}
            tabIndex={-1}
            onClick={(event) => handleToggle({ event, sublistkey, tiedtoformkey, value: item })}
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
            <IconButton size="small" onClick={(event) => changePosition({ event, value: item, sublistkey, tiedtoformkey, direction: -1 })}>
                <ArrowUpwardIcon fontSize="inherit" id='arrowup' />
            </IconButton></div>
            <div >
                <IconButton size="small" onClick={(event) => changePosition({ event, value: item, sublistkey, tiedtoformkey, direction: 1 })}>
                    <ArrowDownwardIcon fontSize="inherit" id='arrowdown' />
                </IconButton></div></div>
    } else if (column.columntype === 'quantity') {

        return <div className={classes.buttonGroup} style={{
            padding: '0',
            margin: '0',
            display: "inline-flex"
        }}>
            <Button
                color="warning"
                size="sm"
                // round
                style={{
                    opacity: "0.9",
                    // paddingLeft: "5px",
                    // paddingRight: "5px",
                    marginLeft: "5px",
                    marginRight: "5px",
                    width: '20px',

                }}
                variant="text"
                className={classes.firstButton}
                onClick={(event) => changeQuantity({ event, value: item, list, itemkey, direction: -1, dispatch })}
            >
                <Remove />
            </Button>
            <div
                // color="info"
                size="sm"
                // round
                style={{
                    // marginLeft: "5px",
                    // marginRight: "5px",
                    // paddingLeft: "5px",
                    // paddingRight: "5px",
                    margin: "1%",
                    position: "relative",
                    // position: "absolute",

                    // display: "inline-block",
                    verticalAlign: "middle"

                }}
            >{showthis}
            </div>
            <Button
                color="warning"
                size="sm"
                style={{
                    opacity: "0.9",
                    // paddingLeft: "5px",
                    // paddingRight: "5px",
                    width: '20px',
                    marginLeft: "5px",
                    marginRight: "5px",
                }}
                className={classes.lastButton}
                onClick={(event) => changeQuantity({ event, value: item, list, itemkey, direction: 1, dispatch })}
            >
                <Add />
            </Button>
        </div>
    } else if (column.columntype === 'iconbutton') {

        return <IconButton
            {...column.inputprops}
            onClick={(event) => column.actions.onClick({ event, value: item, list, itemkey, dispatch })}
            key={item._id}
        >
            <column.icon fontSize="small" />
        </IconButton>

    } else if (column.columntype === 'remove') {

        return <IconButton
            {...column.inputprops}
            onClick={(event) => removeItem({ event, value: item, list, itemkey, dispatch })}
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
            "image",
            "quantity"
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