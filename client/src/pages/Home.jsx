import React, { Component } from 'react';
import GridColumn, { Grid, Image } from 'semantic-ui-react';
import Article from './home/Article.jsx';
import { Link } from 'react-router-dom';
import UserFeed from './home/feed.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchArticles, fetchArticle } from '../modules/articles/actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderArticle = this.renderArticle.bind(this);
  }

  componentDidMount() {
    if (!this.props.artices || !Array.isArray(this.props.articles)) {
      this.props.fetchArticles().then((data) => {

      })
    }
  }

  renderArticle() {
    if (this.props.articles && this.props.articles.length > 0 && Array.isArray(this.props.articles)) {
      return (
        this.props.articles.map((article, i) => {
          return (
            <div>
              <Article article={article} />
            </div>
          )
        })
      );
    }
  }

  render() {
    let articleOne;
    if (this.props.articles && Array.isArray(this.props.articles)) {
      return (
        <div>
          <Grid celled container>
            <UserFeed />
          </Grid>
        </div>
      )
    }
    else return (<div>Loading...</div>)
  }
}

const mapStateToProps = (state, props) => {
  return { articles: state.articles }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchArticles,
    fetchArticle
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
