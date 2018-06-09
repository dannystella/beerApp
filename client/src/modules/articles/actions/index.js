import axios from 'axios';

export const FETCH_ARTICLES = 'fetch_articles';
export const FETCH_ARTICLE = 'fetch_article';

export function fetchArticles() {
  const request = axios.get('/articles');
  return {
    type: FETCH_ARTICLES,
    payload: request
  }
}

export function fetchArticle(id) {
  const request = axios.get(`/articles/${id}`)

  return {
    type: FETCH_ARTICLE,
    payload: request
  }  
}