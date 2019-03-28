import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const Article = (props) => (
  <div>
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column width={3}>
          <Link to={`/Articles/${props.article._id}`}>
            <Image src={props.article.image.source} size={props.article.image.size} />
          </Link>
        </Grid.Column>
        <Grid.Column width={13}>
          <div>
            <h2>
              {props.article.title}
            </h2>
            <h5>
              {props.article.caption}
            </h5>
            <p>
              {props.article.content}
            </p>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);


export default Article; 
