import React from 'react';

import mapBox from '../mapConfig';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
 

const Map = ReactMapboxGl({
  accessToken: mapBox.key
});

class MapComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {}
    }
    
  this.renderMap = this.renderMap.bind(this);
}
  componentDidMount() {
    // console.log(this.props.position, "check");
  }

  componentUnmount() {
  }

  renderMap() {
    if(this.props.position && this.props.position.latitude) {
      return (
        <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center = {[this.props.position.longitude, this.props.position.latitude]}
          containerStyle={{
            height: "50vh",
            width: "50vw"
          }}
          >
        </Map>
        </div>
        )
    } else return (<div></div>)
  }

  render() {
    return (
    <div>
      {this.renderMap()}
    </div>
    )
  }
}

export default MapComp;