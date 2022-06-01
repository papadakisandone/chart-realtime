import { coTwoActions } from "../../store/redux";
import { useSelector, useDispatch } from "react-redux";

import React, { useEffect, useState } from "react";
import "chart.js/auto";

import plugins from "../Settings/plugins";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartStreaming from "chartjs-plugin-streaming";
import "chartjs-adapter-luxon";
import Zoom from "chartjs-plugin-zoom";

Chart.register(Zoom); // REGISTER PLUGIN
Chart.register(ChartStreaming);

const ChartLiveDataReduxV3 = () => {
  // this give us back dispatch functions to execute
  const dispatch = useDispatch();
  const coTwoData = useSelector((state) => state.coTwoData);

  const [lengthArray, setLengthArray] = useState(0);

  const data = {
    // labels: now, // x axis
    datasets: [
      {
        label: "400-1000 ppm",
        data: [],
        fill: false,
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        showLine: false,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
      {
        label: "1001-2000 ppm",
        data: [],
        fill: false,
        backgroundColor: "rgba(255, 255, 0, 0.5)",
        showLine: false,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
      {
        label: "2001 + ppm",
        data: [],
        fill: false,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        showLine: false,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  }; //data

  // call the action to genarate RNG number 400-3500
  useEffect(() => {
    dispatch(coTwoActions.generateRngNum());
  }, [dispatch, lengthArray]); // when the length of the coTwoData change, run it again

  // const now = Date.now();
  const coData = coTwoData.map(value => value.coTwoValue);
  const timeOfValue = coTwoData.map(value => value.fullDateTime);

  // get the last value of the array
  const lastTime = timeOfValue[timeOfValue.length - 1];
  const lastValue = coData[coData.length - 1]; 


  const onRefresh = () => {

    setLengthArray(coTwoData.length); // to triger the useEffect


      if (lastValue <= 1000) {
        //console.log(num);
        data.datasets[0].data.push({ x: lastTime, y: lastValue });
        // console.log(data.datasets[0].data);
      }
  
      if (lastValue > 1000 && lastValue <= 2000) {
        //console.log(num);
        data.datasets[1].data.push({ x: lastTime, y: lastValue });
        // console.log(data.datasets[1].data);
      }
  
      if (lastValue > 2000) {
        //console.log(num);
        data.datasets[2].data.push({ x: lastTime, y: lastValue });
        // console.log(data.datasets[2].data);
      }
  
 
    
    
  }; // onRefresh

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Real-Time",
        },
        type: "realtime",
        realtime: {
          duration: 60000, // range of graph to see
          refresh: 5000, // when to refresh data
          delay: 1000,
          pause: false,
          time: {
            displayFormat: "h:mm"
          },
          onRefresh: onRefresh,
        }, //realtime
        

      }, //x
      y: {
        title: {
          display: true,
          text: "ppm value CO2",
        },
      },
    }, // scales
    
  };

  return (
    <div>
      <h1>Live LineChart data</h1>
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <Line data={data} plugins={plugins} options={options} />
      </div>
    </div>
  );
};
export default ChartLiveDataReduxV3;
