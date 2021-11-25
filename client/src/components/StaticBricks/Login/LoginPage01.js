import React, { useState, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import {
    useSelector,
    useDispatch
} from 'react-redux'

/* STATE */
// import { login_state } from "./Additional/statetwo"
import { login_state } from "./Additional/state"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

/* THEME COMPONENTS */
import FormCustomInput from '../../../components/Form/Custom/Input/FormCustomInput';
import GridContainer from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Button from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import Card from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import { ShowMessages } from '../../../components/Message/Generic/static_msg'

/* ACTIONS */
import { loginUser } from '../../../redux/actions/user_actions';
import { validateForm } from "../../utils/Form/Funcs/validateForm"


import loginPageStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import { generateData, isFormValid_v2 } from '../../utils/Form/formActions';

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage({ list}) {

    let history = useHistory();
    const dispatch = useDispatch()
    let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

    const [fcstate, setFcState] = useState(login_state);
    const [isShowMessage, setShowMessage] = React.useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    React.useEffect(() => {

        if (isFormValid_v2({ formdata: fcstate })) {

            setIsFormValid(true)

        } else {
            setIsFormValid(false)

        }


    }, [fcstate])

    React.useEffect(() => {

        async function assignLabels() {
            let fieldlabels = ['form_email', 'form_password']

            for (let eachone of fieldlabels) {

                setFcState(prevState => ({
                    ...prevState,
                    [eachone]: {
                        ...prevState[eachone],
                        inputprops: { ...prevState[eachone].inputprops, placeholder: list[eachone] },
                    }
                }));
            }
        }
        if (list) {
            assignLabels()

        }

    }, [list])

    const updateFormValues = useCallback(
        async ({ event, cellkey }) => {
            // VERSION 2
            let validated = { isValid: false }
            if (fcstate[cellkey].validation.parse) {
                validated = validateForm({ redux_currentmysite, formcell: fcstate[cellkey], event })

                if (!validated.isValid) {
                    setFcState(prevState => ({
                        ...prevState,
                        [cellkey]: {
                            ...prevState[cellkey],
                            validation: { ...prevState[cellkey].validation, message: validated.vtext[0] },
                            value: event.target.value,
                            valid: false
                        }
                    }));

                } else {
                    setFcState(prevState => ({
                        ...prevState,
                        [cellkey]: {
                            ...prevState[cellkey],
                            validation: { ...prevState[cellkey].validation, message: '' },
                            value: event.target.value,
                            valid: true
                        }
                    }));
                }

            } else {
                setFcState(prevState => ({
                    ...prevState,
                    [cellkey]: {
                        ...prevState[cellkey],
                        value: event.target.value,
                    }
                }));
            }
        }, [fcstate, redux_currentmysite]
    )
    const submitForm = useCallback(
        async ({ event }) => {
            let dataToSubmit = generateData({ formdata: fcstate });
            // let formIsValid = isFormValid_v2({ formdata: fcstate.formdata });

            if (isFormValid) {
                dataToSubmit = { ...dataToSubmit, model: 'user' }

                let response = await dispatch(loginUser({ dataToSubmit, actionType: 'samestate' }))

                if (response.payload.loginSuccess) {

                    if (response.payload.user.role === 1 || response.payload.user.role === 0) {
                        history.push('/admin/dashboard')

                    } else if (response.payload.user.role === 2) {

                        history.push('/contentmanager/dashboard')
                    }

                } else {

                    /* Show message functionality */

                    setShowMessage(true)
                    setTimeout(() => {
                        setShowMessage(false)

                    }, 1000)


                }

            }
        }, [dispatch, fcstate, history, isFormValid])


    const classes = useStyles();

    return (
        <GridContainer justifyContent="center">
            {isShowMessage ? <ShowMessages
            visible={isShowMessage}
            message={list.message_loginfailed}
            color='danger'
            place='bl'
        /> : null}
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader
                        color="primary"
                        signup
                        className={classes.cardHeader}
                    >
                        <h4 className={classes.cardTitle}>{list.name}</h4>
                        <div className={classes.socialLine}>
                            <Button
                                justIcon
                                color="transparent"
                                className={classes.iconButtons}
                                onClick={e => e.preventDefault()}
                            >
                                <i className="fab fa-twitter" />
                            </Button>
                            <Button
                                justIcon
                                color="transparent"
                                className={classes.iconButtons}
                                onClick={e => e.preventDefault()}
                            >
                                <i className="fab fa-facebook" />
                            </Button>
                            <Button
                                justIcon
                                color="transparent"
                                className={classes.iconButtons}
                                onClick={e => e.preventDefault()}
                            >
                                <i className="fab fa-google-plus-g" />
                            </Button>
                        </div>
                    </CardHeader>
                    <p className={classes.description + " " + classes.textCenter}>
                        {list.description}
                    </p>
                    <CardBody signup>
                        <FormCustomInput
                            formcell={fcstate.form_email}
                            change={({ event }) => updateFormValues({ event, cellkey: 'form_email' })}
                        />
                        <FormCustomInput
                            formcell={fcstate.form_password}
                            change={({ event }) => updateFormValues({ event, cellkey: 'form_password' })}
                        />
                    </CardBody>
                    <div className={classes.textCenter}>
                        <Button simple color="primary" size="lg" onClick={(event) => submitForm(event)}>
                            {list.btn_login}
                        </Button>

                        <Button simple color="primary" size="lg" onClick={() => history.push('/register')}>
                            {list.btn_register}
                        </Button>
                    </div>
                    <div className={classes.textLeft}>
                        <Button simple color="primary" size="sm" onClick={() => history.push('/reset_user')}>
                            {list.btn_forgotpassword}
                        </Button>
                    </div>
                </Card>
            </GridItem>
        </GridContainer>

    );
}
