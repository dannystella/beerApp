import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import MapComp from '../../components/map.jsx';
import { fetchFeed, fetchUser, fetchUsers } from '../../modules/users/actions/general_actions';
import { createComment, deleteComment, updateComment, currentComment } from '../../modules/users/actions/comments_actions';
import { signup, signin, signout } from '../../modules/users/actions/userAuth_actions';
import { deleteUserBeer } from '../../modules/users/actions/userActivities_actions';
import { Link } from 'react-router-dom';
import { Feed, Icon, Image } from 'semantic-ui-react';
import Loader from '../../components/loader.jsx';
import Comment from '../../components/comment.jsx';
import CommentForm from '../../components/commentForm.jsx';
import Like from '../../components/like.jsx';
import * as utils from '../../utils/utils.js';
import Joe from '../../components/joe.jpg';
import uniqueid from 'uniqid';
import s3 from '../../config';


class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      currentBeerEdit: '',
      currentCommentEdit: '',
      refetch: false
    }

    this.renderFeed = this.renderFeed.bind(this);
    this.reFetchFeed = this.reFetchFeed.bind(this);
    this.currentCommentCatcher = this.currentCommentCatcher.bind(this);
    this.handleAddLike = this.handleAddLike.bind(this);
  }

  componentWillMount() {
    if (this.props.userAuth.authenticated) {
      this.props.fetchFeed(this.props.userAuth.userinfo);
    }
  }

  componentDidMount() {
  }

  currentCommentCatcher(comment) {

  }

  reFetchFeed() {
    if (this.props.userAuth.authenticated) {
      this.props.fetchFeed(this.props.userAuth.userinfo);
    }
  }

  handleAddLike(values, callback) {
    return this.props.addLike(values, callback);
  }

  renderFeed() {
    if (this.props.userFeed && this.props.userAuth.authenticated) {
      return this.props.userFeed.map((item, i) => {
        let actorInfo = item;
        if (item.beer) {
          let userInfo = utils.stringChecker(this.props.userAuth.userinfo);
          let deleteButton = (<div></div>)
          if (item.actor === userInfo.username) {
            deleteButton = (<button onClick={((e) => {
              this.props.deleteUserBeer(item, userInfo, this.reFetchFeed);
            })}>delete </button>)
          }
          return (
            <div key={item.id + "D"}>
              <Feed.Event key={item.id + "event"}>
                <div ref={el => this.mapContainer = el}></div>
                <Feed.Label key={item.id + "label"}>
                  <img className="feedImage" src={s3.baseUrl + `${actorInfo.actorId}.jpg`} onError={(e) => { e.target.src = 'https://s3.amazonaws.com/beerappworld/uploads/joe.jpg' }} key={item.id + "avatar"} />
                </Feed.Label>
                <Feed.Content key={item.id + "content"}>
                  <Link to={{
                    pathname: `/profile/${item.actorId}`,
                    state: { currentUser: item.actor }
                  }}>{item.actor}
                  </Link>
                  <p key={item.id + "N"} >{item.beer.beername}</p>
                  <Image size="mini" key={item.id + "IMAGE"} src={item.beer.imageUrl} />
                  <p key={item.id + "RA"}>{item.review.rating}</p>
                  <p key={item.id + "RE"}>{item.review.review}</p>
                  {deleteButton}
                  <Feed.Meta>
                    <Like item={item} reFetchFeed={this.reFetchFeed} />
                    <MapComp position={item.review.position} />
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
              {item.comments.map((comment, i) => {
                let userInfo = utils.stringChecker(this.props.userAuth.userinfo);
                if (comment.streamData.actor === userInfo.username) {
                  return (
                    <div className='commentBox' key={i + "DIV"}>
                      <h6 key={uniqueid() + 'S'} style={{ fontWeight: "bold", fontSize: "18px" }}>{comment.streamData.actor}</h6>
                      <p key={uniqueid()}>{comment.streamData.comment}</p>
                      <button key={item.id + "BU"} onClick={((e) => {
                        this.props.deleteComment(comment.streamData, item, this.reFetchFeed);
                      })}>delete</button>
                      <button key={item.id + "B"} onClick={((e) => {
                        let updateComment = {};
                        updateComment.commentObj = comment;
                        updateComment.beerObj = item;
                        this.props.currentComment(updateComment);
                      })}>update</button>
                    </div>
                  )
                } else {
                  return (
                    <div className='commentBox' key={comment.streamData.id + "COMMENT"}>
                      <h6 style={{ fontWeight: "bold", fontSize: "18px" }} key={comment.streamData.id + comment.streamData.actor}>{comment.streamData.actor}</h6>
                      <p key={comment.streamData.id + comment.streamData.comment}>{comment.streamData.comment}</p>
                    </div>
                  )
                }
              })}
              <div key={item.time}  >
                <CommentForm item={item} key={item.id} currentCommentValue={this.state.currentCommentEdit} reFetchFeed={this.reFetchFeed} beerReview={item} currentBeerEdit={this.state.currentBeerEdit} />
              </div>
            </div>
          )
        }
      })
    }
    return (<div><Loader /></div>)
  }

  render() {
    const hope = [];
    return (
      <div>
        <p>Feed</p>
        <Feed>
          {this.renderFeed()}
        </Feed>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let userFeed = state.generalActions.userFeed;
  let initialCommentValue = null;
  let likeStatus;
  if (!state.userAuth.likeStatus) {
    likeStatus = null;
  } else {
    likeStatus = state.userAuth.likeStatus.likeStatus;
  }
  if (state.userAuth.currentEditComment) {
    initialCommentValue = state.userAuth.currentEditComment;
  }
  return {
    userAuth: state.userAuth,
    initialCommentValue,
    likeStatus,
    userFeed
  }
}

export default connect(mapStateToProps, {
  fetchFeed,
  createComment,
  deleteComment,
  updateComment,
  currentComment,
  deleteUserBeer,
  signup,
  signin,
  signout
})(UserFeed);