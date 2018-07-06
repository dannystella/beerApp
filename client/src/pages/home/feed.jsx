import React from 'react';
import { connect } from 'react-redux';
import {fetchFeed,
  signin,
  signout,
  signup, 
  createComment,
  deleteComment,
  updateComment } from '../../modules/users/actions';
import { Link } from 'react-router-dom';


class UserFeed extends React.Component {
  constructor(props) {
    super(props);

this.renderFeed = this.renderFeed.bind(this);
}

  componentWillMount() {
     if(this.props.userAuth.authenticated) {
      console.log("hit");
      this.props.fetchFeed(this.props.userAuth.userinfo);
    }
  }

renderFeed() {
  if(this.props.userAuth.userFeed) {
    return this.props.userAuth.userFeed.map((item, i) => {
      if(item.comment) {
        return (<div key = {i}>
          <h3>{item.actor}</h3>
          <p>{item.comment}</p>
          </div>)
        } else if (item.beer) {
          return (<div key = {i}>
            <h3>{item.actor}</h3>
            <p>{item.beer.beername}</p>
            </div>)
        }
      })
    
  }
  return (<div>loading...</div>)
}


  render() {

    return (
      <div>
        {/* <Link to = "/" className ="btn btn-primary">Back to Home</Link> */}
        <p>Feed</p>
        {this.renderFeed()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    userAuth: state.userAuth,
  }
}


export default connect(mapStateToProps, { fetchFeed,
  signin,
  signout,
  signup, 
  createComment,
  deleteComment,
  updateComment})(UserFeed);