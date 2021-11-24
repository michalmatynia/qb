import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import AuthFC from '../../hoc/auth_fc';

import PageNotFound from '../../components/utils/page_not_found';
import AdminLayout from '../../hoc/layouts/Admin';

// import { InputToComponent } from "./HomeFuncs/home_funcs"


// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";

// import styles from "../../themesrun/michalm/animation/fadein";
// const useStyles = makeStyles(styles);

// Leave Sections, this is for an overlay functionality
// Context
export default function Panel() {

    // const classes = useStyles();

        return <div>
            <Switch>
                <Route path='/client'><AuthFC Page={AdminLayout} reload={true} /></Route>
                <Route path='/contentmanager'><AuthFC Page={AdminLayout} reload={true} /></Route>
                <Route path='/admin'><AuthFC Page={AdminLayout} reload={true} /></Route>
                <Route><AuthFC Page={PageNotFound} /></Route>
            </Switch>
        </div>
}