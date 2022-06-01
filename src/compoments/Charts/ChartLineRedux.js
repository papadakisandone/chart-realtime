//https://www.youtube.com/watch?v=Ge6PQkpa6pA
// redux
import { coTwoActions } from "../../store/redux";
import { useSelector, useDispatch } from "react-redux";


import React, { useEffect } from "react";
import 'chart.js/auto';
import plugins from "../Settings/plugins";
import opt from "../Settings/options";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import Zoom from "chartjs-plugin-zoom";
Chart.register(Zoom); // REGISTER PLUGIN

  const ChartLineV3 = ()=>{
      // this give us back dispatch functions to execute
        const dispatch = useDispatch()
    
    //   const [rngNumData, setRngNumData] = useState([]);
      


       useEffect(()=>{
        const internal = setInterval (()=>{
            
            dispatch(coTwoActions.generateRngNum());
        },5000);

        return ()=>clearInterval(internal);
        },[]);
        
        const coTwoData = useSelector(state =>state.coTwoData);
        const labels = coTwoData.map(label=>label.dayTimeLabel);
        const coTwoValues = coTwoData.map(data=>data.coTwoValues);
        // console.log(coTwoValues);
        const greenData=[];
        const yellowData=[];
        const redData=[];

        // extract values for each array, if doesnt have value, insert null
        // like that all the arrays will have same length, as the labels
       for (let index in coTwoValues){
          if(coTwoValues[index]<=1000){
            greenData.push(coTwoValues[index])
          }else {
            greenData.push(null)
          }
       }
       for (let index in coTwoValues){
        if(coTwoValues[index]>1000 && coTwoValues[index]<=2000){
          yellowData.push(coTwoValues[index])
        }else {
          yellowData.push(null)
        }
     }
     for (let index in coTwoValues){
      if(coTwoValues[index]>2000){
        redData.push(coTwoValues[index])
      }else {
        redData.push(null)
      }
   }

        // console.log(greenData);
        
        const data = {
          labels: labels, // x axis
          datasets: [
            
            {
              label: "400-1000 ppm",
              data: greenData,
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
              data: yellowData,
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
              data: redData,
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
       
        

    return <div>
        <h1>Live LineChart data</h1>
        <div style={{width:"1000px", margin: "0 auto"}}>
            <Line 
            data={data} 
            plugins={plugins} 
            //options={opt} 
            />
            {/* <button onClick={resetZoom}>Reset Zoom</button> */}
        </div>
        
    </div>
}
export default ChartLineV3;