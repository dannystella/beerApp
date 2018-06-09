import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from '../../modules/articles/actions';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

class ArticleDetail extends React.Component{
  constructor(props){
    super(props);


}

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.fetchArticle(id).then((data) => {
      console.log(data.payload.data[0]);
    })
  }

  render() {
    const { article } = this.props;
    if(!article) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to = "/" className ="btn btn-primary">Back to Home</Link>
        <h3>{article.title}</h3>
        <Image src={article.image.source} fluid />
        <p>{article.content}</p>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    article: state.articles[ownProps.match.params.id]
  }
}


export default connect(mapStateToProps, { fetchArticle })(ArticleDetail);