import './App.css';
import { CartConextProvider } from './components/CartContextProvide';
import FoodItems from './components/FoodItems';
import Header from './components/Header';

function App() {
  return (
    <>
      <CartConextProvider>
        <Header />
        <FoodItems />
      </CartConextProvider>
    </>
  );
}

export default App;
