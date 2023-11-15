//import { useState } from 'react'
import FooterHome from "./components/FooterHome/FooterHome";
import Header from "./components/Header/Header"
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Container } from "react-bootstrap";
import Loader from "./components/Loader/Loader";
import { Suspense } from "react";


function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header/>
        <Container style={{minHeight:'100vh', minWidth:"100%", padding:"0"}}>
          <Suspense fallback={<Loader/>}>
            <Container style={{margin:"2em"}}>
              <AppRoutes/>
            </Container>  
          </Suspense>
        </Container>
       <FooterHome/>
     </Router>
     </>
  )
}

export default App
