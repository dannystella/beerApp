import React from 'react'
import {  Input, TextArea, Button } from 'semantic-ui-react'
import axios from  'axios';
import { Field, Form, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect, dispatch } from 'react-redux';
import * as actions from '../modules/users/actions';
import authMiddleware from './authMiddleware.jsx';
import * as utils from '../utils/utils.js';

class CommentForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        commentValue: '',
        isEditing: false,
      }
      this.renderField = this.renderField.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }     

  componentDidUpdate() {
    if(this.state.isEditing) {
      return;
    }
    if(this.props.currentCommentValue) {
      if(this.props.item.id === this.props.currentCommentValue.beerObj.id) {
        console.log("yes");
        // if(this.props.currentCommentValue.commentObj.streamData.comment !== this.state.commentValue) {
          // console.log(this.props.currentCommentValue.commentObj.streamData.comment);
          this.setState({
            commentValue: this.props.currentCommentValue.commentObj.streamData.comment,
            isEditing: true
          })
        //}
      }
    }

  }

  componentWillReceiveProps(props) {
    
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      commentValue: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.isEditing === false) {
      let values = {};
      values.text = this.state.commentValue;
      values.userid = this.props.userInfo._id;
      values.username = this.props.userInfo.username;
      let beerReview = this.props.beerReview;
      this.props.createComment(values, this.props.reFetchFeed, this.props.id, this.props.trigger, beerReview)   
      e.target.reset();
      this.setState({
        commentValue: ''
      })
    }
    if(this.state.isEditing) {
      let values = {};
      values.text = this.state.commentValue;
      values.userid = this.props.userInfo._id;
      values.username = this.props.userInfo.username;
      let beerReview = this.props.beerReview; 
      this.props.updateComment(values, this.props.reFetchFeed, this.props.id, this.props.trigger, this.props.currentCommentValue)       
       console.log("bit")
       this.setState({
        commentValue: '',
        isEditing: false
      })    
      this.props.currentComment(null);
        // e.target.reset();
    }
  }
  renderField(field) {
    return (
      <div>
      <label>
      </label>
        <input
          className= "form-control"
          type = "text"
          onChange = {this.handleChange}
          value = {this.state.commentValue}
        />
        <div className = "text-danger">
        </div>
      </div>
    )
  } 

  render() {
    return (  
      <div>
      <form 
      onSubmit = {this.onSubmit}
      >
      {this.renderField()}
        <button type = "submit" className = "btn btn-primary">Add Comment</button>
      </form>
    </div>
    )
  } 
}

const mapStateToProps = (state, ownProps) => {
  let currentCommentValue;
  if(state.userAuth.currentEditingComment) {
    currentCommentValue = state.userAuth.currentEditingComment;
  }

  let userInfo = utils.stringChecker(state.userAuth.userinfo);
  let comment = '';

  if(ownProps.comment) {
    comment = ownProps.comment.text;
  }

  return {
    state: state,
    userInfo,
    currentCommentValue
  }
}

export default connect(mapStateToProps, actions)(CommentForm);