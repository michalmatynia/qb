import React, { 
    // useState 
} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import AuthFC from '../../hoc/auth_fc';

import Home from '../../components/Home';
import PageNotFound from '../../components/utils/page_not_found';
import StorePage from '../../components/Store';
import ProductPage from '../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/ProductPage/ProductPage';

import CartPage from '../../components/Cart';

import LoginPage from '../../components/StaticBricks/Login/index';
// import LoginPage from '../../components/Register_login/index';

import Contact from '../../components/StaticBricks/Contact/index';

// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import styles from "../../themesrun/michalm/animation/fadein";
// const useStyles = makeStyles(styles);

// Leave Sections, this is for an overlay functionality
export default function Frontside() {
return <div>
        <Switch>
            <Route exact path='/user/cart'><AuthFC Page={CartPage} reload={null} /></Route>
            <Route exact path='/store'><AuthFC Page={StorePage} reload={null} /></Route>
            <Route exact path='/detail/product/:id'><AuthFC Page={ProductPage} reload={null} /></Route>

            {/* <Route exact path='/creator'><AuthFC Page={CreatorPage} reload={null} /></Route> */}
            <Route exact path='/login_page'><AuthFC Page={LoginPage} reload={false} /></Route>
            <Route exact path='/contact'><AuthFC Page={Contact} reload={null} /></Route>

            <Route exact path='/'><AuthFC Page={Home} reload={null} /></Route>
            <Route><AuthFC Page={PageNotFound} /></Route>
        </Switch>
    </div>
}
