import React, { Component } from 'react';
import Files from 'react-files';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CountUp from 'react-countup';
import style from './Menu.css';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DirectionsWalkRoundedIcon from '@material-ui/icons/DirectionsWalkRounded';
import DirectionsBikeRoundedIcon from '@material-ui/icons/DirectionsBikeRounded';
import DirectionsBusRoundedIcon from '@material-ui/icons/DirectionsBusRounded';
import EmojiTransportationRoundedIcon from '@material-ui/icons/EmojiTransportationRounded';
import Badge from '@material-ui/core/Badge';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';

import Menu from '../components/Menu';
import { Button } from '@material-ui/core';


function calculateFootprint(arr)  {    // 0 - walking, 1 - biking, 2 - transit, 3 - vehicle 

    var fprint = 0;

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(i == 0) {
                continue;
            }
            if(i == 1) {
                continue;
            }
            if(i == 2) {
                fprint += (arr[i][j] * 104);
            }
            if(i == 3) {

                fprint += (arr[i][j] * 208);
                
            }

        }
    }

    return fprint;
}

function generatePieData(dist, dur) {
    const pieData = [];
    var fprint = new Array(4).fill(0);
    for(let i = 0; i < dist.length; i++) {
        for(let j = 0; j < dist[i].length; j++) {
            if(i == 0 || i == 1) {
                // 1 kg CO2 emitted by breathing. Scaled it per minute
                fprint[i] += dur[i][j] * 1000 / 1440;
            }
            if(i == 2) {
                fprint[i] += (dist[i][j] * 104);
            }
            if(i == 3) {
                fprint[i] += (dist[i][j] * 208);
            }
        }
    }
    for(var i = 0; i < fprint.length; i++) {
        if(i == 0) {
            pieData.push({
                category: "Walk",
                footprint: fprint[i],
            });
        }
        if(i == 1) {
            pieData.push({
                category: "Bike",
                footprint: fprint[i],
            });
        }
        if(i == 2) {
            pieData.push({
                category: "Transit",
                footprint: fprint[i],
            });
        }
        if(i == 3) {
            pieData.push({
                category: "Vehicle",
                footprint: fprint[i],
            });
        }
    }
    // debugger;
    return pieData;
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

    localStorage.setItem("ctcpoints", fpoint);

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
        //   debugger;
          this.setState({
            catdistances,
            distances,
            categories: cats,
            catdurations
          });
          console.log(this.state.categories["WALK"]);
        };
      
      }

    //   handleFileChange = (file) => {
    //       debugger;
    //       this.fileReader.readAsText(file[0]);
    //   }

    
      render() {
        return (
    
            <div className="files">
                
                <Menu />
                <Grid container className={style.file} justify="center" alignItems="center">
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
                            // this.handleFileChange(file);
                            }}
                        >
                        Drop files here or click to upload
                        </Files>
                    </Button>
                </Grid>

                <Grid container spacing={4}>
                    <Grid item xs className={style.icons}>
                        <Badge
                            badgeContent={
                                this.state.categories["WALK"] ? 
                                <>
                                <CountUp
                                    end={this.state.categories["WALK"]}
                                    duration={2}
                                />
                                </> : null
                            }
                            color="primary"
                            showZero
                        >
                            <DirectionsWalkRoundedIcon style={{fontSize: '150px'}} />
                        </Badge>
                    </Grid>
                    <Grid item xs className={style.icons}>
                        <Badge
                            badgeContent={
                                this.state.categories["BIKE"] ? 
                                <>
                                <CountUp
                                    end={this.state.categories["BIKE"]}
                                    duration={2}
                                />
                                </> : null
                            }
                            color="primary"
                        >
                            <DirectionsBikeRoundedIcon style={{fontSize: '150px'}} />
                        </Badge>
                    </Grid>
                    <Grid item xs className={style.icons}>
                        <Badge
                            badgeContent={
                                this.state.categories["TRANSIT"] ? 
                                <>
                                <CountUp
                                    end={this.state.categories["TRANSIT"]}
                                    duration={2}
                                />
                                </> : null
                            }
                            color="primary"
                        >
                            <DirectionsBusRoundedIcon style={{fontSize: '150px'}} />
                        </Badge>
                    </Grid>
                    <Grid item xs className={style.icons}>
                        <Badge
                            badgeContent={
                                this.state.categories["VEHICLE"] ? 
                                <>
                                <CountUp
                                    end={this.state.categories["VEHICLE"]}
                                    duration={2}
                                />
                                </> : null
                            }
                            color="primary"
                        >
                            <EmojiTransportationRoundedIcon style={{fontSize: '150px'}} />
                        </Badge>
                    </Grid>
                </Grid>
                <h1>The footprint score is {calculateFootprint(this.state.catdistances)}</h1>
        <h2>The POINTS score is {calculatePoints(this.state.catdurations)}</h2>
                <Grid container justify="center" alignItems="flex-start">
                    <Paper>
                        <Chart
                            data={generatePieData(this.state.catdistances, this.state.catdurations)}
                            width={500}
                        >
                            <Title
                                text="CO2 Emission per Category"
                            />
                            <Legend/>
                            <PieSeries
                                valueField="footprint"
                                argumentField="category"
                                // outerRadius={0.6}
                            />
                        </Chart>
                    </Paper>
                </Grid>

        
        </div>
        );
      }

}