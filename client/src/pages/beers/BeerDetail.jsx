import React from 'react';
import { connect } from 'react-redux';
import { fetchBeer } from '../../modules/beers/actions';
import { Link } from 'react-router-dom';
import { Image, Grid} from 'semantic-ui-react';
import Loader from '../../components/loader.jsx';
import Comment from '../../components/comment.jsx';
import UsersContainer from '../../modules/users/state/UsersContainer.js';


class BeerDetail extends React.Component{
  constructor(props){
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
}


  updateCommentForm(comment) {
    this.setState({
      render: true,
      comment: comment
    })
  }

  makeCommentNull() {
    this.setState({
      comment: undefined
    })
  }


  componentDidMount() {
    const { id } = this.props.match.params;
    // console.log(this.props.userAuth, "here")
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
    let beerId = this.props.match.params
    if(this.props.beer.comments && this.props.beer.comments.length > 0) {
      return (
        this.props.beer.comments.map((comment, i ) => {
          return (
            <div key = {comment.text}>
              <Comment key = {i} comment = {comment} beerId = {beerId} reFetch = {this.reFetch}  />
              <button onClick = {((e) => {
                this.updateCommentForm(comment);
              })}>Edit</button>
            </div>  
          )
        })
      )
    }
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
        {this.renderComments()}
        </div>
        </Grid.Row>
        </Grid>
        {this.props.userAuth ? <UsersContainer id = {this.props.match.params.id} trigger = {this.state.trigger} reFetch = {this.reFetch} updateCommentForm = {this.updateCommentForm} comment = {this.state.comment} makeCommentNull = {this.makeCommentNull} />
           : <div></div> 
        }

      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  // console.log(state)
  return {
    beer: state.beers[ownProps.match.params.id],
    // comments: state.beers[ownProps.match.params.id].comments,
    userAuth: state.userAuth.authenticated
  }
}


export default connect(mapStateToProps, { fetchBeer })(BeerDetail);