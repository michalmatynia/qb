import { runPattern } from '../GenericCompos/format_table'

import { resolvePath } from '../../../utils/Funcs/basefuncs'
import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';
import {modelPopulate} from './modelPopulate'

export async function actionFuncs_convertArrayOfRefs({ cell = null }) {

    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    return cellvalue.value.map((item) => {

        let extractedID = runPattern({ column: cellvalue.fillfields.value.toconfig, item: item, indicator: '_id' })

        let newItem = { model: item.model, position: item.position, referenceID: extractedID, visible: item.visible }

        return newItem

    })

}
export async function actionFuncs_convertArrayOfRefsWithQty({ cell = null }) {

    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    return cellvalue.value.map((item) => {

        let extractedID = runPattern({ column: cellvalue.fillfields.value.toconfig, item: item, indicator: '_id' })

        let newItem = { model: item.model, position: item.position, referenceID: extractedID, quantity: item.quantity }

        return newItem

    })

}

export async function actionFuncs_populateArrayOfRefsForDb_v2({ cell = null, getlist = null, myprops = null, populate = null, poliglot = null, fields = null, mypath = null }) {
    let inQuery
    let cellkey
    let cellvalue

    if (cell) {
        cellkey = Object.keys(cell)[0]
        cellvalue = Object.values(cell)[0]
        mypath = cellvalue.fillfields.value.toconfig.leftpath
    }


    // To jest wersja dla Edit
    if (fields) {
        getlist = fields[cellkey]
    }

    let newChecked = []

    let filteredmodels = getlist.reduce((accum, currentvalue, CurrentIndex) => {

        if (accum.includes(currentvalue.model)) {
            return [...accum]
        } else {
            return accum = [...accum, currentvalue.model]
        }

    }, []);

    let filteredIDs = getlist.map(item => {
        return resolvePath({ object: item, path: mypath })

    })


    for (let eachmodel of filteredmodels) {
        inQuery = {
            _id: { "$in": filteredIDs }
        }

        if (poliglot) {
            inQuery = Object.assign(inQuery, {
                country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
                language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
            });
        }


        populate = await modelPopulate({ model: eachmodel })

        let populatedresult = await plg_findMany({ model: eachmodel, myprops, actionType: 'samestate', inQuery, populate })

        for (let rootvalue of populatedresult.payload) {

            let foundIndexToPopulate = getlist.findIndex((item) => {

                return resolvePath({ object: item, path: mypath }) === rootvalue._id
            })

            if (foundIndexToPopulate !== -1) {

                newChecked.push(
                    {
                        model: eachmodel,
                        position: getlist[foundIndexToPopulate].position,
                        referenceID: rootvalue,
                        visible: getlist[foundIndexToPopulate].visible
                    }
                )
            }

        }
    }
    newChecked.sort(function (a, b) {
        return a.position - b.position;
    });

    return newChecked
}
export async function actionFuncs_populateArrayOfRefsForDbWithQty_v2({ cell = null, getlist = null, myprops = null, populate = null, poliglot = null, fields = null, mypath = null }) {
      
    let inQuery
    let cellkey
    let cellvalue

    if (cell) {
        cellkey = Object.keys(cell)[0]
        cellvalue = Object.values(cell)[0]
        mypath = cellvalue.fillfields.value.toconfig.leftpath
    }


    // To jest wersja dla Edit
    if (fields) {
        getlist = fields[cellkey]
    }

    let newChecked = []

    let filteredmodels = getlist.reduce((accum, currentvalue, CurrentIndex) => {

        if (accum.includes(currentvalue.model)) {
            return [...accum]
        } else {
            return accum = [...accum, currentvalue.model]
        }

    }, []);

    let filteredIDs = getlist.map(item => {
        return resolvePath({ object: item, path: mypath })

    })


    for (let eachmodel of filteredmodels) {
        inQuery = {
            _id: { "$in": filteredIDs }
        }

        if (poliglot) {
            inQuery = Object.assign(inQuery, {
                country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
                language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
            });
        }


        let populatedresult = await plg_findMany({ model: eachmodel, myprops, actionType: 'samestate', inQuery, populate })

        for (let rootvalue of populatedresult.payload) {

            let foundIndexToPopulate = getlist.findIndex((item) => {

                return resolvePath({ object: item, path: mypath }) === rootvalue._id
            })

            if (foundIndexToPopulate !== -1) {

                newChecked.push(
                    {
                        model: eachmodel,
                        position: getlist[foundIndexToPopulate].position,
                        referenceID: rootvalue,
                        quantity: getlist[foundIndexToPopulate].quantity
                    }
                )
            }

        }
    }
    newChecked.sort(function (a, b) {
        return a.position - b.position;
    });

    return newChecked
}
