import React from 'react';
import { connect } from 'react-redux';
import { fetchBeer } from '../../modules/beers/actions';
import { deleteComment } from '../../modules/users/actions';
import { Link } from 'react-router-dom';
import { Image, Grid} from 'semantic-ui-react';
import Loader from '../../components/loader.jsx';
import Comment from '../../components/comment.jsx';
import UsersContainer from '../../modules/users/state/UsersContainer.js';
import UserBeerForm from '../../components/checkUserBeerForm.jsx';

class BeerDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      trigger: 'beer',
      render: false,
      comment: undefined
    }

  this.renderComments = this.renderComments.bind(this);
  this.reFetch = this.reFetch.bind(this);
  this.updateCommentForm = this.updateCommentForm.bind(this);
  this.makeCommentNull = this.makeCommentNull.bind(this);
  this.navigateAway = this.navigateAway.bind(this);
}

  updateCommentForm(comment) {
    this.setState({
      render: true,
      comment: comment
    })
  }

   
  navigateAway() {
    this.props.history.push('/');
  }
 
  makeCommentNull() {
    this.setState({
      comment: undefined
    })
  }


  componentDidMount() {
    const { id } = this.props.match.params;
      this.props.fetchBeer(id).then(() => {
    })
  }

  reFetch() {
    const { id } = this.props.match.params;
    this.props.fetchBeer(id).then(() => {
      console.log("refetched")
    })
  }

  renderComments() {

  }

  render() {
    const { beer } = this.props;
    if(!beer) {
      return <div><Loader/></div>
    }
    return (
      <div>
        <Link to = "/Beers" className ="btn btn-primary">Back to Beers</Link>
        <h3>{beer.beername}</h3>
        <h3>{beer.breweryname}</h3>
        <h3>{beer.type}</h3>
        <h3>{beer.abv}</h3>
        <h3>{beer.rank}</h3>
        <h3>{beer.description}</h3>
        <Image src={beer.imageUrl} fluid />
        <Grid>
        <Grid.Row>
        <div className = "commentForm" >

        </div>
        <div className = "commentFeed" >
        </div>
        </Grid.Row>
        </Grid>
        {this.props.userAuth ? <UserBeerForm userInfo = {this.props.userInfo} id = {this.props.match.params.id} trigger = {this.state.trigger} reFetch = {this.reFetch} updateCommentForm = {this.updateCommentForm} comment = {this.state.comment} makeCommentNull = {this.makeCommentNull} />
           : <div></div> 
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log("map state", state);
  return {
    beer: state.beers[ownProps.match.params.id],
    beerDetail: state.beers[ownProps.match.params.id],
    userInfo: state.userAuth.userinfo,
    userAuth: state.userAuth.authenticated
  }
}


export default connect(mapStateToProps, { fetchBeer, deleteComment })(BeerDetail);