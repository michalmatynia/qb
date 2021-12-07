import React, { useCallback } from "react";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
// sections of this Page
import { LoopItems } from "./home_funcs"
// import classNames from "classnames";

// import sectionsPageStyle from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";

// import Footer from '../../../components/Header_footer/Footer';

// const useStyles = makeStyles(sectionsPageStyle);

export default function SectionsPage({ list }) {
  const [isLoading, setIsLoading] = React.useState(true);

const [isMainTable, setIsMainTable] = React.useState();

  React.useEffect(() => {
    var href = window.location.href.substring(
      window.location.href.lastIndexOf("#") + 1
    );
    if (window.location.href.lastIndexOf("#") > 0) {
      document.getElementById(href).scrollIntoView();
    }
    window.addEventListener("scroll", updateView);
    updateView();
    return function cleanup() {
      window.removeEventListener("scroll", updateView);
    };
  });
  const updateView = () => {

    let contentSections
    let navigationItems
    if (document.getElementById("cd-vertical-nav") !== null) {
      contentSections = document.getElementsByClassName("cd-section");
      navigationItems = document
        .getElementById("cd-vertical-nav")
        .getElementsByTagName("a");

      for (let i = 0; i < contentSections.length; i++) {
        // var activeSection =
        //   parseInt(navigationItems[i].getAttribute("data-number"), 10) - 1;

        var activeSection =
          navigationItems[i].getAttribute("data-number");
        if (
          contentSections[i].offsetTop - window.innerHeight / 2 <
          window.pageYOffset &&
          contentSections[i].offsetTop +
          contentSections[i].scrollHeight -
          window.innerHeight / 2 >
          window.pageYOffset
        ) {
          navigationItems[activeSection].classList.add("is-selected");
        } else {
          navigationItems[activeSection].classList.remove("is-selected");
        }
      }
    }

  };
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const generateVerticalMenu = ({ list }) => {

    return list ? list.map((item, index) => {

      return <li
        key={index}
      >
        <a
          href={'#' + item._id}
          data-number={index}
          className={index === 0 ? "is-selected" : null}
          onClick={e => {
            var isMobile = navigator.userAgent.match(
              /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
            );
            if (isMobile) {
              // if we are on mobile device the scroll into view will be managed by the browser
            } else {
              e.preventDefault();
              smoothScroll(item._id);
            }
          }}
        >
          <span className="cd-dot" style={{ backgroundColor: '#cccccc' }} />
          <span className="cd-label" >{item.name}</span>
        </a>
      </li>

    }) : null

  }

  const smoothScroll = target => {
    var targetScroll = document.getElementById(target);
    scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
  };
  const scrollGo = (element, to, duration) => {

    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };


  const loopList = useCallback(
     async () => {

      return list.map((item, i) => {
        return <LoopItems
          item={item}
          key={item._id}
        />
      }) 
    }, [list])



    React.useEffect(() => {
    
      loopList().then((mt)=>{
        setIsMainTable(mt)
        setIsLoading(false)
      })
    
    },[loopList]);

  // const classes = useStyles();
  return (
    // <div className={classNames(classes.main)}>
    !isLoading ?<div>
      {isMainTable}
      <nav id="cd-vertical-nav">
        <ul >
          {list ? generateVerticalMenu({ list }) : null}
        </ul></nav>
    </div> : null

  );
}
