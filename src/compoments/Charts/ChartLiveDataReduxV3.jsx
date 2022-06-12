import { coTwoActions } from "../../store/redux";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useRef } from "react";
import "chart.js/auto";
import "./chartLiveData.css";
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
  const coTwoData = useSelector((state) => state.coTwoData); //data 

  const dataRef = useRef({
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
  }); //data
  

  // call the action to genarate RNG number 400-3500
  useEffect(() => {
    dispatch(coTwoActions.generateRngNum());
    
  }, [dispatch]);


   

  const onRefresh = (chart) => {
    dispatch(coTwoActions.generateRngNum());

    const lastValue = coTwoData[coTwoData.length - 1];
    const { x, y } = lastValue; //time, value

    if (lastValue.y <= 1000) {
      console.log(lastValue.y);
      chart.data.datasets[0].data.push({x,y});
      // console.log(data.datasets[0].data);
    }

    if (lastValue.y > 1000 && lastValue.y <= 2000) {
      console.log(lastValue.y);
      chart.data.datasets[1].data.push({x,y});
      // console.log(data.datasets[1].data);
    }

    if (lastValue.y > 2000) {
      console.log(lastValue.y);
      chart.data.datasets[2].data.push({x,y});
      // console.log(data.datasets[2].data);
    }
    chart.update("quiet");
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
          onRefresh: onRefresh,
          ttl: undefined,
          framerate: 30
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
      <h1 className="centered">
        Carbon Dioxide (CO<sub className="sub">2</sub>
        <span>)</span>
      </h1>
      <div
        className="container container-prop"
        style={{ width: "1000px", margin: "0 auto" }}
      >
        <Line data={dataRef.current} plugins={plugins} options={options} />
      </div>
    </div>
  );
};
export default ChartLiveDataReduxV3;
