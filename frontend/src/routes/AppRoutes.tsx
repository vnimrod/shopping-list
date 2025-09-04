import { Routes, Route } from 'react-router-dom';
import App from '../App';
import ShoppingSection from '../features/shopping-section';
import Layout from '../components/layout/layout';

export const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/shopping-lists" element={<ShoppingSection />} />
    </Routes>
  </Layout>
);
