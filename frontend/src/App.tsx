import './App.scss';
import './styles/globals.scss';
import Layout from './components/layout/layout';
import Navbar from './components/layout/navbar/navbar';
import ShoppingSection from './features/shopping-section';

function App() {
  return (
    <>
      <Layout>
        <Navbar></Navbar>
        <ShoppingSection></ShoppingSection>
      </Layout>
    </>
  );
}

export default App;
