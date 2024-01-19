/*import logo from './logo.svg';*/
import './App.css';
import Main from './components/main';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  /*const [user, setUser] = useState('null');*/
  const [query, setQuery] = useState('');
  return (
    <BrowserRouter >
      <NavBar query={setQuery} />
      <Main query={query} />
      <Routes >
        <Route />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
