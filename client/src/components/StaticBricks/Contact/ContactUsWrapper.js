import React, { useCallback } from "react";
// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";

// @material-ui/icons
import ContactUsPage from './ContactUsPage01'
import ProcessAsWrapperBG from '../../../functions/HookFuncs/ProcessAsWrapperBG'

import contactsStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/contactsStyle.js";

const useStyles = makeStyles(contactsStyle);

export default function ContactUsWrapper({ list}) {
    const classes = useStyles();


    const WrapperOutputNext = useCallback(
        (props) => {

            if (list.images.length > 0) {

                return <ProcessAsWrapperBG
                    props={props}
                    list={list}
                    parentClassName={cx(
                         classes.section
                    )}
                />
            } else {
                return <div
                    className={cx(
                        classes.contacts, classes.section
                    )}
                >{props.children}</div>
            }

        }, [classes.contacts, classes.section, list])


    return <WrapperOutputNext>
        <div className={classes.container} style={{ paddingTop: '80px' }}>
            <ContactUsPage
                list={list} />
        </div>
    </WrapperOutputNext>

}
