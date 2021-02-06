import React, { Component } from 'react';
import style from './Menu.css';
import Files from 'react-files';



export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      jsonFile: {},
      distances: [],
    };
  
    this.fileReader = new FileReader();
  
    this.fileReader.onload = (event) => {
  
      // or do whatever manipulation you want on JSON.parse(event.target.result) here.

      // debugger;

      // console.log(JSON.parse(event.target.result));
  
      this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
        console.log(this.state.jsonFile);
      });
      let distances = [];
      this.state.jsonFile.custom.activities.forEach(obj => {
        distances.push(obj.distance);
      });
      this.setState({
        distances
      });
    };
  
  }


  render() {
    return (

    <div className="files">
        <Files

        

        onChange={file => {
            // we choose readAsText() to load our file, and onload
            // event we rigister in this.fileReader would be triggered.
            this.fileReader.readAsText(file[0]);
        }}
        >
          Drop files here or click to upload
        </Files>
      

        <ul className={style.Menu}>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/products/product-1.html">Product</a></li>
          <li><a href="/contact.html">Results?</a></li>
          <li><a href="/app.html">App</a></li>
        </ul>
      </div>
    );
  }
}
