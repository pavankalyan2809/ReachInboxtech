// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import OneBox from './components/onebox';
import OneBoxDetail from './components/OneBoxDetail';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="app-container">
        <ConditionalHeader theme={theme} toggleTheme={toggleTheme} />
        <div className="content-container">
          <ConditionalSidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/onebox" element={<OneBox />} />
              <Route path="/onebox/:threadId" element={<OneBoxDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function ConditionalHeader({ theme, toggleTheme }) {
  const location = useLocation();
  const hideHeaderRoutes = ['/'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return !shouldHideHeader ? <Header theme={theme} toggleTheme={toggleTheme} /> : null;
}

function ConditionalSidebar() {
  const location = useLocation();
  const hideSidebarRoutes = ['/'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return !shouldHideSidebar ? <Sidebar /> : null;
}

export default App;
