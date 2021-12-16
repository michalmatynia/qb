import { runPattern } from '../GenericCompos/format_table'

export async function routing_gotoEdit_vh2({
    model,
    value,
    event,
    cell,
    sublistkey,
    mystate,
    myprops,
}) {
    if (event) {

        let cellvalue
        let showthis


        if (cell) {

            // cellkey = Object.keys(cell)[0]
            cellvalue = Object.values(cell)[0]

            showthis = runPattern({ column: cellvalue.fillfields.value.toconfig, item: value, indicator: '_id' })

            if (cellvalue.fillfields.value.toconfig.valuetype === 'arrayofrefs') {
                model = value.model
            }
        } else if (sublistkey) {

            showthis = runPattern({ column: null, item: value, indicator: '_id' })

            // RUN ID PATTERNS HERE AS WELL
            model = mystate.localStorage[sublistkey].viewmodel

        } else {

            showthis = runPattern({ column: null, item: value, indicator: '_id' })
        }

        // Tu nie moze byc admin

        let redirectpath = ''
        if (myprops.user.userData.role === 1) {
            redirectpath = 'admin'

        } else if (myprops.user.userData.role === 2) {
            redirectpath = 'contentmanager'

        }

        myprops.history.push(`/${redirectpath}/edit/${model}/${showthis}`)
    }

}

export async function routing_gotoEdit_vh3({
    model,
    value,
    event,
    cell,
    sublistkey,
    reactrouter_history,
    redux_userdata,
}) {
    if (event) {

        let cellvalue
        let showthis


        if (cell) {

            // cellkey = Object.keys(cell)[0]
            cellvalue = Object.values(cell)[0]

            showthis = runPattern({ column: cellvalue.fillfields.value.toconfig, item: value, indicator: '_id' })

            if (cellvalue.fillfields.value.toconfig.valuetype === 'arrayofrefs') {
                model = value.model
            }
        } else if (sublistkey) {

            showthis = runPattern({ column: null, item: value, indicator: '_id' })

            // RUN ID PATTERNS HERE AS WELL

        } else {

            showthis = runPattern({ column: null, item: value, indicator: '_id' })
        }

        // Tu nie moze byc admin

        let redirectpath = ''
        if (redux_userdata.role === 1) {
            redirectpath = 'admin'

        } else if (redux_userdata.role === 2) {
            redirectpath = 'contentmanager'

        }

        reactrouter_history.push(`/${redirectpath}/edit/${model}/${showthis}`)
    }

}