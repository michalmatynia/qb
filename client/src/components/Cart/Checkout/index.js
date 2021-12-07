import React, { useState, useCallback } from "react";

import { useDispatch, useSelector } from 'react-redux'
import cx from "classnames";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// core components
import FormCustomInput from '../../Form/Custom/Input/FormCustomInput';
import Card from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import Button from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

import { generateData, isFormValid_v2 } from '../../utils/Form/formActions';
import { purchase_email, confirmation_email } from '../../utils/Email/templates'
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import { validateForm } from "../../utils/Form/Funcs/validateForm"
import Paypal from '../../utils/paypal'
import {
    plg_clearProps
  } from '../../utils/Plugs/cms_plugs';

import {
    plg_sendMail,
} from '../../utils/Plugs/cms_plugs';


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { checkout_state } from "./Additional/state"

import shoppingCartStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
const useStyles = makeStyles(shoppingCartStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

function translateLabels({ state, list }) {
    let newState = { ...state }
    for (let [key, value] of Object.entries(newState)) {

        if (key === 'email') {
            value.inputprops.placeholder = list.email_guestchk

        } else if (key === 'address') {
            value.inputprops.placeholder = list.address_guestchk

        } else if (key === 'phone') {
            value.inputprops.placeholder = list.phone_guestchk
        }
    }

    return newState
}
async function transactionError(data) {
    console.log('Paypal error')
}

async function transactionCanceled() {
    console.log('Transaction cancelled')
}

export default function CheckoutModal({ list, showCheckModal, toggleModal, toggleMessage, totalSum, currencySymbol }) {
    const dispatch = useDispatch()
    let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

    /* Lazy initializatoin */
    const [fcstate, setFcState] = useState(() => {
        const initialState = translateLabels({ state: checkout_state, list });
        return initialState;
    });
    const [selectedEnabled, setSelectedEnabled] = React.useState("a");
    const [isFormValid, setIsFormValid] = React.useState(false);

    let redux_cartuser = useSelector(state => state.user.cartUser)
    let redux_overtheme_mysite = useSelector(state => state.mysite.OverthemeMysite)
    const classes = useStyles({overtheme: redux_overtheme_mysite});


    React.useEffect(() => {

        if(isFormValid_v2({ formdata: fcstate })) {
            setIsFormValid(true)

        } else {
            setIsFormValid(false)

        }

    },[fcstate])

    const updateFormValues = useCallback(
        async ({ event, cellkey }) => {
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
        },[fcstate])
   

    const submitForm = useCallback(
        async ({ event = null, data = null }) => {
            let dataToSubmit = generateData({ formdata: fcstate });

            if (isFormValid && redux_cartuser.length > 0) {
    
                let html
                if (selectedEnabled === 'a') {
                    html = await purchase_email({ redux_cartuser, totalSum, currencySymbol })
    
                } else if (selectedEnabled === 'b') {
                    html = await confirmation_email({ redux_cartuser, totalSum, currencySymbol })
    
                }
                let to = dataToSubmit.email
                let from = redux_currentmysite.email
    
                let subject = `Thank you for purchase`
    
                let response = await plg_sendMail({ to, html, from, subject })

                // Reset the address field
    
                if (response.payload) {
    
                    for (let cellkey of Object.keys(fcstate)) {
    
                        setFcState(prevState => ({
                            ...prevState,
                            [cellkey]: {
                                ...prevState[cellkey],
                                value: '',
                            }
                        }));
                    }
    
    
                    await plg_clearProps({ dispatch, model: 'user', actionType: 'cart' })
                    toggleModal(false)
    
                    toggleMessage(true)
                    setTimeout(() => {
                        toggleMessage(false)
    
                    }, 1000)
                }
    
            }
        },[currencySymbol, dispatch, fcstate, isFormValid, redux_cartuser, redux_currentmysite.email, selectedEnabled, toggleMessage, toggleModal, totalSum])
   
    const checkoutFunction = useCallback(
         ({ selectedEnabled }) => {
            if (selectedEnabled === 'a') {
                return <Button simple color="primary" size="lg" onClick={(event) => submitForm({ event })}>
                    {list.complete_btn}
                </Button>
            } else if (selectedEnabled === 'b') {
                return <Paypal
                    toPay={totalSum}
                    currencySymbol={currencySymbol}
                    transactionError={(data) => transactionError(data)}
                    transactionCanceled={(data) => transactionCanceled(data)}
                    onSuccess={(data) =>  submitForm({ data })}
                />
            }
        },[currencySymbol, list.complete_btn, submitForm, totalSum])


    return (
        <Dialog
            classes={{
                root: classes.modalRoot,
                paper: classes.modal + " " + classes.modalLogin
            }}
            fullWidth={true}
            open={showCheckModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => toggleModal(false)}
            aria-labelledby="login-modal-slide-title"
            aria-describedby="login-modal-slide-description"
        >
            <Card plain
                className={classes.modalLoginCard}
            >
                <DialogTitle
                    id={list.title_guestchk}
                    disableTypography
                    className={cx(classes.textCenter, classes.cardLoginHeader)
                    }
                >
                    <Button
                        simple
                        className={classes.modalCloseButton}
                        style={{
                            color: 'grey'
                        }}
                        key="close"
                        aria-label="Close"
                        onClick={() => toggleModal(false)}
                    ><Close className={classes.modalClose} />
                    </Button>
                    <h5 className={classes.cardTitleWhite}>{list.title_guestchk}</h5>
                    <div className={classes.socialLine}>
                    </div>
                </DialogTitle>
                <DialogContent
                    id="login-modal-slide-description"
                    className={classes.modalBody}
                >
                    <CardBody className={classes.cardLoginBody}>
                        <FormCustomInput
                            formcell={fcstate.email}
                            change={({ event }) => updateFormValues({ event, cellkey: 'email' })}
                        />
                        <FormCustomInput
                            formcell={fcstate.address}
                            change={({ event }) => updateFormValues({ event, cellkey: 'address' })}
                        />
                        <FormCustomInput
                            formcell={fcstate.phone}
                            change={({ event }) => updateFormValues({ event, cellkey: 'phone' })}
                        />
                        <div className={classes.title} style={{ color: 'grey' }}>
                            <h3>Payment Method</h3>
                        </div>
                        <div
                            className={
                                classes.checkboxAndRadio +
                                " " +
                                classes.checkboxAndRadioHorizontal
                            }
                        >
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={selectedEnabled === "a"}
                                        onChange={() => setSelectedEnabled("a")}
                                        value="a"
                                        name="radio button enabled"
                                        aria-label="A"
                                        icon={
                                            <FiberManualRecord className={classes.radioUnchecked} />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord className={classes.radioChecked} />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot,
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label,
                                    root: classes.labelRoot,
                                }}
                                label="Bank Transfer"
                            /><AccountBalanceIcon />
                        </div>
                        <div
                            className={
                                classes.checkboxAndRadio +
                                " " +
                                classes.checkboxAndRadioHorizontal
                            }
                        >
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={selectedEnabled === "b"}
                                        onChange={() => setSelectedEnabled("b")}
                                        value="b"
                                        name="radio button enabled"
                                        aria-label="B"
                                        icon={
                                            <FiberManualRecord className={classes.radioUnchecked} />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord className={classes.radioChecked} />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot,
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label,
                                    root: classes.labelRoot,
                                }}
                                label="PayPal"
                            /><PaymentIcon />
                        </div>

                    </CardBody>


                </DialogContent>
                <DialogActions
                    className={
                        cx(classes.modalFooter, classes.justifyContentCenter)
                    }
                >{isFormValid ? checkoutFunction({ selectedEnabled }) : null}
                </DialogActions>
            </Card>
        </Dialog>
    )
}