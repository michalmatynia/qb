import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/actions/user_actions';
import { login_state } from "./Additional/state"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import { validateForm } from "../utils/Form/Funcs/validateForm"
import FormCustomInput from '../../components/Form/Custom/Input/FormCustomInput';
import GridContainer from "../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Button from "../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import Card from "../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import { ShowMessages } from '../../components/Message/Generic/static_msg'

import loginPageStyle from "../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import { generateData, isFormValid_v2 } from '../utils/Form/formActions';

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
    let history = useHistory();
    const dispatch = useDispatch()

    const [fcstate, setFcState] = useState(login_state);
    const [isShowMessage, setShowMessage] = useState(false);

    let image = "https://res.cloudinary.com/dp6k3l2ge/image/upload/v1631502986/613e38435816f0785b97b676/zcc2_dws6qf.jpg"
    async function submitForm(event) {


        let dataToSubmit = generateData({ formdata: fcstate });

        let formIsValid = isFormValid_v2({ formdata: fcstate.formdata });

        if (formIsValid) {
            dataToSubmit = { ...dataToSubmit, model: 'user' }
            let response = await dispatch(loginUser({ dataToSubmit, actionType: 'samestate' }))

            if (response.payload.loginSuccess) {


                if (response.payload.user.role === 1 || response.payload.user.role === 0) {
                    history.push('/admin/dashboard')

                } else if (response.payload.user.role === 2) {

                    console.log(response.payload.user);
                    history.push('/contentmanager/dashboard')
                }

            } else {

                console.log('Not logged in');

                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)

                }, 1000)

            }

        }

    }

    async function updateFormValues({ event, cellkey }) {

        // VERSION 2
        let validated = { isValid: false }
        if (fcstate[cellkey].validation.parse) {
            validated = validateForm({ formcell: fcstate[cellkey], event })

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

    }

    const classes = useStyles();
    return (
        <div
            className={classes.pageHeader}
            style={{
                backgroundImage: "url(" + image + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center"
            }}
        >
            <div className={classes.container}>
                {isShowMessage ? <ShowMessages
                    visible={isShowMessage}
                    message='Failed to Login'
                    color='danger'
                    place='bl'
                /> : null}
                <GridContainer justifyContent="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <form className={classes.form}>
                                <CardHeader
                                    color="primary"
                                    signup
                                    className={classes.cardHeader}
                                >
                                    <h4 className={classes.cardTitle}>Login</h4>
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
                                    Or Be Classical
                                </p>
                                <CardBody signup>
                                    <FormCustomInput
                                        formcell={fcstate.email}
                                        change={({ event }) => updateFormValues({ event, cellkey: 'email' })}
                                    />
                                    <FormCustomInput
                                        formcell={fcstate.password}
                                        change={({ event }) => updateFormValues({ event, cellkey: 'password' })}
                                    />
                                </CardBody>
                                <div className={classes.textCenter}>
                                    <Button simple color="primary" size="lg" onClick={(event) => submitForm(event)}>
                                        Login
                                    </Button>

                                    <Button simple color="primary" size="lg" onClick={() => history.push('/register')}>
                                        Register
                                    </Button>
                                </div>
                                <div className={classes.textLeft}>
                                    <Button simple color="primary" size="sm" onClick={() => history.push('/reset_user')}>
                                        I forgot my Password
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
