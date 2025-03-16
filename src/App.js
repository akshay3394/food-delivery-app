import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { CartConextProvider } from './components/CartContextProvide';
import FoodItems from './components/FoodItems';
import Header from './components/Header';
import Cart from './components/Cart';
import OrdersPage from './components/OrdersPage';
import CheckOutPage from './components/CheckOutPage';
import ErrorElement from './components/ErrorElement';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Header /><FoodItems /></>,
      errorElement: <ErrorElement/>,
      // loader: fetchFoodItems,
      children: [
        // {
        //   index: true,
        //   element: <FoodItems />
        // },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "checkout",
          element: <CheckOutPage />
        },
        {
          path: "orders",
          element: <OrdersPage />
        }
      ]
    }
  ])

  return (
    <>
      {/* <CartConextProvider>
        <Header />
        <FoodItems />
      </CartConextProvider> */}

      <CartConextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </CartConextProvider>

    </>
  );
}

export default App;
