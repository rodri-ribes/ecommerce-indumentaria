import React, { useEffect } from "react";
import './app.scss'

//------ Imports

import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

//------ Components

import AddDressDashboard from './components/Dashboard/AddDressDashboard/AddDressDashboard.js'
import EditDressDashboard from "./components/Dashboard/EditDressDashboard/EditDressDashboard.js";
import ManageDressDashboard from "./components/Dashboard/ManageDressDashboard/ManageDressDashboard.js";
import Settings from "./components/Profile/Settings/Settings.js";
import Footer from "./components/Footer/Footer.js";
import NavBar from "./components/NavBar/NavBar.js";
import CustomersDashboard from "./components/Dashboard/CustomersDashboard/CustomersDashboard";
import CardNotification from "./components/CardNotification/CardNotification";
import Favorites from "./components/Profile/Favorites/Favorites";
import ShoppingUser from "./components/Profile/ShoppingUser/ShoppingUser";

//------ pages

import Home from "./pages/Home/Home.js";
import SignUp from "./pages/SignUp/SignUp.js";
import ContentDetail from "./pages/ContentDetail/ContentDetail.js";
import SignIn from "./pages/SignIn/SignIn.js";
import Profile from './pages/Profile/Profile.js'
import Shopping from "./pages/Shopping/Shopping.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import AfterPaying from "./pages/AfterPaying/AfterPaying";

//------ functions

import { getDressAction, getUserAction } from "./redux/features/data/dataUser";

//------ Functions ProtectedRoutes

import ProtectedRouteShopping from "./ProtectedRoutes/ProtectedRouteShopping/ProtectedRouteShopping.js";
import ProtectedRouteAdmin from "./ProtectedRoutes/ProtectedRouteAdmin/ProtectedRouteAdmin.js";
import ProtectedRouteLoggedInUser from "./ProtectedRoutes/ProtectedRouteLoggedInUser/ProtectedRouteLoggedInUser.js";
import ProtectedRouteAfterPaying from "./ProtectedRoutes/ProtectedRouteAfterPaying/ProtectedRouteAfterPaying";
import ProtectedRouteUserNotLogged from "./ProtectedRoutes/ProtectedRouteUserNotLogged/ProtectedRouteUserNotLogged";
import AddToCart from "./pages/AddToCart/AddToCart";
import CashRegisterDashboard from "./components/Dashboard/CashRegister/CashRegisterDashboard";


function App() {

  let dispatch = useDispatch()

  let user = useSelector(state => state.dataUser.user)
  let buyNow = useSelector(state => state.dataUser.buyNow)
  let dress = useSelector(state => state.dataUser.dress)
  let notification = useSelector(state => state.dataUser.notification)

  let userLocal = JSON.parse(window.localStorage.getItem("user"))

  useEffect(() => {
    if (userLocal && !user) dispatch(getUserAction())
    if (dress.length === 0) dispatch(getDressAction())
  }, [])


  return (
    <>
      <NavBar user={user} />
      <div className="container">

        <Routes>

          {/* start path */}
          <Route path="/" element={<Home dress={dress} userState={user} />} />

          {/* log path */}
          <Route path="/signup" element={<ProtectedRouteUserNotLogged user={user}> <SignUp /> </ProtectedRouteUserNotLogged>} />

          {/* path to login */}
          <Route path="/signin" element={<ProtectedRouteUserNotLogged user={user}> <SignIn /> </ProtectedRouteUserNotLogged>} />

          {/* route to see the product more detailed */}
          <Route path="/dress/:id" element={<ContentDetail userState={user} dress={dress} />} />

          {/* route where the products loaded in the cart are displayed */}
          <Route path="/addtocart/:id" element={<AddToCart userState={user} dress={dress} />} />

          {/* admin path */}
          <Route path="/dashboard/*" element={<ProtectedRouteAdmin user={user}> <Dashboard /> </ProtectedRouteAdmin>} >
            <Route path="manage-dress" element={<ManageDressDashboard dress={dress} />} />
            <Route path="add-dress" element={<AddDressDashboard dress={dress} />} />
            <Route path="edit-dress/:id" element={<EditDressDashboard dress={dress} />} />
            <Route path="customers" element={<CustomersDashboard dress={dress} />} />
            <Route path="cash-register" element={<CashRegisterDashboard />} />
          </Route>

          {/* user path */}
          <Route path="/profile/*" element={<ProtectedRouteLoggedInUser user={user}> <Profile /> </ProtectedRouteLoggedInUser>} >
            <Route path="settings" element={<Settings user={user} />} />
            <Route path="favorites" element={<Favorites user={user} />} />
            <Route path="shopping" element={<ShoppingUser user={user} />} />
          </Route>

          {/* route where the products to buy are listed */}
          <Route path="/shopping" element={<ProtectedRouteShopping user={user} buyNow={buyNow}> <Shopping user={user} /> </ProtectedRouteShopping>} />

          {/* route where the payment is processed or the purchase is denied */}
          <Route path="/afterpaying/*" element={<ProtectedRouteAfterPaying> <AfterPaying /> </ProtectedRouteAfterPaying>} />

        </Routes>

        {/* component to display notifications */}
        {
          notification &&
          <CardNotification title={notification.title} state={notification.state} />
        }

      </div>
      <Footer />
    </>
  );
}

export default App;
