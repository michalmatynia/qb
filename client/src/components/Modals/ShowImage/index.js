import React, { useState } from "react";

import { useDispatch, useSelector } from 'react-redux'

// nodejs library that concatenates classes
// import classNames from "classnames";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
import Button from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import Card from "../../..//themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import SectionHeader from './Additional/Header'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import shoppingCartStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
const useStyles = makeStyles(shoppingCartStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function Modal({ isModalValue, isShowFullScreen, toggleModal }) {

    const classes = useStyles();

    const renderImages = () => {
        if (isModalValue && isModalValue.referenceID.images.length > 0) {
            return <SectionHeader
                images={isModalValue.referenceID.images}
            />
        } else {
            return null
        }
    }
    return (
        <Dialog
            fullScreen
            fullWidth={true}
            open={isShowFullScreen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => toggleModal(false)}

        ><AppBar  style={{
            position: 'relative',
            backgroundColor: '#545454'
        }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => toggleModal(false)} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderImages()}
        </Dialog>
    )
   
}
