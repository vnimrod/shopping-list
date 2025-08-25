import './App.scss';
import './styles/globals.scss';
import Layout from './components/layout/layout';
import ShoppingSection from './features/shopping-section';
function App() {
  return (
    <>
      <Layout>
        <ShoppingSection></ShoppingSection>
      </Layout>
    </>

  );
}

export default App;
