import React from 'react';
import { connect } from 'react-redux';
import {fetchFeed,
  signin,
  signout,
  signup, 
  createComment,
  deleteComment,
  updateComment,
  addUserBeer,
 } from '../../modules/users/actions';
import { Link } from 'react-router-dom';
import Loader from '../../components/loader.jsx';
import Comment from '../../components/comment.jsx';
import CommentForm from '../../components/commentForm.jsx';

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
      // if(item.comment) {
      //   return (<div key = {i}>
      //     <h3>{item.actor}</h3>
      //     <p>{item.comment}</p>
      //     </div>)
      //   } 
      console.log(item, "feed item");
      if (item.beer) {
          return (<div key = {i}>
            <h3>{item.actor}</h3>
            <p>{item.beer.beername}</p>
            <p>{item.review.rating}</p>
            <p>{item.review.review}</p>
            {item.comments.map((comment, i) => {
              return (<div className = 'commentBox' key = {comment.text}>
               <h6>{comment.username}</h6>
               <p>{comment.text}</p>    
              </div>  
              )
            })}
            <div>
              <CommentForm beerReview = {item}/>

            </div>
            </div>)
        }
      })
    
  }
  return (<div><Loader/></div>)
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
  console.log(state, "feed state");
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
  updateComment,
  addUserBeer,
})(UserFeed);