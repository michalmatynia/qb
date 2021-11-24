import {
plg_updateOne_queMod_oprMod,
} from '../../../utils/Plugs/cms_plugs';


export async function taxoFuncs_sub_removeLoopTags({ myprops = null, model = null, form = null, loopvalue = null, insert = null }) {

    let inQuery
    let inOperator
    let inParams

    let revform = form === 'tagparent' ? 'tagchild' : 'tagparent'

    let currenttags = [...loopvalue[revform]]

    let filteredNewTags_remove_Arr = currenttags.filter(e => e !== insert._id)

    if (currenttags.length > 0) {

        inQuery = {
            _id: { "$eq": loopvalue._id }
        }

        inOperator = {
            "$set": { [revform]: filteredNewTags_remove_Arr }
        }
        inParams = { new: true }

        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })
    }
}
export async function taxoFuncs_sub_addLoopTags({ myprops = null, model = null, form = null, loopvalue = null, insert = null }) {
    let inQuery
    let inOperator
    let inParams

    let revform = form === 'tagparent' ? 'tagchild' : 'tagparent'

    let currenttags = [...loopvalue[revform]]

    let filteredNewTags_add_Arr = loopvalue[revform].includes(insert._id) ? currenttags : [...currenttags, insert._id]

    if (filteredNewTags_add_Arr.length > 0) {
        inQuery = {
            _id: { "$eq": loopvalue._id }
        }

        inOperator = {
            "$set": { [revform]: filteredNewTags_add_Arr }
        }
        inParams = { new: true }

       await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })


    }
}