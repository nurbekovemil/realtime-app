import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth';
import Home from './pages/Home';
import Chat from './pages/Chat';

import Public from './layouts/Public';
import Private from './layouts/Private';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public layout */}
        <Route path='/' element={<Public />}>
          <Route index element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Route>
        {/* Private layout */}
        <Route path='/chat' element={<Private />}>
          <Route index element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
