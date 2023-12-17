import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {Provider} from 'react-redux'
import "@fortawesome/fontawesome-free/css/all.min.css";
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import {GoogleOAuthProvider} from '@react-oauth/google'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 <GoogleOAuthProvider clientId='774145433088-quch9e3sltvibkqo2f601ehp0nh76qem.apps.googleusercontent.com'>

  <React.StrictMode>
  <Provider store={store}>
        <App />
  </Provider>
 </React.StrictMode>

</GoogleOAuthProvider>
  
   
  
);


reportWebVitals();
