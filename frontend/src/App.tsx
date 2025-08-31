import './styles/globals.scss';
import Layout from './components/layout/layout';
import styles from './App.module.scss';
import CardItem from './components/card-item';
import groceryImage from './assets/images/grocery-main-page.png';
import AddNewShoppingList from './features/add-new-shopping-list';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Layout>
        <div className={styles.MainBackground}>
          <div className={styles.CardList}>
            <Link to="/lists">
              <CardItem text="MY LISTS / הרשימות שלי"></CardItem>
            </Link>
            <Link to="/groceries">
              <CardItem text="Grocery Lists / רשימת מוצרים"></CardItem>
            </Link>
            <Link to="/favorites">
              <CardItem text="Favorites / מועדפים"></CardItem>
            </Link>
          </div>
          <AddNewShoppingList></AddNewShoppingList>
          <img
            className={styles.GroceryImage}
            src={groceryImage}
            alt="grocery-main-page"
          />
        </div>
      </Layout>
    </>
  );
}

export default App;
