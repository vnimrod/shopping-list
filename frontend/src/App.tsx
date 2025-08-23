import './App.scss';
import './styles/globals.scss';
import Layout from './components/layout/layout';
import Navbar from './components/layout/navbar/navbar';
import ShoppingSection from './features/shopping-section';
import Drawer from './components/layout/drawer';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Layout>
        <Navbar></Navbar>
        <div>
          <button onClick={() => setOpen(true)}>☰</button>
          <Drawer open={open} onClose={() => setOpen(false)}></Drawer>
        </div>
        <ShoppingSection></ShoppingSection>
      </Layout>
    </>
  );
}

export default App;
