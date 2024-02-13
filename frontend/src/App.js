import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MagazineList from './components/MagazineList';
import SubscriptionList from './components/SubscriptionList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MagazineList />} />
        <Route path="/subscriptions" element={<SubscriptionList />} />
      </Routes>
    </Router>
  );
}

export default App;
