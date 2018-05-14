import React, {Component} from 'react';
import GridColumn, { Grid, Image } from 'semantic-ui-react';
import Article from './Article.jsx';
import articles from './seedData.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: articles
    }
    this.renderArticle = this.renderArticle.bind(this);
  }
renderArticle(article){
  return (
    <div>
    <Article article = {article} />
    </div>
  );
}

  render() {
    return (
     <div>
       <Grid celled container>
       <Grid.Row columns = {1}>
       <Grid.Column width={16}>
       <Image src = {this.state.articles[0].image.source} size = {this.state.articles[0].image.size}/>
       </Grid.Column>
       </Grid.Row>
       <Grid.Row columns = {2}>
       <Grid.Column width={8}>
       <Image src = {this.state.articles[1].image.source} size = {this.state.articles[1].image.size}/>
       <h2>
      {this.state.articles[1].title}
      </h2>  
      <h5>
      {this.state.articles[1].caption}
      </h5>
      <p>
     {this.state.articles[1].content}
      </p>
       </Grid.Column>
       <Grid.Column width={8}>
       <Image src = {this.state.articles[2].image.source} size = {this.state.articles[2].image.size}/>
       <h2>
      {this.state.articles[2].title}
      </h2>  
      <h5>
      {this.state.articles[2].caption}
      </h5>
      <p>
     {this.state.articles[2].content}
      </p>
       </Grid.Column>
       </Grid.Row>
       {this.state.articles.map((article, i) => {
         if(i === 0) {
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

       })}
       </Grid>
      </div>   
    )
  }
}
