import Beers from '../../../pages/beers.jsx';
import{ bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBeers, deleteBeer } from '../actions';
import { sortByRank, sortByBeerName, sortByAbv, sortByType, sortByBrewery } from '../actions/sortBeers';



const mapStateToProps = (state, props) => {
  return {beers: state.beers}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({
      fetchBeers,
      deleteBeer,
      sortByRank,
      sortByBeerName,
      sortByAbv,
      sortByType,
      sortByBrewery
  }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Beers);
