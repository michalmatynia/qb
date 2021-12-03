import React, { useCallback } from "react";
// nodejs library that concatenates classes
import cx from "classnames";

// plugin that creates slider
import Slider from "nouislider";
import FCGridItem from "./FCGridItem";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FCTaxonomyListOne from './FCTaxonomyListOne'
// core components
import AccordionFunc from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Accordion/AccordionFunc.js";

import GridContainer from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import processOverTheme from "../../../../../../theming/Funcs/processOverTheme"

import { useSelector, useDispatch } from 'react-redux'
import {
    plg_findMany,
    // plg_findOne_QueMod,
    plg_clearProps
} from '../../../../../../components/utils/Plugs/cms_plugs';

import {
    act_injectProp,
} from '../../../../../../redux/actions/generic/generic_actions';


import { actionFuncs_recalculatePrice_v2 } from '../../../../../../components/User/Admin/ActionFunctions/recalculatePrice'



export default function FCTaxonomy({ arrayTaxo, cb_runCheckedTaxo, checkedTaxo }) {


    const [isArrayTaxo, setArrayTaxo] = React.useState(arrayTaxo)
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {

        if(arrayTaxo && isLoading) {
            setArrayTaxo(arrayTaxo)
            setIsLoading(false)
        }
    
    },[arrayTaxo, isLoading])
  const handleToggle = useCallback(
   async ({ value, i }) => {
      const currentIndex = checkedTaxo.indexOf(value)
      const newChecked = [...checkedTaxo];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      cb_runCheckedTaxo({cb_NewChecked: newChecked});
      setIsLoading(false)

    }, [cb_runCheckedTaxo, checkedTaxo])

    return (
        !isLoading && isArrayTaxo ? isArrayTaxo.map((value, i) => {
            return <FCTaxonomyListOne
                value={value}
                i={i}
                key={value._id}
                togglefunction={({value, i}) => {
                    setIsLoading(true)
                    handleToggle({ value, i })}
                }
                sumofchecked={checkedTaxo}
            />
        }) : null
    )


}