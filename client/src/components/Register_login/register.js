// import React, { Component } from 'react';
// import FormField from '../utils/Form/formfield';
// import { update, generateData, isFormValid } from '../utils/Form/formActions';
// import Dialog from '@material-ui/core/Dialog';
// import { connect } from 'react-redux';
// import { registerUser } from '../../redux/actions/user_actions';

// class Register extends Component {

//     state = {
//         formError: false,
//         formSuccess: false,
//         formErrorMessage: '',
//         formdata: {
//             name: {
//                 element: 'input',
//                 va: '',
//                 config: {
//                     name: 'name_input',
//                     type: 'text',
//                     placeholder: 'Enter your name'
//                 },
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: ''

//             },
//             lastname: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     name: 'lastname_input',
//                     type: 'text',
//                     placeholder: 'Enter your lastname'
//                 },
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: ''

//             },
//             email: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     name: 'email_input',
//                     type: 'email',
//                     placeholder: 'Enter your email'
//                 },
//                 validation: {
//                     required: true,
//                     email: true
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: ''

//             },
//             password: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     name: 'password_input',
//                     type: 'password',
//                     placeholder: 'Enter your password'
//                 },
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: ''

//             },
//             confirmPassword: {
//                 element: 'input',
//                 value: '',
//                 config: {
//                     name: 'confirm_password_input',
//                     type: 'password',
//                     placeholder: 'Confirm your password'
//                 },
//                 validation: {
//                     required: true,
//                     confirm: 'password'
//                 },
//                 valid: false,
//                 touched: false,
//                 validationMessage: ''

//             }
//         }
//     }

//     submitForm = (event) => {
//         event.preventDefault();

//         let dataToSubmit = generateData({formdata:this.state.formdata});
//         let formIsValid = isFormValid({formdata: this.state.formdata});

//         if (formIsValid) {

//             this.props.dispatch(registerUser(dataToSubmit))
//                 .then(response => {
//                     if (response.payload.success) {
//                         this.setState({
//                             formError: false,
//                             formSuccess: true
//                         });
//                         setTimeout(() => {
//                             this.props.history.push('/login_page')
//                         }, 3000)
//                     } else {
//                         this.setState({ formError: true, formErrorMessage: response.payload.message })
//                     }
//                 }).catch(e => {
//                     this.setState({ formError: true })
//                 })

//         } else {
//             this.setState({
//                 formError: true
//             })

//         }
//     }

//     updateForm = (element) => {
//         const newFormdata = update({ element, formdata: this.state.localStorage.form.formdata });
//         this.setState({
//             formError: false,
//             formdata: newFormdata
//         })
//     }

//     render() {
//         return (
//             <div className="page_wrapper">
//                 <div className="container">
//                     <div className="register_login_container">
//                         <div className="left">
//                             <form onSubmit={(event) => this.submitForm()}>
//                                 <h2>Personal Information</h2>
//                                 <div className="form_block_two">
//                                     <div className="block">
//                                         <FormField
//                                             id={'name'}
//                                             formdata={this.state.formdata.name}
//                                             change={(element) => this.updateForm(element)}
//                                         />
//                                     </div>
//                                     <div className="block">
//                                         <FormField
//                                             id={'lastname'}
//                                             formdata={this.state.formdata.lastname}
//                                             change={(element) => this.updateForm(element)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <FormField
//                                         id={'email'}
//                                         formdata={this.state.formdata.email}
//                                         change={(element) => this.updateForm(element)}
//                                     />
//                                 </div>
//                                 <h2>Verify Password</h2>
//                                 <div className="form_block_two">
//                                     <div className="block">
//                                         <FormField
//                                             id={'password'}
//                                             formdata={this.state.formdata.password}
//                                             change={(element) => this.updateForm(element)}
//                                         />
//                                     </div>
//                                     <div className="block">
//                                         <FormField
//                                             id={'confirmPassword'}
//                                             formdata={this.state.formdata.confirmPassword}
//                                             change={(element) => this.updateForm(element)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     {this.state.formError ?
//                                         <div className="error_label">{this.state.formErrorMessage}</div>
//                                         : null}
//                                     <button onClick={(event) => this.submitForm(event)}>Create account</button>

//                                 </div>


//                             </form>
//                         </div>

//                     </div>

//                 </div>
//                 <Dialog open={this.state.formSuccess}>
//                     <div className="dialog_alert">
//                         <div>Congratulations !!!</div>
//                         <div>You will be redirected</div>
//                     </div>
//                 </Dialog>
//             </div>
//         )
//     }
// }
// export default connect()(Register);
