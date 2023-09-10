import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import '../Header/Header.css';
import { Button, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../features/Login";
import { instance } from "../../../axioConfig";
function Header() {
  const bearerToken = useSelector((state) => state.loginDetail.bearerToken);
  const dispatch=useDispatch();
  const userDetail=useSelector((state) => state.loginDetail.userDetail)
  function logout(){

    instance.get('logout',{
      headers: {
      "Authorization": "Bearer "+bearerToken
    }
    }
    ).then(function (response) {
      if(response.status==200 && response.data?.type=="success"){
        dispatch(setLogout())
      }
    })
    .catch(function (error) {
    });
  }
  return (
    
    <header>
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
          
          <Link to="/">
            <Navbar.Brand>
              <img src="/logo.png" className="img-fluid site-logo" />
            </Navbar.Brand>
          </Link>
          <Dropdown>
            <Dropdown.Toggle variant="success" className="dark-btn" id="dropdown-basic">
              <i class="bi bi-person"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">{userDetail.name}</Dropdown.Item>
              <Dropdown.Item href="#/action-2">{userDetail.email}</Dropdown.Item>
              <Dropdown.Item href="/changepassword">Change password</Dropdown.Item>
              <hr />
              <Dropdown.Item href="#/action-3">Frims</Dropdown.Item>
              <Dropdown.Item>
                <Button className="dark-btn" onClick={()=>logout()}>
                 Logout
                </Button>
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
