import { listFuncs_loadList_v2 } from '../GenericFuncs/list_funcs'
import { reposFuncs_ChangePosition } from '../GenericFuncs/repos_funcs'
import { messageCompleted, messageLoading } from '../GenericFuncs/errormsg_funcs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'

export async function changpos_classicAdjust({
    value,
    direction,
    event,
    cell,
    sublistkey,
    tiedtoformkey,
    mystate = null,
    myprops = null,
    poliglot
}) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {

        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })

        await messageLoading({ myprops })

        await reposFuncs_ChangePosition({ item: value, direction, model, myprops, mystate, poliglot })

        await messageCompleted({ myprops })

        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model,
            myprops,
            mystate,
            poliglot,
            hideIDs: checkedIDs,
            newLocalStorage
        })

    }

    return newLocalStorage

}
export async function changpos_informAdjust({
    value,
    direction,
    event,
    cell,
    mystate = null,

}) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let cellkey = null
        let cellvalue = null

        if (cell) {
            // This is where parts of state are Evaluated

            cellkey = Object.keys(cell)[0]
            cellvalue = Object.values(cell)[0]

            newLocalStorage.form.formdata[cellkey] = cellvalue
        }

        if (value.position + direction > 0 && value.position + direction <= mystate.localStorage.form.formdata[cellkey].value.length) {

            let oldChecked = [...cellvalue.value]
        
            let currentIndex = oldChecked.indexOf(value)

            let targetIndex
            if(newLocalStorage['form']['formdata'][cellkey].sublist.viewparams.sortOrder === 1) {
                targetIndex = currentIndex + direction
            } else {
                targetIndex = currentIndex - direction
            }
        
            // Swap positions
            let currentPosition = cellvalue.value[currentIndex].position
        
            // Assign values on dynamic path
            newLocalStorage['form']['formdata'][cellkey].value[targetIndex].position = currentPosition
            newLocalStorage['form']['formdata'][cellkey].value[currentIndex].position = currentPosition + direction
        
            newLocalStorage['form']['formdata'][cellkey].value.sort(function (a, b) {
                if(newLocalStorage['form']['formdata'][cellkey].sublist.viewparams.sortOrder === 1) {
                    return a.position - b.position;
                } else {
                    return b.position - a.position;
                }
    
            });
        }


    }

    return newLocalStorage

}