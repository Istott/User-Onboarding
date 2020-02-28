import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormikMemberForm from './form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Signup To Play!</h1>
        <h3>Create Your Character!</h3>
        <FormikMemberForm />
      </header>
    </div>
  );
}

export default App;
