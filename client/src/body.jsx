import React, {Component} from 'react';
import $ from 'jquery';
import {Collection, CollectionItem, MediaBox} from 'react-materialize'



export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
     <div>
       <MediaBox className = "main" src="https://cdn.beeradvocate.com/assets/uploads/2018/01/131Reviews2-820x564.jpg" caption="A demo media box1" width="650"/>
      </div>   
    )
  }
}
