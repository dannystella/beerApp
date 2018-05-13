import React from 'react';
import { connect } from 'react-redux';
import { fetchBeer } from '../actions';


class BeerDetail extends React.Component{
  constructor(props){
    super(props);


}

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.fetchBeer(id);
  }

  render() {
    const { beer } = this.props;
    if(!beer) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>{beer.beername}</h3>
        <h3>{beer.breweryname}</h3>
        <h3>{beer.type}</h3>
        <h3>{beer.abv}</h3>
        <h3>{beer.rank}</h3>
        <h3>{beer.description}</h3>
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