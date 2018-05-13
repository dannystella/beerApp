import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchBeers } from '../actions';

class Beers extends React.Component {
constructor(props) {
    super(props);
    }
    componentDidMount() {
      this.props.fetchBeers();
    }

    renderBeer() {
      if(this.props.beers.length > 0){
          console.log(this.props.beers)
        return this.props.beers.map((beer, i) => 
            <Grid.Row container = 'true' key = {i} columns = {5}>
            <Grid.Column width={4}>
            <h5>{beer.beername}</h5>
            </Grid.Column>
            <Grid.Column width={2}>
            <h5>{beer.breweryname}</h5>
            </Grid.Column>
            <Grid.Column width={2}>
            <h5>{beer.type}</h5>
            </Grid.Column>
            <Grid.Column width={2}>
            <h5>{beer.abv}</h5>
            </Grid.Column>
            <Grid.Column width={1}>
            <h5>{beer.rank}</h5>
            </Grid.Column>
            </Grid.Row>
            )
        }
    }

    render() {
              console.log(this.props.beers);
        return (
            <div >   
                <Grid stackable celled container >
                <Grid.Row columns = {5}>
                <Grid.Column width={4}>
                <h5>Beer Name</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5>Brewery</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5>Type</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5>ABV</h5>
                </Grid.Column>
                <Grid.Column width={1}>
                <h5>Rank</h5>
                </Grid.Column>
                </Grid.Row>
                {this.renderBeer()}
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {beers: state.beers};
}

export default connect(mapStateToProps, { fetchBeers })(Beers);