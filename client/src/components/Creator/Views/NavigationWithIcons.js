import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
// import pillsStyle from "../../material-kit-pro-react/views/componentsSections/pillsStyle.js";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import pillsStyle from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/componentsSections/pillsStyle.js";

const useStyles = makeStyles(pillsStyle);

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <div className={classes.section}
        style={{
            paddingBottom: "0",
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
                                <BottomNavigationAction label="Buffet für ihre Feier im Gasthaus" />
                                <BottomNavigationAction label="CATERING - Außer Haus" />
                                <BottomNavigationAction label="Spanferkel PUTE Gulaschkanone" />
                                <BottomNavigationAction label="Kuchen und Eis" />
                            </BottomNavigation>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}