import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from '../modules/users/actions';

const Comment = (props) => (
  <div>
    <Grid.Row>
      <h4>{props.comment.username}</h4>

      <p>{props.comment.text}</p>
      {/* <button onClick = {((e) => {
        props.updateComment(props.reFetch, props.comment._id, props.beerId, "comment");
      })}>Edit</button> */}
      <button onClick = {((e) => {
        props.deleteComment(props.reFetch, props.comment._id, props.beerId, "comment");
      })}>Delete</button>
    </Grid.Row>
  </div>  
);


export default connect(null, actions)(Comment); 
