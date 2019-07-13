import React, { PureComponent } from "react";
import Highcharts from "highcharts";
//import exporting from 'highcharts/modules/exporting';

//exporting(Highcharts)

export default class App extends PureComponent {
  instance;

  constructor(props){
    super(props);

    this.state = {

      is_data_retrieved : false

    };

  }

  componentDidMount() {
    this.getReportData();
  }

  getReportData(){

    let that = this;

    fetch('http://localhost:3001/get_report',{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(Response) {

      return Response.json();
      
		}).then(function(json) {

      var temperaturelist = [];

      //use for loop not forEach loop

      for(var i=0;i<json.length;i++){
        temperaturelist.push(parseInt(json[i]["temperature"]))
      }

      var options1 = {
      chart: {
          type: 'area'
      },
      boost: {
        useGPUTranslations: true
      },
      title: {
          text: 'Temperature variation graph'
      },
      xAxis: {
          type: 'datetime',
          title: {
          text: 'Number of minutes'
          },
          labels: {
              formatter: function () {
                  return this.value; // clean, unformatted number for year
              }
          }
      },
      yAxis: {
        title: {
            text: 'Temperature in degree celsius'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
      },
      /*tooltip: {
          pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
      },*/
      plotOptions: {
          area: {
              pointStart: 0,
              marker: {
                  enabled: false,
                  symbol: 'circle',
                  radius: 2,
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: [{
          name: 'USA',
          data: temperaturelist
      }]
      };

      that.instance = Highcharts.chart("dummy-id-1", options1);

      that.setState({
        is_data_retrieved : true
      });

    });

  }

  render() {

    if(is_data_retrieved){

      return (
        <div>
          <div id="dummy-id-1" />
        </div>
      );

    }
    else{

      return (
        <div>
          <p>loading</p>
        </div>
      );

    }

    
  }
}
