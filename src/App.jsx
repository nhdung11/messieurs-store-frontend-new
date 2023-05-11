import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login';
import ContactPage from './pages/contacts';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import BookPage from './pages/books';
import HomePage from './components/Home';
import Register from './pages/register';
import './styles/reset.scss';
import './styles/global.scss';
import { callFetchAccount } from './services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading/loading';
import Error from './components/Error/error';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutAdmin from './pages/admin/layoutAdmin';
import DetailBookPage from './pages/books/detailBookPage';
import Order from './pages/order/Order';
import HistoryPage from './pages/History/HistoryPage';
import ManageOrder from './pages/order/ManageOrder';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('')
  console.log("searchterm: ", searchTerm)
  return (
    <div className='layout-app'>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const isLoading = useSelector(state => state.account.isLoading)


  const getAccount = async () => {
    if (window.location.pathname === "/login" ||
      window.location.pathname === "/register") return

    const res = await callFetchAccount()
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
      console.log("check fetchAccount: ", res.data)
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        // {
        //   path: "contacts",
        //   element: <ContactPage />,
        // },
        {
          path: "book/:slug",
          element: <DetailBookPage />,
        },
        {
          path: "history",
          element:
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
        },
        {
          path: "order",
          element:
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>,
        },
      ],
    },
    {
      path: "/admin",
      element:
        <ProtectedRoute>
          <LayoutAdmin />,
        </ProtectedRoute>,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element:
            <AdminPage />
        },
        {
          path: "user",
          element:
            <ContactPage />
        },
        {
          path: "books",
          element:
            <BookPage />
        },
        {
          path: "order",
          element:
            <ManageOrder />

        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      {isLoading === false ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/register" ||
        window.location.pathname === "/order" ||
        window.location.pathname === "/history" ||
        window.location.pathname === "/" ? <RouterProvider router={router} /> : <Loading />
      }
    </>
  );
}
