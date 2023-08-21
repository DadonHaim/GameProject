import "./styles/index.css";
import ReactDOM  from 'react-dom/client';
import App from './App';
import {myStore} from "./store/store"
import { Provider } from "react-redux";



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={myStore}>
    <App/>
  </Provider>
);
