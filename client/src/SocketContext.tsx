import React, { createContext, useContext, useEffect } from 'react';
import {connect} from 'socket.io-client';

const SocketContext = createContext<any>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }:any) => {
    const socket = connect('http://127.0.0.1:3001/'); // או הכתובת של השרת שלך

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
