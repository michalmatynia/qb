import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core components
import GridContainer from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
// import pillsStyle from "../../material-kit-pro-react/views/componentsSections/pillsStyle.js";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';

import pillsStyle from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/componentsSections/pillsStyle.js";

const useStyles = makeStyles(pillsStyle);

function loopCategories({ loop_array, cbActionOnClick }) {

    let icon_array =[<FreeBreakfastIcon />, <RestaurantIcon />, <RestaurantMenuIcon />]

    return loop_array.map((item, index)=> {
        return <BottomNavigationAction 
        key={item._id}
        onClick = {()=> cbActionOnClick({item})}
        label= {index + 1 + '. ' + item.name} icon={icon_array[index]} />

    })

}

export default function SimpleBottomNavigation({isCategoryArray,cbActionOnClick}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    return (
        <div className={classes.section}
            style={{
                marginTop: "0",
                paddingTop: "0",
                paddingBottom: "2%",
                marginBottom: "0"
            }}
        >
            <div className={classes.container}>
                <div id="navigation-pills">
                    <GridContainer
                        style={{
                            paddingTop: "5%",
                        }}
                    >
                        <GridItem xs={12} sm={12} md={12} lg={12} >
                            <BottomNavigation
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                showLabels
                                className={classes.root}
                            >
                                {isCategoryArray.length > 0 ? loopCategories({ loop_array: isCategoryArray, cbActionOnClick }) : null}
                                <BottomNavigationAction label="4. Geschirr und Besteck" icon={<RestoreIcon />} />
                                <BottomNavigationAction label="5. Lieferdetails" icon={<FavoriteIcon />} />
                                <BottomNavigationAction label="6. Angebotsubersicht" icon={<LocationOnIcon />} />
                            </BottomNavigation>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}