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

export default class Uploader extends Component {

    constructor() {
        super();
        this.state = {
          jsonFile: {},
          distances: [],
          categories: {},
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
          this.state.jsonFile.custom.activities.forEach(obj => {
            distances.push(obj.distance);
            if(cats[obj.transportMode] == null) {
              cats[obj.transportMode] = 1;
            } else {
              cats[obj.transportMode] += 1;
            }
          });
          this.setState({
            distances,
            categories: cats,
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
                Bus
            </Typography>
            <Typography variant="h2" color="textSecondary" component="p">
                {this.state.categories["BUS"] ? 
                <>
                <CountUp
                    end={this.state.categories["BUS"]}
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
        </div>
        );
      }

}