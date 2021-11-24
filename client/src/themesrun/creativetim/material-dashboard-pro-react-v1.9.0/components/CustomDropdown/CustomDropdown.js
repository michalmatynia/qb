import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import cx from "classnames";

// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import InputLabel from "@material-ui/core/InputLabel";

import { runPattern } from '../../../../../components/User/Admin/GenericCompos/format_table'

// core components
import Button from "../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

import styles from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/components/customDropdownStyle.js";

const useStyles = makeStyles(styles);

export function RenderColumn({ props, item = null, tableparams = null }) {
    const classes = useStyles();

    const {
        rtlActive,
        formcell,
        // formcellkey,
    } = props;

    if (tableparams) {
        return tableparams.columns.map((eachcolumn, index) => {


            if ('parentindex' in eachcolumn.config) {
                item = item[eachcolumn.config.parentindex]
            }

            let showthis = runPattern({ column: eachcolumn.config, item })

            if (eachcolumn.columntype === 'text') {
                return <ListItemText key={index} primary={showthis} />
            } else if (eachcolumn.columntype === 'image') {

                const photo = classes.photo + " " + cx({
                    [classes.photoRTL]: rtlActive
                });

                return <ListItemAvatar key={item} className={photo}>
                    <Avatar variant="square" alt="Flag" src={showthis} />
                </ListItemAvatar>
            } else {
                return null
            }

        })
    } else if (!tableparams) {
        if (formcell.value.length === 0) {
            if (formcell.configparams.showhelpertext) {
                return <ListItemText primary={formcell.config.helpertext} />
            }

        } else {
            return <ListItemText primary={formcell.value} />

        }
    }

}
export function MyDropDownMenu(props) {
    const classes = useStyles();
    const {
        dropdownHeader,
    } = props;

    const dropDownMenu = (
        <ClickAwayListener onClickAway={(e) => props.onClickAway(e)}>
            <MenuList role="menu" className={classes.menuList}>
                {dropdownHeader !== undefined ? (
                    <MenuItem
                        onClick={() => props.handleCloseMenu(dropdownHeader)}
                        className={classes.dropdownHeader}
                    >
                        {dropdownHeader}
                    </MenuItem>
                ) : null}
                <AssembleTable
                    props={props} />
            </MenuList></ClickAwayListener>
    );

    return dropDownMenu

}
export function AssembleTable({ props }) {
    const classes = useStyles();
    const {
        hoverColor,
        rtlActive,
        noLiPadding,
        formcell,
        formcellkey
    } = props;

    const dropdownItem = classNames({
        [classes.dropdownItem]: true,
        [classes[hoverColor + "Hover"]]: true,
        [classes.noLiPadding]: noLiPadding,
        [classes.dropdownItemRTL]: rtlActive
    });

    // === To moze przydac sie przy ustanawianiu sposobu wyswietlania dropdownu
    // let viewparams = formcellkey ? formcell.sublist.viewparams : null
    // Get options, foreach option
    return formcell.config.options.map((item, index) => {

        return <MenuItem
            key={index}
            className={dropdownItem}
            onClick={(e) => props.handleCloseMenu({ event: e, value: item, cell: { [formcellkey]: formcell } })}
            style={{ overflow: "visible", padding: 0, display: 'flex' }}
        ><RenderColumn props={props} item={item} tableparams={formcell.sublist.tableparams} /></MenuItem>

    })

}


export default function CustomDropdown(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleCloseMenu = param => {

        // Add clicked Value to state
        const cellkey = Object.keys(param.cell)[0]

        let output = runPattern({ column: param.cell[cellkey].fillfields.value.toconfig, item: param.value })


        if (
            param.cell[cellkey].fillfields.value.toconfig.valuetype === 'array'
        ) {

            // returned value is in an Array

            let newValue = []
            newValue.push(output)

            param.cell[cellkey].value = newValue

        } else {
            param.cell[cellkey].value = output
        }
        setAnchorEl(null);
        if (props && props.onClick) {
            props.onClick(param);
        }
    };

    const handleClick = event => {
        if (anchorEl && anchorEl.contains(event.target)) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = event => {
        if (anchorEl.contains(event.target)) {
            return;
        }
        setAnchorEl(null);
    };

    const {
        // buttonText,
        buttonIcon,
        buttonProps,
        dropup,
        caret,
        dropPlacement,
        rtlActive,
        innerDropDown,
        navDropdown,
        formcell,
    } = props;
    const caretClasses = classNames({
        [classes.caret]: true,
        [classes.caretDropup]: dropup && !anchorEl,
        [classes.caretActive]: Boolean(anchorEl) && !dropup,
        [classes.caretRTL]: rtlActive
    });


    return (
        <div className={innerDropDown ? classes.innerManager : classes.manager}
        >

            <Button

                aria-label="Notifications"
                aria-owns={anchorEl ? "menu-list" : null}
                aria-haspopup="true"
                {...buttonProps}
                helpertext='fsef'
                onClick={handleClick}
            >
                {buttonIcon !== undefined ? (
                    <props.buttonIcon className={classes.buttonIcon} />
                ) : null}
                {formcell.value ? <RenderColumn
                    props={props}
                    item={formcell.value}
                    tableparams={formcell.sublistValue !== undefined ? formcell.sublistValue.tableparams : null}
                /> : null}
                {caret ? <b className={caretClasses} /> : null}

            </Button>
            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                transition
                disablePortal
                placement={dropPlacement}
                className={classNames({
                    [classes.popperClose]: !anchorEl,
                    [classes.popperResponsive]: true,
                    [classes.popperNav]: Boolean(anchorEl) && navDropdown
                })}
            >
                {() => (
                    <Grow
                        in={Boolean(anchorEl)}
                        id="menu-list"
                        style={
                            dropup
                                ? { transformOrigin: "0 100% 0" }
                                : { transformOrigin: "0 0 0" }
                        }
                    >
                        <Paper className={classes.dropdown}>
                            {innerDropDown ? (
                                <MyDropDownMenu {...props} handleCloseMenu={handleCloseMenu} />
                            ) : (
                                <MyDropDownMenu {...props} handleCloseMenu={handleCloseMenu} onClickAway={handleClose} />
                            )}
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

CustomDropdown.defaultProps = {
    caret: true,
    dropup: false,
    hoverColor: "primary"
};

CustomDropdown.propTypes = {
    hoverColor: PropTypes.oneOf([
        "dark",
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose"
    ]),
    buttonText: PropTypes.node,
    buttonIcon: PropTypes.object,
    dropdownList: PropTypes.array,
    buttonProps: PropTypes.object,
    dropup: PropTypes.bool,
    dropdownHeader: PropTypes.node,
    rtlActive: PropTypes.bool,
    caret: PropTypes.bool,
    dropPlacement: PropTypes.oneOf([
        "bottom",
        "top",
        "right",
        "left",
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "right-end",
        "left-start",
        "left-end"
    ]),
    noLiPadding: PropTypes.bool,
    innerDropDown: PropTypes.bool,
    navDropdown: PropTypes.bool,
    // This is a function that returns the clicked menu item
    onClick: PropTypes.func
};
