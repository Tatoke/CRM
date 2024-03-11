// main file of the frontend application that renders the components.
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // !Put any other imports below so that CSS from your components takes precedence over default styles.
import './App.css'        //styles for the WHOLE project

import { BrowserRouter, Routes, Route } from "react-router-dom";


//importing pages:
import Header from './layouts/Header/Header';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';







function App() {
 



  return (
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Header />}>

              <Route index element={<Home />} />
              {/* userTyoe can be either "employee" or "client" */}
              <Route path="profile/client/:userId" element={<Profile />} /> 
          </Route>


        </Routes>
      </BrowserRouter>
  )
}




export default App
