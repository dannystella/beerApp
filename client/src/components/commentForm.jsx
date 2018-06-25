import React from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import axios from  'axios';
import { Field, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect, dispatch } from 'react-redux';
import * as actions from '../modules/users/actions';
import authMiddleware from './authMiddleware.jsx';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          rerender: false,
          initialvalue: '',
          edit: false
        }
        this.renderField = this.renderField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      // if(this.props.comment !== undefined) {
      //   this.props.initialize({ text: this.props.comment.text })}
    } 

    componentWillMount() {

    }
    componentWillReceiveProps(props) {
      console.log(props.comment);
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
            value = "value"
            {...field.input}
          />
          <div className = "text-danger">
          {touched ? error : ''}
          </div>
        </div>
      )
    } 
  
  onSubmit(values) {
    console.log(" does form have comment", this.props.comment);
    values.username = this.props.userinfo.username;
    if(!this.props.comment) {
      console.log("add");
      this.props.createComment(values, this.props.reFetch, this.props.id, this.props.trigger);
    } else if (this.props.comment) {
      console.log("update", this.props.comment._id);
      this.props.updateComment(this.props.reFetch, this.props.comment, values, this.props.id, this.props.trigger);
      this.props.makeCommentNull();
    }
  }

   render() {
    const userinfo = (this.props.userinfo);
    const username = userinfo.username
     const { handleSubmit } = this.props;
       return (  
         <div>
          <form 
          onSubmit={handleSubmit(this.onSubmit.bind(this))} 
          >
          <h3>{username}</h3>
            <Field
            label= "text"
            name = "text"
            value="comment"
            component={this.renderField}
            />
            <button type = "submit" className = "btn btn-primary">Submit</button>
          </form>
        </div>
    )
   } 
}


function validate(values) {
  const errors = {};
  if(!values.comment) {
    errors.comment = "Enter a comment"
  }
  return errors;
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('commentForm'));




// const InitializeFromStateForm = connect(
//     state => ({
//       initialValues: state.initialvalue // pull initial values from account reducer
//     }),
    
//     actions, // bind account loading action creator
// )(CommentForm)
  
const mapStateToProps = (state, ownProps) => {
  let comment = '';
  if(ownProps.comment) {
    comment = ownProps.comment.text;
    console.log(comment, "important");

  }
  return {
    initialValues: {
      text: comment, 
    }
  }
}

CommentForm = reduxForm({
  validate,
  form: 'commentForm',
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(CommentForm)

export default connect(mapStateToProps, actions)(CommentForm);


