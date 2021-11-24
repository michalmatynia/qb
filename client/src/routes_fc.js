import React from 'react';
import {
    Switch,
    Route,
    // Redirect
} from 'react-router-dom';

import AuthFC from './hoc/auth_fc';
// import HeaderHolder from './components/Header_footer/Header';

import Home from './components/Home';

import LoginPage from './components/Register_login';
// import Register from './components/Register_login/register';
// import Shop from './components/Shop';
// import ProductPage from './components/Product';
// import ResetUser from './components/Reset_user';
// import ResetPass from './components/Reset_user/reset_pass';

// import UserDashboard from './components/User';
// // import AddProduct from './components/User/Admin/add_product';

// import UserCart from './components/User/cart';
// import UpdateProfile from './components/User/update_profile';

// import AddFile from './components/User/Admin/add_file';


import PageNotFound from './components/utils/page_not_found';

// ========================
import AdminLayout from './hoc/layouts/Admin';
// import AuthLayout from './hoc/layouts/Auth';

const Routes = () => {
    return (
        <Switch>
            {/* <Route exact path='/user/dashboard'><AuthFC Page={UserDashboard} reload={true} /></Route> */}
            {/* <Route exact path='/user/cart'><AuthFC Page={UserCart} reload={true} /></Route>
            <Route exact path='/user/user_profile'><AuthFC Page={UpdateProfile} reload={true} /></Route>

            <Route exact path='/admin/api/list_nation'><AuthFC Page={ListNation} reload={true} /></Route>

            <Route exact path='/admin/add_file'><AuthFC Page={AddFile} reload={true} /></Route>

            {/* <Route exact path='/reset_password/:token'><AuthFC Page={ResetPass} reload={false} /></Route>
            <Route exact path='/reset_user'><AuthFC Page={ResetUser} reload={false} /></Route>

            <Route exact path='/product_detail/:id'><AuthFC Page={ProductPage} reload={null} /></Route>

            <Route exact path='/register'><AuthFC Page={Register} reload={false} /></Route>

            <Route exact path='/shop'><AuthFC Page={Shop} reload={null} /></Route>


            <Route exact path='/auth/dashboard'><AuthFC Page={AuthLayout} reload={true} /></Route>
            {/* 
            <Route path="/admin/dashboard" render={(props) => (<AdminLayout />)} reload={true} />
              */}


            {/* 
            
            ---to jest wazny model, mozna wstrzyknac component w route
            <Route path="/admin" component={AdminLayout} /> */
            }

            <Route path='/client'><AuthFC Page={AdminLayout} reload={true} /></Route>
            {/* <Route path='/client'><AuthFC Page={AdminLayout} reload={true} /></Route> */}

            <Route path='/contentmanager'><AuthFC Page={AdminLayout} reload={true} /></Route>
            {/* <Route path='/contentmanager'><AuthFC Page={AdminLayout} reload={true} /></Route> */}

            <Route path='/admin'><AuthFC Page={AdminLayout} reload={true} /></Route>

            <Route exact path='/login_page'><AuthFC Page={LoginPage} reload={false} /></Route>

            <Route exact path='/'><AuthFC Page={Home} reload={null} /></Route>
            <Route><AuthFC Page={PageNotFound} /></Route>
        </Switch>


    )
}

export default Routes;

