import React, {Component} from 'react';
import Coupon from '../components/Coupon';



export default class Reward extends Component {


render() {


    let points = localStorage.getItem("ctcpoints");

    return (
      // render logic here
      
      <div>
          <p>The points are {points} </p>

        <div id="cpns">
            <h2>&nbsp;&nbsp;&nbsp;Available Coupons</h2>
            <Coupon />
        </div>
        <div id="charities">

        </div>

        </div>
    )
  }

}