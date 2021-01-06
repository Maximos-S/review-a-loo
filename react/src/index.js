import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.addEventListener("DOMContentLoaded", () => {
  //hacky solution
  const head = document.getElementById("head")
  const scriptTag = document.createElement("script")
  scriptTag.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`)
  scriptTag.setAttribute("type", "text/javascript")
  head.appendChild(scriptTag)

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})



