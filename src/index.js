import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from "./context/AuthContext";
import LocationContextProvider from "./context/LocationContext";
import WorkstationContextProvider from "./context/WorkstationContext";
import OperationContextProvider from "./context/OperationContext";
import MalfunctionContextProvider from "./context/MalfunctionContext";
import AuthorityContextProvider from "./context/AuthorityContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <AuthorityContextProvider>
            <AuthContextProvider>
                <WorkstationContextProvider>
                    <LocationContextProvider>
                        <OperationContextProvider>
                            <MalfunctionContextProvider>
                                <App />
                            </MalfunctionContextProvider>
                        </OperationContextProvider>
                    </LocationContextProvider>
                </WorkstationContextProvider>
            </AuthContextProvider>
        </AuthorityContextProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
