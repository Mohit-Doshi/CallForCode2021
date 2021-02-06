import React, { Component } from 'react';
import Files from 'react-files';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';
import style from './Menu.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Menu from '../components/Menu';
import { Button } from '@material-ui/core';


function calculateFootprint(arr)  {    // 0 - walking, 1 - biking, 2 - transit, 3 - vehicle 

    var fprint = 0;

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(i == 0) {
                continue
            }
            if(i == 1) {
                continue
            }
            if(i == 2) {
                fprint += (arr[i][j] * 104)
            }
            if(i == 3) {

                fprint += (arr[i][j] * 208)
                
            }

        }
    }

    return fprint;

}



  function calculatePoints(arr) {

    let fpoint = 0

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(i == 0) {
                fpoint += (arr[i][j]/10)
            }
            if(i == 1) {
                fpoint += (arr[i][j]/10)
            }
            if(i == 2) {
                fpoint += 1
            }

        }
    }

    return fpoint;

  }

export default class Uploader extends Component {

    constructor() {
        super();
        this.state = {
          jsonFile: {},
          distances: [],
          categories: {},
          catdistances: new Array(), 
          catdurations: new Array(),
        };
      
        this.fileReader = new FileReader();
      
        this.fileReader.onload = (event) => {
      
          // or do whatever manipulation you want on JSON.parse(event.target.result) here.
    
          // debugger;
    
          // console.log(JSON.parse(event.target.result));
      
          this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
            console.log(this.state.jsonFile);
          });
          let distances = [], cats = {};
          var catdistances = new Array(4);
          var catdurations = new Array(4);

        for (var i = 0; i < catdistances.length; i++) {
            catdistances[i] = new Array()
            catdurations[i] = new Array()
        }


          this.state.jsonFile.custom.activities.forEach(obj => {
            distances.push(obj.distance);

            if(obj.transportMode == "WALK") {
                catdistances[0].push(obj.distance);
                catdurations[0].push(obj.destinationDuration);
            }
            if(obj.transportMode == "BIKE") {
                catdistances[1].push(obj.distance);
                catdurations[1].push(obj.destinationDuration);
            }
            if(obj.transportMode == "TRANSIT") {
                catdistances[2].push(obj.distance);
                catdurations[2].push(obj.destinationDuration);
            }
            if(obj.transportMode == "VEHICLE") {
                catdistances[3].push(obj.distance);
                catdurations[3].push(obj.destinationDuration);
            }

            if(cats[obj.transportMode] == null) {
              cats[obj.transportMode] = 1;
            } else {
              cats[obj.transportMode] += 1;
            }
          });
          this.setState({
            catdistances,
            distances,
            categories: cats,
            catdurations
          });
          console.log(this.state.categories["WALK"]);
        };
      
      }

    
      render() {
        return (
    
            <div className="files">
                
                <Menu />
                <Button
                    variant="contained"
                    color="default"
                    className={style.button}
                    startIcon={<CloudUploadIcon />}
                >
                    <Files
                        onChange={file => {
                        // we choose readAsText() to load our file, and onload
                        // event we rigister in this.fileReader would be triggered.
                        this.fileReader.readAsText(file[0]);
                        }}
                    >
                    Drop files here or click to upload
                    </Files>
                </Button>
                
                <Card style={{
            maxWidth: 200,
            height: 140,
            textAlign: 'center'
        }}>
            <CardContent>
            <Typography variant="h3" component="h3">
                Walk
            </Typography>
            <Typography variant="h2" color="textSecondary" component="p">
                {this.state.categories["WALK"] ? 
                <>
                <CountUp
                    end={this.state.categories["WALK"]}
                    duration={2}
                />
                </> : null}
            </Typography>
            </CardContent>
        </Card>
        <Card style={{
            maxWidth: 200,
            height: 140,
            textAlign: 'center'
        }}>
            <CardContent>
            <Typography variant="h3" component="h3">
                TRANSIT
            </Typography>
            <Typography variant="h2" color="textSecondary" component="p">
                {this.state.categories["TRANSIT"] ? 
                <>
                <CountUp
                    end={this.state.categories["TRANSIT"]}
                    duration={2}
                />
                </> : null}
            </Typography>
            </CardContent>
        </Card>
        <Card style={{
            maxWidth: 200,
            height: 140,
            textAlign: 'center'
        }}>
            <CardContent>
            <Typography variant="h3" component="h3">
                BIKE
            </Typography>
            <Typography variant="h2" color="textSecondary" component="p">
                {this.state.categories["BIKE"] ? 
                <>
                <CountUp
                    end={this.state.categories["BIKE"]}
                    duration={2}
                />
                </> : null}
            </Typography>
            </CardContent>
        </Card>
        <Card style={{
            maxWidth: 200,
            height: 140,
            textAlign: 'center'
        }}>
            <CardContent>
            <Typography variant="h3" component="h3">
                Vehicle
            </Typography>
            <Typography variant="h2" color="textSecondary" component="p">
                {this.state.categories["VEHICLE"] ? 
                <>
                <CountUp
                    end={this.state.categories["VEHICLE"]}
                    duration={2}
                />
                </> : null}
            </Typography>
            </CardContent>
        </Card>
        <p>The footprint score is {calculateFootprint(this.state.catdistances)}</p>
        <p>The POINTS score is {calculatePoints(this.state.catdurations)}</p>
        </div>
        );
      }

}