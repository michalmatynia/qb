/*eslint-disable*/
import React from "react";
import { connect } from 'react-redux';

import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import { useRouter } from "../../../../../hoc/Funcs/hook_funcs";

// core components
import AdminNavbarLinks from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Navbars/AdminNavbarLinks.js";

import sidebarStyle from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/components/sidebarStyle.js";

import avatar from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/faces/avatar.jpg";
// Home Button
import {
  refreshHome
} from '../../../../../components/utils/Funcs/shortcut_funcs';
import List_Language_Menu from "../../../../../components/User/Admin/system/Languages/LanguageSelect/ListLgDropdown"
import { Link } from "react-router-dom";

export default function SidebarWrapper(props) {
    let ps
    const sidebarWrapper = React.createRef();

    React.useEffect(() => {

        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(sidebarWrapper.current, {
              suppressScrollX: true,
              suppressScrollY: false
            });
          }

          return function cleanup() {
            ps.destroy();

          }
    },[])

    const { className, user, headerLinks, links } = props;
    return (
      <div className={className} ref={sidebarWrapper}>
        {user}
        <List_Language_Menu />
        {headerLinks}
        {links}
      </div>
    );
}