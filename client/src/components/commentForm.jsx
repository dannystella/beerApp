import React from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import axios from  'axios';
import { Field, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect, dispatch } from 'react-redux';
import { createComment } from '../modules/users/actions';



class CommentForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          info : {
            currentUser: '',
            comment: '',
            upvotes: '',

          }
        }
        this.renderField = this.renderField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.afterSubmit = this.afterSubmit.bind(this);
    }

    renderField(field) {
      const { meta: {touched, error } } = field;
  
      const className = `form-group ${touched && error ? 'has-danger' : ''}`
      return (
        <div className = {className}>
        <label>{field.label}</label>
          <input
          className= "form-control"
            type = "text"
            {...field.input}
          />
          <div className = "text-danger">
          {touched ? error : ''}
          </div>
        </div>
      )
    } 
  onSubmit(values) {
    this.props.createBeer(values);

  }

   render() {
     const { handleSubmit } = this.props;

       return(  
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <Field
          label= "currentUser"
          name = "currentuser"
          component={this.renderField}
          />
          <Field
          label= "comment"
          name = "comment"
          component={this.renderField}
          />
          <button type = "submit" className = "btn btn-primary">Submit</button>
          <Link to="/Beers"  className = "btn btn-secondary">Go Back</Link>
        </form>
    )
   } 

}


function validate(values) {
  const errors = {};

  if(!values.comment) {
    errors.comment = "Enter a Beer name"
  }



  return errors;


}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newBeerForm'));

export default reduxForm({
  validate,
  form: 'commentForm',
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(
  connect(null, { createComment})(CommentForm)
);