// import React, { Component } from 'react';
// import FormField from '../utils/Form/formfield';

// import { connect } from 'react-redux';
// import { updateUserData, clearUpdateUser} from '../../redux/actions/user_actions';
// import { update, generateData, isFormValid, populateFields } from '../utils/Form/formActions';

// class UpdatePersonalNfo extends Component {

//     state = {
//         formError: false,
//         formSuccess: false,
//         formdata: {
//             name: {
//                 element: 'input',
//                 value: '',
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

//             }
//         }
//     }

//     submitForm = (event) => {
//         event.preventDefault();

//         let dataToSubmit = generateData({formdata: this.state.formdata});
//         let formIsValid = isFormValid({formdata:this.state.formdata});

//         if (formIsValid) {
//             this.props.dispatch(updateUserData(dataToSubmit))
//             .then(()=>{
//                 if(this.props.user.updateUser.success){
//                     this.setState({
//                         formSuccess:true
//                     },()=>{
//                         setTimeout(()=>{
//                             this.props.dispatch(clearUpdateUser());
//                             this.setState({
//                                 formSuccess: false
//                             })
//                         }, 2000)
//                     })
//                 }
//             })

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

// componentDidMount(){

//     const newFormdata = populateFields(this.state.formdata, this.props.user.userData);

//     this.setState({
//         formdata: newFormdata
//     })

// }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={(event) => this.submitForm()}>
//                     <h2>Personal information</h2>
//                     <div className="form_block_two">
//                         <div className="block">
//                             <FormField
//                                 id={'name'}
//                                 formdata={this.state.formdata.name}
//                                 change={(element) => this.updateForm(element)}
//                             />
//                         </div>
//                         <div className="block">
//                             <FormField
//                                 id={'lastname'}
//                                 formdata={this.state.formdata.lastname}
//                                 change={(element) => this.updateForm(element)}
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <FormField
//                             id={'email'}
//                             formdata={this.state.formdata.email}
//                             change={(element) => this.updateForm(element)}
//                         />
//                     </div>
//                     <div>
//                         {
//                             this.state.formSuccess ?
//                             <div className="form_success">Success</div>
//                             :null
//                         }
//                         {this.state.formError ?
//                             <div className="error_label">Please check your data</div>
//                             : null}
//                         <button onClick={(event) => this.submitForm(event)}>Update personal info</button>

//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     }
// }

// export default connect(mapStateToProps)(UpdatePersonalNfo);