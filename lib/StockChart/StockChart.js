import React, { Component } from "react";
import CanvasJSReact from '/lib/StockChart/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class App extends Component {
    render() {
      const options = {
        title: {
            text: this.props.title+"/USD",
            fontFamily: "arial"
        },
        theme: "dark1",
        animationEnabled: true,
        charts: [{
            data: [{
              color: "#0044d0",
              type: "splineArea",
              dataPoints: this.props.dataPoints
           }]
        }],
        rangeSelector: {
          buttonStyle: {
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
        width: "80%",
        height: "450px",
        margin: "auto"
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