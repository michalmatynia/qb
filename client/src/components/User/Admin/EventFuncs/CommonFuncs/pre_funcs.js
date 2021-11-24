import { runPattern } from '../../GenericCompos/format_table'

// import {
//     resolvePath,
//     // setPath 
// } from '../../../../utils/Funcs/basefuncs'
// Tutaj wprowadzic pelny runPattern
export async function pre_processCheckedIDs({ tiedtoformkey = null, newLocalStorage = null, cell = null }) {
    let cellkey = null
    let cellvalue = null

    if (cell) {
        // This is where parts of state are Evaluated

        cellkey = Object.keys(cell)[0]
        cellvalue = Object.values(cell)[0]

    }

    let checkedIDs = null

    if (tiedtoformkey) {

        checkedIDs = newLocalStorage.form.formdata[tiedtoformkey].value.map(a => {

            return runPattern({ column: newLocalStorage.form.formdata[tiedtoformkey].fillfields.value.toconfig, item: a, indicator: '_id' })

        })
    } else if (cellvalue) {

        if (cellvalue.sublist.tiedtoelementkey) {
            checkedIDs = newLocalStorage.form.formdata[cellkey].value.map(a => {
                return runPattern({ column: newLocalStorage.form.formdata[cellkey].fillfields.value.toconfig, item: a, indicator: '_id' })
            })
        }
    } else {
        return null
    }


    return checkedIDs
}