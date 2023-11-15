import {Navbar, Container, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
//import './Header.css';
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
//import { useState } from 'react';
//import ClienteModal from "../ClienteRegister/ClienteRegister";
/*import { jwtDecode } from 'jwt-decode';*/


const Header = () => {

  // Utils
  const navigate = useNavigate();
  const isLoggedIn: boolean = useIsLoggedIn();
 
  /*const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el token almacenado localmente
    const jwtToken = window.localStorage.getItem('jwtToken');

    // Decodificar el token para obtener la carga útil (payload)
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);   
      // El campo "sub" o el campo que contiene el ID del usuario podría ser el campo que contiene el rol
      const userRoleFromToken = decodedToken.sub; // Puedes ajustar esto según la estructura de tu token
      setUserRole(userRoleFromToken || null);
    }
  }, []);*/

  // Handlers
  function onLogOut() {
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('jwtToken');
    navigate('/');
  }


    return(
        <>
  <Navbar expand="lg" style={{backgroundColor:"#FDC95A"}}>
  <Container className="d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <Navbar.Brand onClick={() => navigate('/')}>
        <img src="images/Frame39529.svg" alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
          {isLoggedIn && <Nav.Link onClick={() => navigate('/RubroInsumo')}>RubroInsumo</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </div>
    <div>
      <Nav>
        {!isLoggedIn && <Nav.Link onClick={() => navigate('/login')}>Log In</Nav.Link>}
        {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>}
       
      </Nav>
    </div>
  </Container>
</Navbar>

        </>
    )
}

export default Header;

//<Nav.Link onClick={() => navigate ('/login')}>Login</Nav.Link>

//{userRole === 'ADMINISTRADOR' && (<Nav.Link onClick={() => navigate('/Empleados')}>Empleados</Nav.Link>)}