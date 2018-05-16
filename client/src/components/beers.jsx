import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchBeers, deleteBeer } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
class Beers extends React.Component {
constructor(props) {
    super(props);


    this.state = {
        beers: ''
    }
      this.onDeleteClick = this.onDeleteClick.bind(this);
      this.sortByRank = this.sortByRank.bind(this);
      this.sortByAbv = this.sortByAbv.bind(this);
      this.sortByType = this.sortByType.bind(this);
      this.sortByBrewery = this.sortByBrewery.bind(this);
      this.sortByBeerName = this.sortByBeerName.bind(this);

    }

    
    componentDidMount() {
      this.props.fetchBeers().then(() => {
        let newBeers = this.props.beers.slice();
        this.setState({
          beers: newBeers
        }, console.log(this.state.beers)) ;
      })

    }

    onDeleteClick(id) {
      this.props.deleteBeer(id, () => {
          this.props.history.push('/Beers');
      });    
    }

    sortByRank() {
        let newBeers = this.state.beers.slice();
        newBeers = newBeers.sort(function(a, b) {
            return a.rank - b.rank
        })
        this.setState({
            beers: newBeers
        }, () => {console.log("here", this.state.beers)});
    }

    sortByBeerName() {
        let newBeers = this.state.beers.slice();
        newBeers = newBeers.sort(function(a, b) {
            if(a.beername > b.beername) return 1;
            if(a.beername < b.beername) return -1;
            return 0;
        })
        this.setState({
            beers: newBeers
        }, () => {console.log("here", this.state.beers)});
    }

    sortByAbv() {
        let newBeers = this.state.beers.slice();
        newBeers = newBeers.sort(function(a, b) {
            return a.abv - b.abv
        })
        this.setState({
            beers: newBeers
        }, () => {console.log("here", this.state.beers)});
    }

    sortByType() {
        let newBeers = this.state.beers.slice();
        newBeers = _.groupBy(newBeers, 'type');
        var ordered = {};
        Object.keys(newBeers).sort().forEach(function(key) {
            ordered[key] = newBeers[key];
        });
        let byType = [];
        for(var item in ordered) {
            byType.push(newBeers[item]);
        }
        console.log("here", byType);
        byType = _.flattenDeep(byType);
        this.setState({
            beers: byType
        }, () => {console.log("here", this.state.beers)});
    }

    sortByBrewery() {
        let newBeers = this.state.beers.slice();
        newBeers = _.groupBy(newBeers, 'breweryname');
        var ordered = {};
        Object.keys(newBeers).sort().forEach(function(key) {
            ordered[key] = newBeers[key];
        });
        let byBrewery = [];
        for(var item in ordered) {
            byBrewery.push(newBeers[item]);
        }
        console.log("here", byBrewery);
        byBrewery = _.flattenDeep(byBrewery);
        this.setState({
            beers: byBrewery
        }, () => {console.log("here", this.state.beers)});
    }


    renderBeer() {
      let sortedBeers;
      if(this.state.beers) {
          
      }  
      if(this.props.beers.length > 0) {
        let sortedBeers;
        if(this.state.beers) {
            sortedBeers = this.state.beers;
        }   else sortedBeers = this.props.beers;
        return sortedBeers.map((beer, i) => 
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
                <h5 onClick = {((e)=> {
                this.sortByBeerName();
            })}>Beer Name</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5 onClick = {((e)=> {
                this.sortByBrewery();
            })}>Brewery</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5 onClick = {((e)=> {
                this.sortByType();
            })}>Type</h5>
                </Grid.Column>
                <Grid.Column width={2}>
                <h5 onClick = {((e)=> {
                this.sortByAbv();
            })}>ABV</h5>
                </Grid.Column>
                <Grid.Column width={1}>
                <h5 onClick = {((e)=> {
                this.sortByRank();
            })}>Rank</h5>
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