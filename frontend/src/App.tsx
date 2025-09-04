import './styles/globals.scss';
import Layout from './components/layout/layout';
import styles from './App.module.scss';
import CardItem from './components/card-item';
import groceryImage from './assets/images/grocery-main-page.png';
import groceryImage1 from './assets/images/main-background-img.png';
import AddNewShoppingList from './features/add-new-shopping-list';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <div className={styles.MainBackground}>
        <AddNewShoppingList></AddNewShoppingList>
        <div className={styles.CardList}>
          <Link to="/shopping-lists">
            <CardItem text="MY LISTS / הרשימות שלי"></CardItem>
          </Link>
          <Link to="/groceries">
            <CardItem text="Grocery Lists / רשימת מוצרים"></CardItem>
          </Link>
          <Link to="/favorites">
            <CardItem text="Favorites / מועדפים"></CardItem>
          </Link>
        </div>
        <img
          className={styles.GroceryImage}
          src={groceryImage}
          alt="grocery-main-page"
        />
      </div>
    </>
  );
}

export default App;
