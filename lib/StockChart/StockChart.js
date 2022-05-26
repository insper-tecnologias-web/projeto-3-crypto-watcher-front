import React, { Component } from "react";
import CanvasJSReact from '/lib/StockChart/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class App extends Component {
    render() {
      const options = {
        title: {
            text: this.props.titulo,
            fontFamily: "arial"
        },
        animationEnabled: true,
        charts: [{
            data: [{
              type: "line",
              dataPoints: this.props.dataPoints
           }]
        }],
        navigator: {
          slider: {
            minimum: new Date("2018-07-01"),
            maximum: new Date("2019-06-30")
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