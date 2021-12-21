import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    useLocation,
} from 'react-router-dom';
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from '@material-ui/core/CircularProgress';
import parentstyleFunc from "./theming/Funcs/parentstyleFunc";
import processOverTheme from "./theming/Funcs/processOverTheme";

import {
    plg_findOne_QueMod,

} from './components/utils/Plugs/cms_plugs';
import {
    act_injectProp,
} from './redux/actions/generic/generic_actions';
import Panel from './components/Panel/panel'
import Frontside from './components/Frontside/frontside'
import HeaderHolder from './components/Header_footer/Header';

export default function App() {
    const dispatch = useDispatch()
    let location = useLocation()

    let currentmysite = useSelector(state => state.mysite.CurrentMysite)

    const [isBodyTheme, setIsBodyTheme] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    const processStyle = useCallback(async (item) => {
        return await parentstyleFunc(item)
    }, [])

    const useDynoStyles = makeStyles(isBodyTheme ? isBodyTheme : null);
    const parentclasses = useDynoStyles();

    React.useEffect(() => {
    
    
    },[])
    // /* Find Mysite */
    // React.useEffect(() => {


    //     let symbols = {
    //         "I": 1,
    //         "V": 5,
    //         "X": 10,
    //         "L": 50,
    //         "C": 100,
    //         "D": 500,
    //         "M": 1000
    //     };

    //     var romanToInt = function (s) {
    //         let value = 0;
    //         for (let i = 0; i < s.length; i += 1) {
    //             console.log(i);

    //             console.log(s[i + 1]);
    //             symbols[s[i]] < symbols[s[i + 1]] ? value -= symbols[s[i]] : value += symbols[s[i]]

    //             console.log(value);
    //         }
    //         return value
    //     };

    //     console.log(romanToInt('IV')); 

    // }, [])

    // React.useEffect(()=>{ 
    //     let s = '()[]{}'
    //     let result


    //     if(s.includes('()') || s.includes('[]') || s.includes('{}')) {
    //          result = true

    //     } else {
    //         result = false
    //     }

    //     console.log(result);

    // })

    // React.useEffect(() => {

    //     /* TEST Code */
    //     // Use reducer
    //     console.log('test');
    //     // let inargs = ['5', '2', 'C', 'D', '+']
    //     let inargs = ['5', '-2', '4', 'C', 'D', '9', '+', '+']
    //     // let inargs = ['1']

    //     // ######### Moje testy
    //     // let inargs = ['5', '2', '7', '14', 'C', 'D', '+']

    //     // let inargs = ['C', '13', 'D', '+', '1']
    //     // let inargs = ['C', '-3131313', 'D', '+', '1']

    //     var calPoints = function (ops) {

    //         var result = null
    //         let v_calc

    //         if (ops.length >= 1 && ops.length <= 1000) {

    //             v_calc = ops.reduce((accum, currentVal, index, array) => {

    //             if (!isNaN(parseInt(currentVal))) {
    //                 let range_array = [-3 * 104, 3 * 104]

    //                 if (range_array[0] <= parseInt(currentVal) && parseInt(currentVal) <= range_array[1]) {

    //                     // console.log(parseInt(currentValue));
    //                     return [...accum, parseInt(currentVal)]

    //                 } else {
    //                     return accum
    //                 }

    //             } else if (currentVal === 'C' && accum.length >= 1) {
    //                 accum.splice([accum.length - 1], 1);
    //                 return accum

    //             } else if (currentVal === 'D' && accum.length >= 1) {
    //                 return [...accum, accum[accum.length - 1] * 2]

    //             } else if (currentVal === '+' && accum.length >= 2) {
    //                 return [...accum, accum[accum.length - 1] + accum[accum.length - 2]]

    //             } else {
    //                 return accum
    //             }


    //         }, []);

    //         console.log(v_calc);
    //     }


    //         result = v_calc.reduce((accum, currentValue) => {
    //             return accum + currentValue
    //         }, 0)
    //         console.log(result);

    //         return result

    //     }


    //     calPoints(inargs)
    // }
    // )
    React.useEffect(() => {

        async function findMysite() {
            let inQuery = {
                isdefault: { "$eq": true }
            }
            let mysite_result = await plg_findOne_QueMod({
                model: 'mysite', dispatch, actionType: 'current', inQuery, populate: [{ path: 'default_language', populate: { path: 'referenceID', model: 'Nation' } }, {
                    path: 'checked', populate: {
                        path: 'referenceID',
                        model: 'Theme'
                    }
                }]
            })

            if (mysite_result.payload.checked.length > 0) {

                return { maintheme: await processStyle({ currentmysite: mysite_result.payload }), overtheme: await processOverTheme({ currentmysite: mysite_result.payload }) }

            } else {
                return null
            }
        }

        if (currentmysite === undefined) {

            findMysite().then((result) => {

                if (result) {
                    dispatch(act_injectProp({ dataToSubmit: result.overtheme, model: 'mysite', actionType: 'overtheme' }))
                    setIsBodyTheme(result.maintheme)
                }
                setIsLoading(false)
            })
        }

    }, [currentmysite, dispatch, processStyle]);

    const MemoizedWrapper = React.useCallback((props) => {

        if (parentclasses.body) {


            return <div
                className={cx(parentclasses.body)}
            >
                {props.children}
            </div>
        } else {
            return props.children

        }
    }, [parentclasses.body])

    if (
        currentmysite
        && (
            location.pathname.includes('/admin')
            || location.pathname.includes('/client')
            || location.pathname.includes('/contentmanager')
        ) && !isLoading

    ) {
        return <div>
            <Panel />
        </div>
    } else if (
        currentmysite && !isLoading
    ) {
        return <div>
            <HeaderHolder />
            <MemoizedWrapper>
                <Frontside />
            </MemoizedWrapper>
        </div>
    }
    else {
        return (
            <div
                style={{
                    //   backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundColor: '#E2E2E2',
                    backgroundPosition: " center",
                    paddingTop: '25%',
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    // zIndex: '9999',
                    textAlign: 'center',
                }}
            >
                <CircularProgress style={{ color: '#cccccc' }} thickness={7} />
            </div>
        )
    }

}




