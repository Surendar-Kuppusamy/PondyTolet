import React from 'react';
import { ToastContainer } from 'react-toastify';
import RouterOutlet from './routes/RouterOutlet';
import './App.css';

function App() {
  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      	<RouterOutlet />
    </div>
  );
}

export default App;
