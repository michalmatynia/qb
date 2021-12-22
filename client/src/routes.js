// import Buttons from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Components/Buttons.js";
// import Calendar from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Calendar/Calendar.js";
// import Charts from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Charts/Charts.js";
// import ErrorPage from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/ErrorPage.js";
// import ExtendedForms from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Forms/ExtendedForms.js";
// import ExtendedTables from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Tables/ExtendedTables.js";
// import FullScreenMap from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Maps/FullScreenMap.js";
// import GoogleMaps from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Maps/GoogleMaps.js";
// import GridSystem from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Components/GridSystem.js";
// import Icons from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Components/Icons.js";
// import LockScreenPage from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/LockScreenPage.js";
// import LoginPage from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/LoginPage.js";
// import Notifications from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Components/Notifications.js";
// import Panels from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Components/Panels.js";
// import PricingPage from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/PricingPage.js";
// import RTLSupport from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/RTLSupport.js";
// import ReactTables from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Tables/ReactTables.js";
// import RegisterPage from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/RegisterPage.js";
// import RegularForms from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Forms/RegularForms.js";
// import RegularTables from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Tables/RegularTables.js";
// import SweetAlert from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Components/SweetAlert.js";
// import TimelinePage from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/Timeline.js";
// import Typography from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Components/Typography.js";
// import UserProfile from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Pages/UserProfile.js";
// import ValidationForms from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Forms/ValidationForms.js";
// import VectorMap from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Maps/VectorMap.js";
// import Widgets from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Widgets/Widgets.js";
// import Wizard from "./templates/creativetim/material-dashboard-pro-react-v1.9.0/views/Forms/Wizard.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import WidgetsIcon from "@material-ui/icons/Widgets";

// =========
import Dashboard from "./themesrun/creativetim/material-dashboard-pro-react-v1.9.0/views/Dashboard/Dashboard2.js";

import EditAdd from './components/User/Admin/UniversalCrud/EditAdd';
import ListPanel from './components/User/Admin/UniversalCrud/List/ListPanel';

// import AddBrick from './components/User/Admin/CMS/Brick/add_brick';
// import EditBrick from './components/User/Admin/CMS/Brick/edit_brick';
// import ListBrick from './components/User/Admin/CMS/Brick/list_brick';

import AddPage from './components/User/Admin/CMS/Page/add_page';
import EditPage from './components/User/Admin/CMS/Page/edit_page';
import ListPage from './components/User/Admin/CMS/Page/list_page';

// import AddProduct from './components/User/Admin/CMS/Products/add_product';
// import EditProduct from './components/User/Admin/CMS/Products/edit_product';
// import ListProduct from './components/User/Admin/CMS/Products/list_product';

import AddTrnsDetailProduct from './components/User/Admin/system/Trnsdetailproduct/add_trnsdetailproduct';
import EditTrnsDetailProduct from './components/User/Admin/system/Trnsdetailproduct/edit_trnsdetailproduct';
import ListTrnsDetailProduct from './components/User/Admin/system/Trnsdetailproduct/list_trnsdetailproduct';

// import AddProductgroup from './components/User/Admin/CMS/Productgroup/add_productgroup';
// import EditProductgroup from './components/User/Admin/CMS/Productgroup/edit_productgroup';
// import ListProductgroup from './components/User/Admin/CMS/Productgroup/list_productgroup';

// import AddTaxonomy from './components/User/Admin/system/Taxonomy/add_taxonomy';
// import EditTaxonomy from './components/User/Admin/system/Taxonomy/edit_taxonomy';
// import ListTaxonomy from './components/User/Admin/system/Taxonomy/list_taxonomy';

// import AddMysite from './components/User/Admin/system/Mysite/add_mysite';
// import EditMysite from './components/User/Admin/system/Mysite/edit_mysite';
// import ListMysite from './components/User/Admin/system/Mysite/list_mysite';


import AddUser from './components/User/Admin/system/User/add_user';
import EditUser from './components/User/Admin/system/User/edit_user';
// import ListUser from './components/User/Admin/system/User/list_user';

import ListLanguage from './components/User/Admin/system/Languages/list_language.js';

