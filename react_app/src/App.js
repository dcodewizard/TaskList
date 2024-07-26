import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskList from './containers/TaskList';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<TaskList />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

