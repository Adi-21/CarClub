import React, { createContext, useReducer, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Buycar from "./components/Buycar";
import Dashboard from "./components/Dashboard";
import AdminSignin from "./components/AdminSignin";
import AdminSignout from "./components/AdminSignout";
import Addcars from "./components/dashboardComponents/Addcars";
import Salecarreports from "./components/dashboardComponents/Salecarreports";
import Rentcarreports from "./components/dashboardComponents/Rentcarreports";
import Saleyourcars from "./components/Saleyourcars";
import Availableusers from "./components/dashboardComponents/Availableusers";
import Usermessages from "./components/dashboardComponents/Usermessages";
import Getsalecars from "./components/dashboardComponents/Getsalecars";
import Getrentcars from "./components/dashboardComponents/Getrentcars";
import Mycart from "./components/Mycart";
import Rentacar from "./components/Rentacar";
import Rentcarcart from "./components/Rentcarcart";
import Carreviews from "./components/Carreviews";
import Rentcarreviews from "./components/Rentcarreviews";
import Signout from "./components/Signout";
import ExploreSaleCar from "./components/ExploreSaleCar";
import ExploreRentCar from "./components/ExploreRentCar";


import { initialState, reducer } from "../src/reducer/UseReducer"
import { adminInitialState, adminreducer } from "../src/reducer/UseReducerAdmin"




export const UserContext = createContext();
export const AdminContext = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [adminState, dispatchadmin] = useReducer(adminreducer, adminInitialState)


  return (
    <>

      <UserContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/buycar" element={<Buycar />} />
          <Route path="/mycart" element={<Mycart />} />
          <Route path="/carreviews" element={<Carreviews />} />
          <Route path="/rentcar" element={<Rentacar />} />
          <Route path="/rentcarcart" element={<Rentcarcart />} />
          <Route path="/rentcarreviews" element={<Rentcarreviews />} />
          <Route path="/saleyourcar" element={<Saleyourcars />} />
          <Route path="/exploreSaleCars" element={<ExploreSaleCar />} />
          <Route path="/exploreRentCars" element={<ExploreRentCar />} />
        </Routes>
      </UserContext.Provider >

      <AdminContext.Provider value={{ adminState, dispatchadmin }}>
        <Routes>
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/adminsignout" element={<AdminSignout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addcars" element={<Addcars />} />
          <Route path="/salecarsreports" element={<Salecarreports />} />
          <Route path="/rentcarsreports" element={<Rentcarreports />} />
          <Route path="/availableusers" element={<Availableusers />} />
          <Route path="/usermessages" element={<Usermessages />} />
          <Route path="/getsalecarsforadmin" element={<Getsalecars />} />
          <Route path="/getrentcarsforadmin" element={<Getrentcars />} />
        </Routes>
      </AdminContext.Provider>

    </>
  );


}

export default App;
