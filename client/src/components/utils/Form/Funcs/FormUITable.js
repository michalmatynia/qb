import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/core components
import { ColumnRow } from '../../../User/Admin/GenericCompos/func_table'


// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';

import GridContainer from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";

// import { validateForm } from "./validateForm"
// @material-ui/core components

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


import Table from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Table/Table.js";
// import Button from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";

import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

const useStyles = makeStyles(styles);

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;


export function ListTable({ formcell, change, remove, formcellkey, mystate, myprops, changePosition = null, removeItem = null, changeSort = null, handleVisible = null, toggleItem = null, changeQuantity = null }) {

    let list = formcellkey ? mystate.localStorage['form']['formdata'][formcellkey].value : null
        // let model = formcellkey ? mystate.localStorage['form']['formdata'][formcellkey].viewmodel : mystate.localStorage.model

    let viewparams = formcellkey ? mystate.localStorage['form']['formdata'][formcellkey].sublist.viewparams : null
    let tableparams = formcellkey ? mystate.localStorage['form']['formdata'][formcellkey].sublist.tableparams : null

    const classes = useStyles();

    const makeTable = ({ item, tableparams}) => {

        return tableparams.columns.map((column, i) => {

            if (column.columntype) {
                return <ColumnRow
                    column={column}
                    item={item}
                    formcellkey={formcellkey}
                    formcell={formcell}
                    handleVisible={handleVisible}
                    changePosition={changePosition}
                    removeItem={removeItem}
                    toggleItem={toggleItem}
                    changeQuantity={changeQuantity}
                    // model={model}
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

        let dataContainer = list.map((item, i) => {

            return [null,
                makeTable({ item, tableparams, formcell }),
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
                    onClick={(event) => changeSort({ event, cell: { [formcellkey]: formcell } })}
                />
                :
                <FontAwesomeIcon
                    id='sortarrowdown'
                    icon={faAngleDown}
                    className="icon"
                    onClick={(event) => changeSort({ event, cell: { [formcellkey]: formcell } })}
                />)
    }



    return <Table
        tableHead={formcell.value && tableparams.renderHeader ? createHeaderData() : undefined}
        tableData={formcell.value ? createTableData() : []}
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
export default function FormUITable({ formcell = null, formcellkey = null, change = null, remove = null, myprops = null, mystate = null, changePosition = null, removeItem = null, changeSort = null, changeQuantity = null }) {

    // const [textcontainer, setTextcontainer] = React.useState("");

    // const classes = useStyles();

    const renderTemplate = () => {

        let formTemplate = null;
        switch (formcell.category) {
            case ('uim_table'):
                formTemplate = (
                    <GridContainer>
                        <GridItem xs={formcell.wrapcompos.griditem.xs ? formcell.wrapcompos.griditem.xs : undefined} sm={formcell.wrapcompos.griditem.sm ? formcell.wrapcompos.griditem.sm : undefined} md={formcell.wrapcompos.griditem.md ? formcell.wrapcompos.griditem.md : undefined}>
                            {ListTable({ formcell, change, remove, formcellkey, myprops, mystate, changePosition, removeItem, changeSort, changeQuantity })}
                        </GridItem>
                    </GridContainer>
                )
                break;
            default:
                formTemplate = null;
        }

        return formTemplate;

    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

