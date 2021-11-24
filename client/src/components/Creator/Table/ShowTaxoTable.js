import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Table/Table.js";

import styles from "../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import { ColumnRow } from '../Table/func_table'

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components

import Card from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";

// @material-ui/icons
const useStyles = makeStyles(styles);

export default function ShowTaxoTable({ viewparams = null, list = null, headerparams = null, rowparams = null, model = null,  changePosition = null,  handleSwitch = null, removeItem = null, toggleItem = null }) {
  // let list = useSelector(state => state[model].list)

  const classes = useStyles();

  function loopTableHeader({ headerparams }) {

    let mainheader = []

    for (let value of headerparams.columns) {

      mainheader.push(value.config.label)

    }

    return mainheader

  }

  function loopTableRows() {

    let maintable = []
    let columnrow = []

    for (let item of Object.values(list)) {

      for (let column of Object.values(rowparams.columns)) {

          columnrow.push(<ColumnRow
            column={column}
            item={item}
            handleSwitch={handleSwitch}
            changePosition={changePosition}
            removeItem={removeItem}
            toggleItem={toggleItem}
            model={model}
          />)

      }
      maintable.push(columnrow)
      columnrow = []
    }

    return maintable
  }

  // const handleSortArrow = ({ viewparams, changeSort }) => {

  //   let sortOrder = viewparams.sortOrder

  //   return (
  //     sortOrder === -1 ?
  //       <FontAwesomeIcon
  //         id='sortarrowup'
  //         icon={faAngleUp}
  //         className="icon"
  //         onClick={(event) => changeSort({ event, sublistkey, tiedtoformkey })}
  //       />
  //       :
  //       <FontAwesomeIcon
  //         id='sortarrowdown'
  //         icon={faAngleDown}
  //         className="icon"
  //         onClick={(event) => changeSort({ event, sublistkey, tiedtoformkey })}
  //       />)
  // }


  // ============

  return <div className={classNames(classes.main, classes.mainRaised)}>
    <div className={classes.container}>
      <Card plain>
        <CardBody plain>
          {headerparams.title ? <h3 className={classes.cardTitle}>{headerparams.title}</h3> : undefined}
          <Table
            tableHead={headerparams && headerparams.renderHeader ? loopTableHeader({ headerparams }) : undefined}
            tableData={list ? loopTableRows() : []}
            tableShopping
            customHeadCellClasses={[
              classes.textCenter,
              classes.description,
              classes.description,
              classes.textRight,
              classes.textRight,
              classes.textRight
            ]}
            customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
            customCellClasses={[
              classes.tdName,
              classes.customFont,
              classes.customFont,
              classes.tdNumber,
              classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
              classes.tdNumber + " " + classes.textCenter
            ]}
            customClassesForCells={[1, 2, 3, 4, 5, 6]}
          />
        </CardBody>
      </Card>
    </div>
  </div>

  //   SetElement.propTypes = {
  //     formcell: PropTypes.shape({
  //         element: PropTypes.oneOf([
  //             "input",
  //             "switch",
  //             "select",
  //             "upload",
  //             "autocomplete"
  //         ])
  //     })
  // };


}
