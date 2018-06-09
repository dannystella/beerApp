import React from 'react';
import { connect } from 'react-redux';
import { fetchBeer } from '../../modules/beers/actions';
import { Link } from 'react-router-dom';
import { Image, Grid} from 'semantic-ui-react';
import Comment from '../../components/comment.jsx';

class BeerDetail extends React.Component{
  constructor(props){
    super(props);

this.renderComments = this.renderComments.bind(this);
}

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.fetchBeer(id).then(() => {
      console.log(this.props.beer.comments);
    })

  }

  renderComments() {
    if(this.props.beer.comments && this.props.beer.comments.length > 0) {
      return (
        this.props.beer.comments.map((comment, i ) => {
          return (
            <div key = {comment.text}>
              <Comment key = {i} comment = {comment} />
            </div>  
          )
        })
      )
    }
  }


  render() {
    const { beer } = this.props;
    if(!beer) {
      return <div>Loading...</div>
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
        <div className = "commentFeed" >
        {this.renderComments()}
        </div>
        </Grid.Row>
        </Grid>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    beer: state.beers[ownProps.match.params.id]
  }
}


export default connect(mapStateToProps, { fetchBeer })(BeerDetail);