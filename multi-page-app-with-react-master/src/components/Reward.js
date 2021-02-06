import React, {Component} from 'react';



export default class Reward extends Component {


render() {


    let points = localStorage.getItem("ctcpoints");

    return (
      // render logic here
      
      <div>
          <p>The points are {points} </p>
      </div>
    )
  }

}