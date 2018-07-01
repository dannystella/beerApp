import CommentForm from '../../../components/commentForm.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signin, signup, signout, createComment, deleteComment, updateComment } from '../actions';
import BeerDetail from '../../../pages/beers/BeerDetail.jsx';

const mapStateToProps = (state, props) => {
  // console.log(props, "user props");
  if(typeof state.userAuth.userinfo === 'string') {
    state.userAuth.userinfo = JSON.parse(state.userAuth.userinfo);
  }
  return {userinfo: state.userAuth.userinfo, id: props.id, trigger: props.trigger, reFetch: props.reFetch, updateCommentForm: props.updateCommentForm, makeCommentNull: props.makeCommentNull}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({
    signin,
    signout,
    signup, 
    createComment,
    deleteComment,
    updateComment
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
// export default connect(mapStateToProps, mapDispatchToProps)(BeerDetail);
