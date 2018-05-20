export const BY_RANK = 'by_rank';
export const BY_BEERNAME = 'by_beername';
export const BY_ABV = 'by_abv';
export const BY_TYPE = 'by_type';
export const BY_BREWERY = 'by_brewery';



export function sortByRank(beers) {
  return {
    type: BY_RANK
  }
}

export function sortByBeerName(beers) {
  return {
    type: BY_BEERNAME
  }
}

export function sortByAbv(beers) {
  return {
    type: BY_ABV
  }
}

export function sortByType(beers) {
  return {
    type: BY_TYPE
  }
}

export function sortByBrewery(beers) {
  return {
    type: BY_BREWERY
  }
}








