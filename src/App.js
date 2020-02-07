import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Transaksi from './pages/transaksi' 
function App() {
  return (
    <div >
      <Switch>
        <Route path='/' exact component={Transaksi}/>
      </Switch>
    </div>
  );
}

export default App;
