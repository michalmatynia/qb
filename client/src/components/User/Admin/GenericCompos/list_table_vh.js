import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
// core components
import {
  useSelector,
  useDispatch
} from 'react-redux'
import {
  useRouter,
} from "../../../../hoc/Funcs/hook_funcs";

import { useHistory, useLocation } from "react-router-dom";
import Table from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Table/Table.js";

import styles from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import { ColumnRow } from './func_table_vh'

// @material-ui/icons
const useStyles = makeStyles(styles);

export default function ListTable({ model = null, sublistkey = null, viewparams = null, tableparams = null, tiedtoformkey = null,  changePosition = null, changeSort = null, handleSwitch = null, removeItem = null, toggleItem = null }) {

  let redux_model_list = useSelector(state => state[model].list)

  const classes = useStyles();

  const makeTable = ({ item, tableparams, sublistkey, tiedtoformkey }) => {

    return tableparams.columns.map((column, i) => {

      if (column.columntype) {
        return <ColumnRow
          column={column}
          item={item}
          sublistkey={sublistkey}
          tiedtoformkey={tiedtoformkey}
          handleSwitch={handleSwitch}
          changePosition={changePosition}
          removeItem={removeItem}
          toggleItem={toggleItem}
          model={model}
          viewparams={viewparams}
          // formcellkey 
          // formcell
        />
      } else {
        return null
      }
    })


  }
  const makeTableHeader = ({ tableparams }) => {

    let tableHeadersAr = []
    tableparams.columns.map((column, i) => {
      return column.config.label ? tableHeadersAr.push(column.config.label) : null
    })

    return tableHeadersAr

  }
  const createTableData = () => {

    let dataContainer = redux_model_list.map((item, i) => {
      return [null,
        makeTable({ item, tableparams, sublistkey, tiedtoformkey }),
      ].flat()
    })

    return dataContainer
  }
  const createHeaderData = () => {

    return [
      handleSortArrow({ viewparams, changeSort }),
      makeTableHeader({ tableparams }),
    ].flat()

  }
  const handleSortArrow = ({ viewparams, changeSort }) => {

    let sortOrder = viewparams.sortOrder

    return (
      sortOrder === -1 ?
        <FontAwesomeIcon
          id='sortarrowup'
          icon={faAngleUp}
          className="icon"
          onClick={(event) => changeSort({ event, sublistkey, tiedtoformkey })}
        />
        :
        <FontAwesomeIcon
          id='sortarrowdown'
          icon={faAngleDown}
          className="icon"
          onClick={(event) => changeSort({ event, sublistkey, tiedtoformkey })}
        />)
  }
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


  // ============

  return <Table
    tableHead={redux_model_list && tableparams.renderHeader ? createHeaderData() : undefined}
    tableData={redux_model_list ? createTableData() : []}
    customCellClasses={[classes.center, classes.right, classes.right]}
    customClassesForCells={[0, 4, 5]}
    customHeadCellClasses={[
      classes.center,
      classes.right,
      classes.right
    ]}
    customHeadClassesForCells={[0, 4, 5]}
  />

}
