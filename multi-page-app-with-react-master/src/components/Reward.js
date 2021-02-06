import React, {Component} from 'react';
import Coupon from '../components/Coupon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import style from './Menu.js'


const tableColumns = [
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'Link', label: 'Link', minWidth: 200 }
];

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
      
      <div style={{"width":"100%"}}>
          <p>The points are {points} </p>

        <div id="cpns" style={{"float":"left","width":"50%"}}>
            <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Available Coupons</h2>
            <Coupon />
        </div>
        <div id="charities" style={{"float":"left","width":"50%", "text-align":"center"}}>
          <h2>&nbsp;&nbsp;&nbsp;Nearby Charities You can donate to</h2>
          <TableContainer className={style.container}>
              <Table stickyHeader aria-label="sticky table">
              <TableHead>
                  <TableRow>
                  {tableColumns.map((column) => (
                      <TableCell
                          key={column.id}
                          align='center'
                          style={{ minWidth: column.minWidth }}
                      >
                      {column.label}
                      </TableCell>
                  ))}
                  </TableRow>
              </TableHead>
              {/* data is the table data. See https://material-ui.com/components/tables/ */}
              <TableBody>
                  {this.state.charts.map((row) => {
                  return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.Name}>
                      {tableColumns.map((column) => {
                          const value = row[column.id];
                          return (
                          <TableCell key={column.id} align={'center'}>
                              {value}
                          </TableCell>
                          );
                      })}
                      </TableRow>
                  );
                  })}
              </TableBody>
              </Table>
          </TableContainer>
        </div>

        </div>
    )
  }

}