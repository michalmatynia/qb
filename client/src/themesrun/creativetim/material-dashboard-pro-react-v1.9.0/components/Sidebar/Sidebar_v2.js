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
import SidebarWrapper from "./SidebarWrapper_v2"

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true,
      ...this.getCollapseStates(props.routes)
    };
  }
  mainPanel = React.createRef();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map(prop => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : "";
  };
  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    const { classes, color, rtlActive } = this.props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      // Filtering routes with incorrect paths
      let pathmatched
      if (Array.isArray(prop.layout)) {

        pathmatched = prop.layout.includes(this.props.reactrouter.match.path) ? true : false

      } else {
        pathmatched = prop.layout === this.props.reactrouter.match.path ? true : false

      }

      // Set up proper path
      let properpath
      if (pathmatched) {

        if ('navlink' in prop) {
          properpath = this.props.reactrouter.match.path + prop.navlink

        } else {
          properpath = this.props.reactrouter.match.path + prop.path
        }

      } else {
        return null;
      }

      // =======================
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        const navLinkClasses =
          classes.itemLink +
          " " +
          cx({
            [" " + classes.collapseActive]: this.getCollapseInitialState(
              prop.views
            )
          });
        const itemText =
          classes.itemText +
          " " +
          cx({
            [classes.itemTextMini]:
              this.props.miniActive && this.state.miniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && this.props.miniActive && this.state.miniActive,
            [classes.itemTextRTL]: rtlActive
          });
        const collapseItemText =
          classes.collapseItemText +
          " " +
          cx({
            [classes.collapseItemTextMini]:
              this.props.miniActive && this.state.miniActive,
            [classes.collapseItemTextMiniRTL]:
              rtlActive && this.props.miniActive && this.state.miniActive,
            [classes.collapseItemTextRTL]: rtlActive
          });
        const itemIcon =
          classes.itemIcon +
          " " +
          cx({
            [classes.itemIconRTL]: rtlActive
          });
        const caret =
          classes.caret +
          " " +
          cx({
            [classes.caretRTL]: rtlActive
          });
        const collapseItemMini =
          classes.collapseItemMini +
          " " +
          cx({
            [classes.collapseItemMiniRTL]: rtlActive
          });
        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined }
            )}
          >
            <NavLink
              to={"#"}
              className={navLinkClasses}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === "string" ? (
                  <Icon className={itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={itemIcon} />
                )
              ) : (
                <span className={collapseItemMini}>
                  {rtlActive ? prop.rtlMini : prop.mini}
                </span>
              )}
              <ListItemText
                primary={rtlActive ? prop.rtlName : prop.name}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      (this.state[prop.state] ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined }
                )}
              />
            </NavLink>
            <Collapse in={this.state[prop.state]} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                {this.createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        );
      }

      const innerNavLinkClasses =
        classes.collapseItemLink +
        " " +
        cx({
          [" " + classes[color]]: this.activeRoute(prop.path)
        });
      const collapseItemMini =
        classes.collapseItemMini +
        " " +
        cx({
          [classes.collapseItemMiniRTL]: rtlActive
        });
      const navLinkClasses =
        classes.itemLink +
        " " +
        cx({
          [" " + classes[color]]: this.activeRoute(prop.path)
        });
      const itemText =
        classes.itemText +
        " " +
        cx({
          [classes.itemTextMini]:
            this.props.miniActive && this.state.miniActive,
          [classes.itemTextMiniRTL]:
            rtlActive && this.props.miniActive && this.state.miniActive,
          [classes.itemTextRTL]: rtlActive
        });
      const collapseItemText =
        classes.collapseItemText +
        " " +
        cx({
          [classes.collapseItemTextMini]:
            this.props.miniActive && this.state.miniActive,
          [classes.collapseItemTextMiniRTL]:
            rtlActive && this.props.miniActive && this.state.miniActive,
          [classes.collapseItemTextRTL]: rtlActive
        });
      const itemIcon =
        classes.itemIcon +
        " " +
        cx({
          [classes.itemIconRTL]: rtlActive
        });

      return (
        <ListItem
          key={key}
          className={cx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined }
          )}
        >
          <NavLink
            to={properpath}
            className={cx(
              { [navLinkClasses]: prop.icon !== undefined },
              { [innerNavLinkClasses]: prop.icon === undefined }
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === "string" ? (
                <Icon className={itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={itemIcon} />
              )
            ) : (
              <span className={collapseItemMini}>
                {rtlActive ? prop.rtlMini : prop.mini}
              </span>
            )}
            <ListItemText
              primary={rtlActive ? prop.rtlName : prop.name}
              disableTypography={true}
              className={cx(
                { [itemText]: prop.icon !== undefined },
                { [collapseItemText]: prop.icon === undefined }
              )}
            />
          </NavLink>
        </ListItem>
      );
    });
  };
  render() {
    const {
      classes,
      logo,
      image,
      logoText,
      routes,
      bgColor,
      rtlActive
    } = this.props;
    const itemText =
      classes.itemText +
      " " +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
        [classes.itemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.itemTextRTL]: rtlActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextRTL]: rtlActive
      });
    const userWrapperClass =
      classes.user +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    const caret =
      classes.caret +
      " " +
      cx({
        [classes.caretRTL]: rtlActive
      });
    const collapseItemMini =
      classes.collapseItemMini +
      " " +
      cx({
        [classes.collapseItemMiniRTL]: rtlActive
      });
    const photo =
      classes.photo +
      " " +
      cx({
        [classes.photoRTL]: rtlActive
      });

    let firstname
    let lastname
    let userimage

    if ('images' in this.props.user.userData) {
      firstname = this.props.user.userData.name
      lastname = this.props.user.userData.lastname
      userimage = this.props.user.userData.images.length > 0 ? this.props.user.userData.images[0].secure_url : '/images/image_not_availble.png'
    }
    let mylogoimage
    if ('CurrentMysite' in this.props.mysite) {
      mylogoimage = this.props.mysite.CurrentMysite.images.length > 0 ? this.props.mysite.CurrentMysite.images[0].secure_url : '/images/image_not_availble.png'

    }

    var user = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={userimage} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + " " + classes.userItem}>
            <NavLink
              to={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <ListItemText
                primary={rtlActive ? "?????????? ??????????" : firstname + ' ' + lastname}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      classes.userCaret +
                      " " +
                      (this.state.openAvatar ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={itemText + " " + classes.userItemText}
              />
            </NavLink>
            <Collapse

              style={{
                display: 'grid',
                width: '100%',
                // backgroundColor: 'red'
              }}

              in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}

              >
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "????" : "MP"}
                    </span>
                    <ListItemText
                      primary={rtlActive ? "????????" : "My Profile"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "??????" : "EP"}
                    </span>
                    <ListItemText
                      primary={
                        rtlActive ? "?????????? ?????????? ????????????" : "Edit Profile"
                      }
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "??" : "S"}
                    </span>
                    <ListItemText
                      primary={rtlActive ? "??????????????" : "Settings"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    );
    var links = (
      <List className={classes.list}>{this.createLinks(routes)}</List>
    );

    const logoNormal =
      classes.logoNormal +
      " " +
      cx({
        [classes.logoNormalSidebarMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.logoNormalSidebarMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.logoNormalRTL]: rtlActive
      });
    const logoMini =
      classes.logoMini +
      " " +
      cx({
        [classes.logoMiniRTL]: rtlActive
      });
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <div className={logoClasses}>
        <Link
          to="/"
          onClick={() => refreshHome({ myprops: this.props })}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <img
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50%',
              }}
              src={mylogoimage} alt="..." />
          </div>
        </Link>
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref={this.mainPanel}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              headerLinks={<AdminNavbarLinks rtlActive={rtlActive} />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object
};
const mapStateToProps = (state) => {
  return {
    mysite: state.mysite,
    user: state.user,
    messages: state.messages
  }
}
export default connect(mapStateToProps)(withStyles(sidebarStyle)(Sidebar));
