// import "./styles/index.css";
import ReactDOM  from 'react-dom/client';
import App from './App';
import myStore from "./store/store"
import { Provider } from "react-redux";

import { io ,Manager } from "socket.io-client";
// const socket = io("http://121.0.0.1:3001", {
//     reconnectionDelayMax: 10000,
//     auth: {
//       token: "123"
//     },
//     query: {
//       "my-key": "my-value"
//     }
// });


// socket.connect()
// socket.on("connect",()=>{
//     console.log("dasdasd")
// })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={myStore}>
    <App/>
  </Provider>
);
