import React, { Component } from 'react';

import style from './Coupon.css';


export default class Coupon extends Component {

    render () {

        return (
            

            <div className={style.container2}>
                <div>
                    <img src='http://ecx.images-amazon.com/images/I/21-leKb-zsL._SL500_AA300_.png' className={style.iconDetails}></img>
                </div>	
	            <div style='margin-left:60px;'>
	                <h4>Facebook</h4>
	                <div style="font-size:.6em;float:left;">fine location, GPS, coarse location</div>
	                <div style="float:right;font-size:.6em">0 mins ago</div>
	            </div>
            </div>

        );


    }




}