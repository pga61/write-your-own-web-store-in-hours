import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Success from './pages/Success';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/success' element={<Success />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
