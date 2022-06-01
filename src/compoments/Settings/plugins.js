const plugins = { 
    plugins: {
      
      zoom: {
        zoom: {
          wheel: {enabled: true},
          mode: "xy",
          speed: 100,
          drag: {enabled:false},
          rangeMin: {x:0, y: 0}, // Format of min zoom range depends on scale type
          rangeMax: {x: 3500, y: 3500} // Format of max zoom range depends on scale type
        },
        pan: {
          enabled: true,
          mode: "xy",
          speed: 100,
          // rangeMin: {x:0, y: 0}, // Format of min zoom range depends on scale type
          // rangeMax: {x: null, y: 3500} // Format of max zoom range depends on scale type
        }
      },
      legend: {
        position: 'top',
      },
      
      
    },
    showLine: false,
    pointStyle: 'circle',
    pointRadius: 3,
    pointHoverRadius: 20 ,
    //points show effect
    
    //  showLine: false, // show the line between points
    // tension:0.3, //Set to 0 to draw straightlines
}
export default plugins;