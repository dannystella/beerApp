import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchBeers, deleteBeer } from '../actions';
import { Link } from 'react-router-dom';
class Beers extends React.Component {
constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    }
    componentDidMount() {
      this.props.fetchBeers();
    }

    onDeleteClick(id) {
      this.props.deleteBeer(id, () => {
          this.props.history.push('/Beers');
      });    
    }

    renderBeer() {
      if(this.props.beers.length > 0){
          console.log(this.props.beers)
        return this.props.beers.map((beer, i) => 
            <Grid.Row container = 'true' key = {i} columns = {5}>
            <Grid.Column width={4}>

            <h5><Link to = {`/Beers/${beer._id}`}>{beer.beername}</Link></h5>
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
            <Grid.Column width={1}>
           <button
            className = "btn btn-danger"
            onClick={ ((e) => {
                this.onDeleteClick(beer._id);
            })}
           >
           Delete Beer
           </button>
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

export default connect(mapStateToProps, { fetchBeers, deleteBeer })(Beers);