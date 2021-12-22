import { runPattern } from '../GenericCompos/format_table'

import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_composeFilterfield_vh1({ cell }) {

    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    if ('filterfield' in cellvalue) {

        if (Object.values(cellvalue.value).length > 0) {

            let extractfiltertags = cellvalue.value.reduce((accum, currentvalue) => {
                let patternresult = runPattern({ column: cellvalue.filterfield.config, item: currentvalue })

                return patternresult ? [...accum, patternresult] : accum

            }, [])

            if (extractfiltertags.length > 0) {

                let extractfiltertagsflat = extractfiltertags.flat()

                let uniqueExtractFilterTags_Arr = extractfiltertagsflat.reduce((accum, currentvalue) => {

                    return accum.find(obj => obj.name === currentvalue.name) ? accum : [...accum, currentvalue]

                }, []);

                cellvalue.filterfield.value = uniqueExtractFilterTags_Arr
            }

        } else {

            if ('resetvalue' in cellvalue.fillfields.filterfield_value.toconfig) {

                return cellvalue.fillfields.filterfield_value.toconfig.resetvalue;
            }
        }

    }
    return cellvalue.filterfield.value

}
export async function actionFuncs_composeFilterfieldOptions_vh1({ cell, getlist, model, redux_localeuser, reactrouter_match, dispatch, populate = null, poliglot = null, fields = null }) {
   
    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    if ('filterfield' in cellvalue) {

        let inQuery = {}
        if (reactrouter_match.params.id !== undefined) {
            inQuery = Object.assign(inQuery, {
                _id: { "$ne": reactrouter_match.params.id ? reactrouter_match.params.id : null },
            });
        }

        if (poliglot) {
            inQuery = Object.assign(inQuery, {
                country: { "$eq": redux_localeuser.referenceID.alpha2Code },
                language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
            });
        }

        if (cellvalue.filterfield.value.length > 0) {
            inQuery = Object.assign(inQuery, {
                "$or": [{ typetagmain: { "$in": cellvalue.filterfield.value } }, { typetagmain: [] }],
            });
        }

        if (!model) {
            model = cellvalue.fillfields.options.fromconfig.model
        }

        let responseoptions = await plg_findMany({ model: cellvalue.fillfields.options.fromconfig.model, dispatch, actionType: 'samestate', inQuery, populate })
        cellvalue.config.options = [...responseoptions.payload]

        return cellvalue.config.options

    }
}