import { messageCompleted, messageLoading } from '../GenericFuncs/errormsg_funcs'
import { checkFuncs_saveLanguage } from '../GenericFuncs/check_funcs'

// export async function save_inForm({
//     value,
//     event,
//     cell,
//     sublistkey,
//     tiedtoformkey,
//     mystate = null,
//     myprops = null,
//     poliglot
// }) {
//     let newLocalStorage = { ...mystate.localStorage }

//     if (event) {

//         let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

//         await messageLoading({ myprops })

//         await checkFuncs_saveLanguage({ item: value, model, myprops, mystate, poliglot })

//         await messageCompleted({ myprops })

//     }

//     return newLocalStorage

// }