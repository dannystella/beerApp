import axios from 'axios';

export const FETCH_BEERS = 'fetch_beers';
export const CREATE_BEERS = 'create_beer';
export const FETCH_BEER = 'fetch_beer';
export const DELETE_BEER = 'delete_beer';

export function fetchBeers() {
  const request = axios.get('/beers')

  return {
    type: FETCH_BEERS,
    payload: request
  }
}

export function createBeer(values, callback) {
  const request = axios.post('/beers/addbeers', values).then((res) => {
    if (callback) {
      callback();
    }
  });

  return {
    type: CREATE_BEERS,
    payload: request
  }
}

export function fetchBeer(id) {
  const request = axios.get(`/beers/${id}`)
  // .then((res) => {
  //   return res;
  // });
  return {
    type: FETCH_BEER,
    payload: request
  }
}

export function deleteBeer(id, callback) {
  const request = axios.delete(`/beers/${id}`)
    .then(() => {
      callback();
    })
  return {
    type: DELETE_BEER,
    payload: id
  }
}

