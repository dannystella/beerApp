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
    
  this._locateUser = this._locateUser.bind(this);
  this.renderMap = this.renderMap.bind(this);
}
  componentDidMount() {
    console.log(this.props.position, "check");
  }

  componentUnmount() {
  }

  _locateUser() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    // navigator.geolocation.getCurrentPosition(position => {
    //   console.log(position);
    //   this.setState({
    //     position: position.coords
    //   }, () => {console.log(this.state.position.latitude, "here")})
    // });
  }


  renderMap() {
    if(this.props.position.latitude) {
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