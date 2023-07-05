// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import './index.css';

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store/index.js'

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);