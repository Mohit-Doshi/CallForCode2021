import React, { Component } from 'react';

import style from './Coupon.css';


export default class Coupon extends Component {

    constructor(props) {

        super(props);

        this.state = {

        }

    }

    render () {

        return (
            
        <div>
            <div className={style.container2}>
                <div>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Whole_Foods_Market_201x_logo.svg/1200px-Whole_Foods_Market_201x_logo.svg.png' className={style.iconDetails}></img>
                </div>	
	            <div style={{"margin-left":"60px"}}>
	                <h4>Whole Foods</h4>
	                <div style={{"font-size":"0.8em","float":"left"}}><p>Whole Foods $5 Store Credit for 100 points!</p></div>
	            </div>
            </div>

            <br />
            <br />

            <div className={style.container2}>
                <div>
                    <img src='http://ecx.images-amazon.com/images/I/21-leKb-zsL._SL500_AA300_.png' className={style.iconDetails}></img>
                </div>	
	            <div style={{"margin-left":"60px"}}>
	                <h4>Facebook</h4>
	                <div style={{"font-size":"0.8em","float":"left"}}><p>Redeem Facebook ads credit for 10 points!</p></div>
	            </div>
            </div>

            <br />
            <br />

            <div className={style.container2}>
            <div>
                <img src='https://i.pinimg.com/originals/7b/6a/88/7b6a88b47b37bfa833fd5036fb5897de.jpg' className={style.iconDetails}></img>
            </div>	
            <div style={{"margin-left":"60px"}}>
                <h4>Patagonia</h4>
                <div style={{"font-size":"0.8em","float":"left"}}><p>Redeem Patagonia $25 Shopping Credit for 500 points! </p></div>
            </div>
            </div>

            <br />
            <br />

            <div className={style.container2}>
            <div>
                <img src='https://i.pinimg.com/originals/7b/6a/88/7b6a88b47b37bfa833fd5036fb5897de.jpg' className={style.iconDetails}></img>
            </div>	
            <div style={{"margin-left":"60px"}}>
                <h4>Patagonia</h4>
                <div style={{"font-size":"0.8em","float":"left"}}><p>Redeem Patagonia $50 Shopping Credit for 750 points! </p></div>
            </div>
            </div>            

        </div>




        );


    }




}