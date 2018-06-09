import Main from '../../../pages/home.jsx';
import{ bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchArticles, fetchArticle} from '../actions';

const mapStateToProps = (state, props) => {
  return {articles: state.articles}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({
      fetchArticles,
      fetchArticle
  }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Main);
