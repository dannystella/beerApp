import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// import { fetchBeers, deleteBeer, sortByRank } from '../actions';
import { Link } from 'react-router-dom';
import { isArray } from 'util';


class Beers extends React.Component {
constructor(props) {
    super(props);


    this.state = {
        beersTrigger: ''
    }
      this.onDeleteClick = this.onDeleteClick.bind(this);

    }

    
    componentDidMount() {
        console.log("on mount", !isArray(this.props.beers))
        if(!this.props.beers || !isArray(this.props.beers)) {
            this.props.fetchBeers();            
        }

    }

    onDeleteClick(id) {
      this.props.deleteBeer(id, () => {
          this.props.history.push('/Beers');
      });    
    }

  

    renderBeer() {
      if(this.props.beers && this.props.beers.length > 0 && isArray(this.props.beers)) {
        console.log("beers", this.props.beers);
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
            //   console.log(this.props.beers);
        return (
            <div >   
                <Grid stackable celled container >
                <Grid.Row columns = {5}>
                <Grid.Column width={4}>
                <h5 onClick = {((e)=> {
                this.props.sortByBeerName(this.props.beers);
            })}>Beer Name</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5 onClick = {((e)=> {
                this.props.sortByBrewery(this.props.beers);
            })}>Brewery</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5 onClick = {((e)=> {
                this.props.sortByType(this.props.beers);
            })}>Type</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5 onClick = {((e)=> {
                this.props.sortByAbv(this.props.beers);
            })}>ABV</h5>
                </Grid.Column>
                <Grid.Column width={1}>
                <h5 onClick = {((e)=> {
                    // console.log(this.props.sortByRank)
                this.props.sortByRank(this.props.beers);
            })}>Rank</h5>
                </Grid.Column>
                <Grid.Column width={1}>
                <h5>Delete Beer</h5>
                </Grid.Column>
                </Grid.Row>
                {this.renderBeer()}
                </Grid>
            </div>
        )
    }
}


export default Beers;