import './styles/globals.scss';
import Layout from './components/layout/layout';
import ShoppingSection from './features/shopping-section';
import styles from './App.module.scss';
import CardItem from './components/card-item';
import groceryImage from './assets/images/grocery-main-page.png';

function App() {
  return (
    <>
      <Layout>
        <div className={styles.CardList}>
          <CardItem text='MY LISTS / הרשימות שלי'></CardItem>
          <CardItem text='Grocery Lists / רשימת מוצרים'></CardItem>
          <CardItem text='Favorites / מועדפים'></CardItem>
          <CardItem text='Add New Item'></CardItem>
        </div>
        <div className={styles.MainBackground} />
        <img className={styles.GroceryImage} src={groceryImage} alt="grocery-main-page" />
        {/* <ShoppingSection></ShoppingSection> */}
      </Layout>
    </>

  );
}

export default App;
