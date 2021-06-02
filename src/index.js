import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import { store } from "../src/store/Store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);