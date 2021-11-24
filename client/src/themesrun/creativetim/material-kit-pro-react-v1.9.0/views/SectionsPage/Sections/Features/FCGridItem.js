import React from "react";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
/* import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import GroupWork from "@material-ui/icons/GroupWork";
import Airplay from "@material-ui/icons/Airplay";
import LocationOn from "@material-ui/icons/LocationOn";
import Extension from "@material-ui/icons/Extension";
import ChildFriendly from "@material-ui/icons/ChildFriendly";
import WatchLater from "@material-ui/icons/WatchLater";
import Code from "@material-ui/icons/Code";
import FormatPaint from "@material-ui/icons/FormatPaint";
import Dashboard from "@material-ui/icons/Dashboard";
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage'; */
/* import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';*/
import Chat from "@material-ui/icons/Chat";
import GroupWork from "@material-ui/icons/GroupWork";
import Airplay from "@material-ui/icons/Airplay";
import Extension from "@material-ui/icons/Extension";
import Dashboard from "@material-ui/icons/Dashboard";
/* import FastfoodIcon from '@material-ui/icons/Fastfood';
import KitchenIcon from '@material-ui/icons/Kitchen'; */

/* IT icons */
/* import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo'; */
// core components
import InfoArea from "../../../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/InfoArea/InfoArea.js";
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'

import {
    reveal_array_image_all,
  } from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'
// component Functions
export default function FCGridItem({  i, description, title, item, iconClass = null, parentClass = null, icon = null, iconColor = null, vertical = false }) {

    // const [isNameSubordinateStyle, setNameSubordinateStyle] = React.useState({ color: 'inherit' });
    // const [isDescriptionSubordinateStyle, setDescriptionSubordinateStyle] = React.useState({ color: 'inherit' });

    let iconArray = [Dashboard, Extension, Chat, Airplay, GroupWork]
    let colorArray = ["primary", "warning", "danger", "success", "info", "rose", "gray"]
    function shuffleIcons() {
        if (iconArray.length - 1 < i) {
            return iconArray[0]
        } else {
            return iconArray[i]
        }

    }
    function shuffleColors() {
        if (colorArray.length - 1 < i) {
            return colorArray[0]
        } else {
            return colorArray[i]
        }

    }

    let render = () => {
        return <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all}><InfoArea
            vertical={vertical}
            className={parentClass}
            title={title}
            description={description}
            icon={icon ? shuffleIcons() : null}
            iconColor={iconColor ? shuffleColors() : null}
        /></FuncRevealWrapper>
    }
    return render()
}



