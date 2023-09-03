// import "./styles/index.css";
import ReactDOM  from 'react-dom/client';
import App from './App';
import { SocketProvider } from './SocketContext';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SocketProvider>
      <App/>
  </SocketProvider>
);
