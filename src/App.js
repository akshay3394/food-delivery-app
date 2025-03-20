import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { CartConextProvider } from './components/CartContextProvide';
import FoodItems, { foodItemsLoader } from './components/FoodItems';
import Header from './components/Header';
import Cart from './components/Cart';
import OrdersPage, { ordersLoader } from './components/OrdersPage';
import CheckOutPage, { handlePlaceOrder } from './components/CheckOutPage';
import ErrorElement from './components/ErrorElement';
import { Provider } from 'react-redux';
import store from './store/CartStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient()


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Header /><FoodItems />
      </>,
      // loader: foodItemsLoader,
      errorElement: <ErrorElement />,
      HydrateFallback: () => [],
      children: [
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "checkout",
          element: <CheckOutPage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
          // loader: ordersLoader
        }, {
          path: "*",
          element: <ErrorElement message='Page not found' />
        }
      ]
    }
  ])


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router}>
          </RouterProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
