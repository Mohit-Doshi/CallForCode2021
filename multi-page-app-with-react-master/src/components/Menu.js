import React, { Component } from 'react';
import './Menu.css';

export default class Menu extends Component {

  render() {
    return (
      <div class="nav">
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/products/product-1.html">Product</a></li>
          <li><a href="/contact.html">Results?</a></li>
          <li><a href="/App.html">App</a></li>
          <li><a href="/rewards.html">Rewards</a></li>
        </ul>
      </div>
    );
  }
}