let dashRoutes = [
  // ADMIN
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: ["/contentmanager", "/admin"],
  },


  {
    collapse: true,
    name: "Page Components",
    // rtlName: "المكونات",
    icon: Apps,
    state: "pagecomponentsCollapse",
    layout: ["/contentmanager", "/admin"],
    views: [
      {
        collapse: true,
        name: "Slides",
        // rtlName: "صفحات",
        icon: Image,
        state: "slideCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/slide",
            name: "Add Slide",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Slide",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/slide",
            name: "List Slide",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
        ]
      },
      {
        collapse: true,
        name: "Products",
        // rtlName: "المكونات",
        icon: Apps,
        state: "productCollapse",
        layout: ["/contentmanager", "/admin"],
        views: [
          {
            path: "/add/:model",
            navlink: "/add/product",
            name: "Add Product",
            component: EditAdd,
            layout: ["/contentmanager", "/admin"],
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Product",
            component: EditAdd,
            layout: ["/contentmanager", "/admin"],
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/product",
            name: "List Product",
            component: ListPanel,
            layout: ["/contentmanager", "/admin"],
            reload: true
          },
        ]
      },
      {
        collapse: true,
        name: "Product Groups",
        // rtlName: "المكونات",
        icon: Apps,
        state: "productgroupCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/productgroup",
            name: "Add Product Group",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Product Group",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/productgroup",
            name: "List Product Group",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
        ]
      },
      {
        collapse: true,
        name: "Brick",
        // rtlName: "المكونات",
        icon: Place,
        state: "brickCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/brick",
            name: "Add Brick",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Brick",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/brick",
            name: "List Brick",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
        ]
      },
      // {
      //   collapse: true,
      //   name: "Views",
      //   // rtlName: "المكونات",
      //   icon: Apps,
      //   state: "viewCollapse",
      //   layout: "/admin",
      //   views: [
      //     {
      //       path: "/add_view",
      //       name: "Add View",
      //       component: AddView,
      //       layout: "/admin",
      //       model: 'view',
      //       reload: true
      //     },
      //     {
      //       path: "/edit_view/:id",
      //       name: "Edit View",
      //       component: EditView,
      //       layout: "/admin",
      //       model: 'view',
      //       reload: true,
      //       redirect: true
      //     },
      //     {
      //       path: "/list_view",
      //       name: "List View",
      //       component: ListView,
      //       layout: "/admin",
      //       model: 'view',
      //       reload: true
      //     },
      //   ]
      // },
      {
        collapse: true,
        name: "Page",
        // rtlName: "المكونات",
        icon: WidgetsIcon,
        state: "pageCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/page",
            name: "Add Page",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Page",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/page",
            name: "List Page",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
          // {
          //   path: "/add_page",
          //   name: "Add Page",
          //   component: AddPage,
          //   layout: "/admin",
          //   model: 'page',
          //   reload: true
          // },
          // {
          //   path: "/edit_page/:id",
          //   name: "Edit Page",
          //   component: EditPage,
          //   layout: "/admin",
          //   model: 'page',
          //   reload: true,
          //   redirect: true
          // },
          // {
          //   path: "/list_page",
          //   name: "List Page",
          //   component: ListPage,
          //   layout: "/admin",
          //   model: 'page',
          //   reload: true
          // },
        ]
      },
    ]
  },


  {
    collapse: true,
    name: "Translation Panels",
    // rtlName: "المكونات",
    icon: Apps,
    state: "trnspanelsCollapse",
    layout: ["/contentmanager", "/admin"],
    views: [
      {
        collapse: true,
        name: "Mystore",
        // rtlName: "المكونات",
        icon: Place,
        state: "mystoreCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/mystore",
            name: "Add Mystore",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Mystore",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/mystore",
            name: "List Mystore",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
        ]
      },
      {
        collapse: true,
        name: "Cart",
        // rtlName: "المكونات",
        icon: Place,
        state: "cartCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/cart",
            name: "Add Cart",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Cart",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/cart",
            name: "List Cart",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
        ]
      },
      {
        collapse: true,
        name: "Contact",
        // rtlName: "المكونات",
        icon: Place,
        state: "contactCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/contact",
            name: "Add Contact",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Contact",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/contact",
            name: "List Contact",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
        ]
      },
      {
        collapse: true,
        name: "Login",
        // rtlName: "المكونات",
        icon: Place,
        state: "loginCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add/:model",
            navlink: "/add/login",
            name: "Add Login",
            component: EditAdd,
            layout: "/admin",
            reload: true
          },
          {
            path: "/edit/:model/:id",
            name: "Edit Login",
            component: EditAdd,
            layout: "/admin",
            reload: true,
            redirect: true
          },
          {
            path: "/unilist/:model",
            navlink: "/unilist/login",
            name: "List Login",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
        ]
      },
      {
        collapse: true,
        name: "Product Detail",
        // rtlName: "المكونات",
        icon: Place,
        state: "productdetailCollapse",
        layout: "/admin",
        views: [
          {
            path: "/add_trnsdetailproduct",
            name: "Add Product Detail",
            component: AddTrnsDetailProduct,
            layout: "/admin",
            model: 'trnsdetailproduct',
            reload: true
          },
          {
            path: "/edit_trnsdetailproduct/:id",
            name: "Edit Product Detail",
            component: EditTrnsDetailProduct,
            layout: "/admin",
            model: 'trnsdetailproduct',
            reload: true,
            redirect: true
          },
          /* Nie moge tego zastosowac dopki nie zrobie Edit/Add dla tego*/
          {
            path: "/unilist/:model",
            navlink: "/unilist/trnsdetailproduct",
            name: "List Product Detail",
            component: ListPanel,
            layout: "/admin",
            reload: true
          },
          // {
          //   path: "/list_trnsdetailproduct",
          //   name: "List Product Detail",
          //   component: ListTrnsDetailProduct,
          //   layout: "/admin",
          //   model: 'trnsdetailproduct',
          //   reload: true
          // },
        ]
      },

    ]
  },























  {
    collapse: true,
    name: "Taxonomy",
    // rtlName: "المكونات",
    icon: GridOn,
    state: "taxonomyCollapse",
    layout: "/admin",
    views: [
      {
        path: "/add/:model",
        navlink: "/add/taxonomy",
        name: "Add Taxonomy",
        component: EditAdd,
        layout: "/admin",
        reload: true
      },
      {
        path: "/edit/:model/:id",
        name: "Edit Taxonomy",
        component: EditAdd,
        layout: "/admin",
        reload: true,
        redirect: true
      },
      {
        path: "/unilist/:model",
        navlink: "/unilist/taxonomy",
        name: "List Taxonomy",
        component: ListPanel,
        layout: "/admin",
        reload: true
      },
      // {
      //   path: "/add_taxonomy",
      //   name: "Add Taxonomy",
      //   component: AddTaxonomy,
      //   layout: "/admin",
      //   model: 'taxonomy',
      //   reload: true
      // },
      // {
      //   path: "/edit_taxonomy/:id",
      //   name: "Edit Taxonomy",
      //   component: EditTaxonomy,
      //   layout: "/admin",
      //   model: 'taxonomy',
      //   reload: true,
      //   redirect: true
      // },
      // {
      //   path: "/list_taxonomy",
      //   name: "List Taxonomy",
      //   component: ListTaxonomy,
      //   layout: "/admin",
      //   model: 'taxonomy',
      //   reload: true
      // },
    ]
  },

  {
    collapse: true,
    name: "Theme",
    // rtlName: "المكونات",
    icon: Timeline,
    state: "themeCollapse",
    layout: "/admin",
    views: [
      {
        path: "/add/:model",
        navlink: "/add/theme",
        name: "Add Theme",
        component: EditAdd,
        layout: "/admin",
        reload: true
      },
      {
        path: "/edit/:model/:id",
        name: "Edit Theme",
        component: EditAdd,
        layout: "/admin",
        reload: true,
        redirect: true
      },
      {
        path: "/unilist/:model",
        navlink: "/unilist/theme",
        name: "List Theme",
        component: ListPanel,
        layout: "/admin",
        reload: true
      },

    ]
  },
  {
    collapse: true,
    name: "Mysite",
    // rtlName: "المكونات",
    icon: Place,
    state: "mysiteCollapse",
    layout: "/admin",
    views: [
      {
        path: "/add/:model",
        navlink: "/add/mysite",
        name: "Add Mysite",
        component: EditAdd,
        layout: "/admin",
        reload: true
      },
      {
        path: "/edit/:model/:id",
        name: "Edit Mysite",
        component: EditAdd,
        layout: "/admin",
        reload: true,
        redirect: true
      },
      {
        path: "/unilist/:model",
        navlink: "/unilist/mysite",
        name: "List Mysite",
        component: ListPanel,
        layout: "/admin",
        reload: true
      },
      // {
      //   path: "/add_mysite",
      //   name: "Add Mysite",
      //   component: AddMysite,
      //   layout: "/admin",
      //   model: 'mysite',
      //   reload: true
      // },
      // {
      //   path: "/edit_mysite/:id",
      //   name: "Edit Mysite",
      //   component: EditMysite,
      //   layout: "/admin",
      //   model: 'mysite',
      //   reload: true,
      //   redirect: true
      // },
      // {
      //   path: "/list_mysite",
      //   name: "List Mysite",
      //   component: ListMysite,
      //   layout: "/admin",
      //   model: 'mysite',
      //   reload: true
      // },
    ]
  },
  {
    collapse: true,
    name: "User",
    // rtlName: "المكونات",
    icon: AssignmentIndIcon,
    state: "userCollapse",
    layout: "/admin",
    views: [
      {
        path: "/add_user",
        name: "Add User",
        component: AddUser,
        layout: "/admin",
        model: 'user',
        reload: true
      },
      {
        path: "/edit_user/:id",
        name: "Edit User",
        component: EditUser,
        layout: "/admin",
        model: 'user',
        reload: true,
        redirect: true
      },
      // {
      //   path: "/list_user",
      //   name: "List User",
      //   component: ListUser,
      //   layout: "/admin",
      //   model: 'user',
      //   reload: true
      // },
      {
        path: "/unilist/:model",
        navlink: "/unilist/user",
        name: "List User",
        component: ListPanel,
        layout: "/admin",
        reload: true
      },
    ]
  },
  {
    collapse: true,
    name: "Languages",
    // rtlName: "صفحات",
    icon: Image,
    state: "languageCollapse",
    layout: "/admin",
    views: [
      {
        path: "/list_language",
        name: "List Language",
        component: ListLanguage,
        layout: "/admin",
        model: 'language',
        reload: true
      },
    ]
  },

  {

    collapse: true,
    name: "Blockstyle",
    // rtlName: "المكونات",
    icon: Timeline,
    state: "blockstyleCollapse",
    layout: "/admin",
    views: [
      {
        path: "/add/:model",
        navlink: "/add/blockstyle",
        name: "Add Blockstyle",
        component: EditAdd,
        layout: "/admin",
        reload: true
      },
      {
        path: "/edit/:model/:id/:attachto",
        name: "Edit Blockstyle",
        component: EditAdd,
        layout: "/admin",
        reload: true,
        redirect: true
      },
      {
        path: "/unilist/:model",
        navlink: "/unilist/blockstyle",
        name: "List Blockstyle",
        component: ListPanel,
        layout: "/admin",
        reload: true
      },
    ]
  },



  {
    collapse: true,
    name: "Visit",
    // rtlName: "المكونات",
    icon: Timeline,
    state: "visitCollapse",
    layout: "/admin",
    views: [
      {
        /* Te powinny sie docelowo znalezc, ale musi byc Universal Crud List */
        path: "/unilist/:model",
        navlink: "/unilist/visit",
        name: "List Visit",
        component: ListPanel,
        layout: "/admin",
        reload: true
      },
    ]
  },
  // CONTENT MANAGER

  {
    collapse: true,
    name: "Events",
    // rtlName: "صفحات",
    icon: Image,
    state: "eventCollapse",
    layout: "/contentmanager",
    views: [
      // {
      //   path: "/add_event",
      //   name: "Add Event",
      //   component: EditSlide,
      //   layout: "/contentmanager",
      //   model: 'slide',
      //   reload: true,
      //   attachto: ['60fa0bac2956083e2c28e217']
      // },
      // {
      //   path: "/edit_event/:id",
      //   name: "Edit Event",
      //   component: EditSlide,
      //   layout: "/contentmanager",
      //   model: 'slide',
      //   reload: true,
      //   redirect: true // Jesli True, sciezka nie wyswietla sie
      // },
      // {
      //   path: "/list_event",
      //   name: "List Events",
      //   component: ListPanel,
      //   layout: "/contentmanager",
      //   model: 'slide',
      //   reload: true
      // },
    ]
  },

];

export default dashRoutes;


