import React from "react";

import ChartLiveDataReduxV3 from "./compoments/Charts/ChartLiveDataReduxV3";

import { Provider } from "react-redux";
import store from "./store/redux";


const App=()=> {
  return (
    <Provider store ={store}>
      <ChartLiveDataReduxV3 />
    </Provider>
    
  );
}

export default App;
