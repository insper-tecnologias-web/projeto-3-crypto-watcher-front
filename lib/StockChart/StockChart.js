import React, { Component } from "react";
import CanvasJSReact from '/lib/StockChart/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class App extends Component {
    render() {
      const options = {
        title: {
            text: this.props.title+"/USD",
            fontFamily: "'Open Sans', sans-serif",
            fontWeight:"bold"
        },
        theme: "dark1",
        animationEnabled: true,
        zoomEnabled: true,
        zoomType: "xy",
        charts: [{
            data: [{
              color: "#0044d0",
              type: "splineArea",
              dataPoints: this.props.dataPoints
           }]
        }],
        rangeSelector: {
          buttonStyle: {
            borderRadius:"3rem",
            backgroundColorOnHover:"#0044d0",
            borderColor:"#0044d0",
            backgroundColorOnSelect:"#0044d0"
          },
          inputFields: {
            style: {  
            backgroundColorOnHover:"#0044d0",
            borderColor:"#0044d0",
            backgroundColorOnSelect:"#0044d0",
            borderColorOnFocus:"#0044d0",
          }
          },
        },

        navigator: {
          slider: {
            fontColor:"#009186",
            minimum: new Date("2021-05-25"),
            maximum: new Date()
          }
        }
      };
      const containerProps = {
        width: "100%",
        height: "30rem",
        margin: 0,
        padding: 0
      };
      return (
        <div>
          <CanvasJSStockChart
            options={options}
            containerProps = {containerProps}
            onRef={ref => this.stockChart = ref}
          />
        </div>
      );
    }
  }

  export default App