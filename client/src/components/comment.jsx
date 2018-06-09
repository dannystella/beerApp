import React, {Component} from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Comment = (props) => (
  <div>
    <Grid>
      <h4>{props.comment.user}</h4>
      <p>{props.comment.text}</p>
    </Grid>
  </div>  
);


export default Comment; 
