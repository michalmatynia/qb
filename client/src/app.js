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

    // /* Find Mysite */
 
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

            console.log(mysite_result);

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




