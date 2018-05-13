import _ from 'lodash';
import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines"


export default class Trends extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  render(){
    return (
      <div className = "chart">
<Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
          <SparklinesLine color = "blue"/>
          <SparklinesReferenceLine type = "mean"/>
        </Sparklines>
      </div>
    )
  }
}