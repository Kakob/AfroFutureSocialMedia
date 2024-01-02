import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Main } from './pages/main/main'
import { Login } from './pages/login'
import {Navbar} from "./components/navbar"
import { CreatePost } from './pages/create-post/create-post';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
