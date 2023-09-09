// import "./styles/index.css";
import ReactDOM  from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";

import myStore from "./store/store"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={myStore}>
      <App/>
  </Provider>
);
