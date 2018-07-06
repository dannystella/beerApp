import React, {Component} from 'react';
import GridColumn, { Grid, Image } from 'semantic-ui-react';
import Article from './home/Article.jsx';
import { Link } from 'react-router-dom';
import UserFeed from './home/feed.jsx';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderArticle = this.renderArticle.bind(this);
  }


  componentDidMount() {
    console.log("mount", this.props.articles)
    if(!this.props.artices || !Array.isArray(this.props.articles)) {
        this.props.fetchArticles().then((data) => {
          // console.log("articles", this.props.articles)      
        })     
         
    }

  }

  renderArticle() {
    if(this.props.articles && this.props.articles.length > 0 && Array.isArray(this.props.articles)) {
      console.log("articles", this.props.articles);
      return (
        this.props.articles.map((article, i) => {
          return (
            <div>
              <Article article = {article} />
            </div>
          )
        })
      );
    }
  }

  render() {
    let articleOne;
    if(this.props.articles && Array.isArray(this.props.articles)) {
      // console.log(this.props.articles)
    return (
     <div>
     <Grid celled container>
     <UserFeed/>
       {/* <Grid.Row columns = {1}>
       <Grid.Column width={16}>
       <Link to = {`/Articles/${this.props.articles[0]._id}`}>
       <Image src = {this.props.articles[0].image.source} size = {this.props.articles[0].image.size}/>
       </Link>
       <h2>
      {this.props.articles[0].title}
      </h2>  
      <h5>
      {this.props.articles[0].caption}
      </h5>
      <p>
     {this.props.articles[0].content}
      </p>
       </Grid.Column>
       </Grid.Row>
       <Grid.Row columns = {2}>
       <Grid.Column width={8}>
       <Link to = {`/Articles/${this.props.articles[1]._id}`}>
       <Image src = {this.props.articles[1].image.source} size = {this.props.articles[1].image.size}/>
       </Link>
       <h2>
      {this.props.articles[1].title}
      </h2>  
      <h5>
      {this.props.articles[1].caption}
      </h5>
      <p>
     {this.props.articles[1].content}
      </p>
       </Grid.Column>
       <Grid.Column width={8}>
       <Link to = {`/Articles/${this.props.articles[2]._id}`}>
       <Image src = {this.props.articles[2].image.source} size = {this.props.articles[2].image.size}/>
       </Link>
       <h2>
      {this.props.articles[2].title}
      </h2>  
      <h5>
      {this.props.articles[2].caption}
      </h5>
      <p>
     {this.props.articles[2].content}
      </p>
       </Grid.Column>
       </Grid.Row>
       {this.props.articles.map((article, i) => {
         if(i === 0 || i === 1 || i === 2) {
           return (
             <div key= {i}>

               </div>
           )
         } else {
          return (
            <div key= {i}>
            
            <Article key={i} article = {article} />
            
            </div>
          );
         }

       })} */}
       </Grid>  
      </div>   

    )
  }
  else return (<div>Loading...</div>)
  }
}
