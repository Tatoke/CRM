import { useState } from 'react'
// main file of the frontend application that renders the components.
import 'bootstrap/dist/css/bootstrap.min.css'; // !Put any other imports below so that CSS from your components takes precedence over default styles.

import './App.css'        //styles for the WHOLE project
import Header from './layouts/Header/Header'





function App() {
 



  return (
    <>
      <Header />

      
      <p>I was rendered inside App</p>
    </>
  )
}


export default App
