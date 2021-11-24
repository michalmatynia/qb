import {
  successColor,
  tooltip,
  cardTitle,
  grayColor
} from "../../material-dashboard-pro-react.js";

import hoverCardStyle from "../../material-dashboard-pro-react/hoverCardStyle.js";

const dashboardStyle = {
  ...hoverCardStyle,
  tooltip,
  tableCell: {
    fontSize: '8px',
    color: 'white',
    backgroundColor: 'grey'
  },
  mapStyle: {
    margin: '1rem auto',
    width: '300px',
    "& svg": {
      stroke: '#fff',
      "& path": {
        fill: '#a82b2b',
        cursor: 'pointer',
        outline: 'none',
        "&:hover": {
          fill: 'rgba(168,43,43,0.83)'
        },
        "&:focus": {
          fill: 'rgba(168,43,43,0.6)'
        },
        "&[aria-checked='true']": {
          fill: 'rgba(56,43,168,1)'
        },
        "&[aria-current='true']": {
          fill: 'rgba(56,43,168,0.83)'
        },
        // "&[id='ru']": {
        //   fill: 'rgba(56,43,168,0.6)'
        // }
      },

    },
  },
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center"
  },
  cardCategory: {
    color: grayColor[0],
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0"
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: grayColor[0]
  },
  stats: {
    color: grayColor[0],
    fontSize: "12px",
    lineHeight: "22px",
    display: "inline-flex",
    "& svg": {
      position: "relative",
      top: "4px",
      width: "16px",
      height: "16px",
      marginRight: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px"
    }
  },
  productStats: {
    paddingTop: "7px",
    paddingBottom: "7px",
    margin: "0"
  },
  successText: {
    color: successColor[0]
  },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  underChartIcons: {
    width: "17px",
    height: "17px"
  },
  price: {
    color: "inherit",
    "& h4": {
      marginBottom: "0px",
      marginTop: "0px"
    }
  }
};

export default dashboardStyle;
