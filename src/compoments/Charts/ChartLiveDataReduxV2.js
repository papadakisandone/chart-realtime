
import { coTwoActions } from "../../store/redux";
import { useSelector, useDispatch } from "react-redux";


import React, { useEffect } from "react";
import 'chart.js/auto';

import plugins from "../Settings/plugins";
// import opt from "../Settings/options";

import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import ChartStreaming from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import Zoom from "chartjs-plugin-zoom";

Chart.register(Zoom); // REGISTER PLUGIN
Chart.register(ChartStreaming);

  const ChartLiveDataReduxV2 = ()=>{
      // this give us back dispatch functions to execute
        const dispatch = useDispatch()
        
        // generate random data
        // useEffect(()=>{
        //     const internal = setInterval (()=>{
                
        //         dispatch(coTwoActions.generateRngNum());
                
        //     },5000);
    
        //     return ()=>clearInterval(internal);
        //     },[]);

        const coTwoData = useSelector(state =>state.coTwoData);
        const coTwoLabels = coTwoData.map(label=>label.dayTimeLabel);
        const coTwoValues = coTwoData.map(data=>data.coTwoValues);
        
        const greenData=[];
        const yellowData=[];
        const redData=[];

        // extract values for each array, if doesnt have value, insert null
        // like that, all the arrays will have same length, as the labels
       for (let index in coTwoValues){
          coTwoValues[index]<=1000 ? greenData.push(coTwoValues[index]) : greenData.push(null)
        }
       
       for (let index in coTwoValues){
        coTwoValues[index]>1000 && coTwoValues[index]<=2000 ? yellowData.push(coTwoValues[index]) : yellowData.push(null)
       }
       
      for (let index in coTwoValues){
        coTwoValues[index]>2000 ? redData.push(coTwoValues[index]) : redData.push(null)
       }

        // console.log(greenData);

        
        
        const data = {
          //labels: labels, // x axis
          datasets: [
            
            {
              label: "400-1000 ppm",
              data: [],
              fill: false,
              backgroundColor: "rgba(0, 255, 0, 0.5)",
              showLine: false,
              pointStyle: 'circle',
              pointRadius: 5,
              pointHoverRadius: 10 ,
              // backgroundColor: "rgba(0, 255, 0, 0.5)",
              // borderColor: "rgba(0, 255, 0, 0.9)"
            },
            {
              label: "1001-2000 ppm",
              data: [],
              fill: false,
              backgroundColor: "rgba(255, 255, 0, 0.5)",
              showLine: false,
              pointStyle: 'circle',
              pointRadius: 5,
              pointHoverRadius: 10 ,
              // borderColor: "rgba(255, 255, 0, 0.5)"     
            },
            {
              label: "2001 + ppm",
              data: [],
              fill: false,
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              showLine: false,
              pointStyle: 'circle',
              pointRadius: 5,
              pointHoverRadius: 10 ,
              // borderColor: "rgba(255, 0, 0, 0.5)"
            },            
          ],       
        }; //data

        const onRefresh = chart => {
          const now = Date.now();
          // dispatch(coTwoActions.generateRngNum());
            const num = Math.floor(Math.random() * (3500-400+1)+400);
            if (num<=1000){
              data.datasets[0].data.push({
                x: now,
                y: num
              });
            }
            if (num>2000){
              data.datasets[2].data.push({
                x: now,
                y: num
              });
            }else{
              data.datasets[1].data.push({
                x: now,
                y: num
              });
            }
        }
        

        const options = {
         
          scales: {
              x: {
                title: {
                  display: true,
                  text: 'Real-Time'
                },
                type: 'realtime',
                realtime: {
                  duration: 60000, // range of graph to see
                  refresh: 5000, // when to refresh data
                  delay: 1000,
                  pause: false,
                  onRefresh: onRefresh,
                }//realtime
                
              }, //x
              y: {
                title: {
                  display: true,
                  text: 'ppm value CO2'
                }
              }
            }, // scales
            interaction: {
              intersect: false
            }
          }
       
    return <div>
        <h1>Live LineChart data</h1>
        <div style={{width:"1000px", margin: "0 auto"}}>
            <Line 
            data={data} 
            plugins={plugins} 
            options={options}
            />
            {/* <button onClick={resetZoom}>Reset Zoom</button> */}
        </div>
        
    </div>
}
export default ChartLiveDataReduxV2;