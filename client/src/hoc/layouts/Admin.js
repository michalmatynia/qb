import React, {useCallback} from "react";

// Access Control
import SolidFC from '../solid_fc';
// import {
//   useLocation,
//   useHistory,
// } from "react-router-dom";
import { useRouter } from "../Funcs/hook_funcs";
// import { useSelector } from 'react-redux'

import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
// import Sidebar from "../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Sidebar/Sidebar.js";
import Sidebar from "../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Sidebar/Sidebar_v2.js";

import routes from "../../routes";

import styles from "../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

var ps;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {

  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive,] = React.useState(false);
  const [image,] = React.useState(require("../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/sidebar-2.jpg"));
  const [color,] = React.useState("blue");
  const [bgColor,] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const [logo] = React.useState(require("../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/logo-white.svg"));
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount

  // let history = useHistory();
  // let location = useLocation();
  let reactrouter = useRouter()


  // *** Perfect Scroll messes up the scrolling when I exit Admin Dashboard, better to disconnect it
  React.useEffect(() => {

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {

      if (navigator.platform.indexOf("Win") > -1) {

        document.body.style.overflow = "";

        ps.destroy();

      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  // *** Adopt later

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Tego nie uzywam poki co
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  // const { Page, reload } = props

  const getRoutes = useCallback( (routes) => {
    return routes.map((prop, key) => {
      // Wyswietlanie

      if (prop.collapse) {
        return getRoutes(prop.views);
      }


      // Props layout nigdy nie zmatchuje tak. Rozroznic czy jak jest array czy nie

      let pathmatched
      if (Array.isArray(prop.layout)) {

        pathmatched = prop.layout.includes(reactrouter.match.path) ? true : false

      } else {
        pathmatched = prop.layout === reactrouter.match.path ? true : false
      }

      if (pathmatched) {

        return (
          // Side options for additional authentication per subpage
          <Route exact path={reactrouter.match.path + prop.path} key={key}><SolidFC Page={prop.component} reload={prop.reload} /></Route>

        );
      } else {
        return null;
      }

    });

  }, [reactrouter.match.path])


  const filterRoutes = (routes) => {

    let filtered_routes = routes.reduce((accum, currentvalue) => {

      if (Array.isArray(currentvalue.layout)) {
        return currentvalue.layout.includes(reactrouter.match.path) ? [...accum, currentvalue] : accum

      } else {
        return currentvalue.layout === reactrouter.match.path ? [...accum, currentvalue] : accum

      }
    }, [])
    return filtered_routes
  }

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      {/* {filterRoutes(routes)} */}
      <Sidebar
        // reduxprops={reduxprops}
        reactrouter={reactrouter}
        routes={filterRoutes(routes)}
        logo={logo.default}
        image={image.default}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/dashboard" />
                <Redirect from="/contentmanager" to="/contentmanager/dashboard" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/admin" to="/admin/dashboard" />
              <Redirect from="/contentmanager" to="/contentmanager/dashboard" />
            </Switch>
          </div>
        )}

      </div>
    </div>
  );
}
