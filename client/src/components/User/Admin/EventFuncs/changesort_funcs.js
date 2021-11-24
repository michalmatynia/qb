import { listFuncs_loadList_v2, listFuncs_changeSort_v2 } from '../GenericFuncs/list_funcs'
import { resolvePath, setPath } from '../../../utils/Funcs/basefuncs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'


export async function changesort_classicSort({ event, cell = null, sublistkey = null, tiedtoformkey = null, mystate = null, myprops = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        let viewparams = sublistkey ? mystate.localStorage[sublistkey].viewparams : mystate.localStorage.viewparams

        newLocalStorage = await listFuncs_changeSort_v2({
            viewparams,
            mystate,
            sublistkey,
            newLocalStorage
        })
        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })


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
export async function changesort_sortInForm({ event, cell = null, sublistkey = null, tiedtoformkey = null, mystate = null, myprops = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let cellkey = null
        let cellvalue = null
        let sourceViewpath

        if (cell) {
            // This is where parts of state are Evaluated

            cellkey = Object.keys(cell)[0]
            cellvalue = Object.values(cell)[0]

            newLocalStorage.form.formdata[cellkey] = cellvalue
        }

        if (sublistkey) {
            sourceViewpath = [sublistkey] + '.viewparams'
        } else if (cell) {
            sourceViewpath = 'form.formdata.' + [cellkey] + '.sublist.viewparams'
        } else {
            sourceViewpath = 'viewparams'
        }


        let sourceViewparams = resolvePath({ object: newLocalStorage, path: sourceViewpath })


        if (sourceViewparams.sortOrder === 1) {
            setPath({ object: newLocalStorage, path: [sourceViewpath] + '.sortOrder', value: -1 })
        } else {
            setPath({ object: newLocalStorage, path: [sourceViewpath] + '.sortOrder', value: 1 })
        }

        newLocalStorage['form']['formdata'][cellkey].value.sort(function (a, b) {
            if(newLocalStorage['form']['formdata'][cellkey].sublist.viewparams.sortOrder === 1) {
                return a.position - b.position;

            } else {
                return b.position - a.position;
            }

        });
    }
    return newLocalStorage

}