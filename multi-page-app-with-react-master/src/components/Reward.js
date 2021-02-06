import React, {Component} from 'react';
import Coupon from '../components/Coupon';



export default class Reward extends Component {

  constructor() {
    super();
    this.state = {
      charts: [] 
    };
  }

  

  componentDidMount() {
    fetch('https://us-south.functions.appdomain.cloud/api/v1/web/mohit.dosi%40gmail.com_dev/default/FetchCharities')
    .then((response) => response.json())
    .then(booksList => {
        this.setState({ charts: booksList });
        console.log(this.state.charts);
    });
}


render() {


    let points = localStorage.getItem("ctcpoints");


    // perform GET request here



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