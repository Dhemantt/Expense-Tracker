import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../feature/uiSlice';
import './Nav.module.css';
import { Container, Navbar } from 'react-bootstrap';

function Nav() {

  const { isloggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logoutHandler = (e) => {
    dispatch(auth.logout());
    console.log(isloggedIn + "I'm logout");
  } 
  return (
    <>
      <Navbar bg = "dark-black">
        <Container >
          <Nav className="me-auto">
            <Link to='/home' style={{}}>
              Home
            </Link>
            <Link to='/welcome'>
              Home
            </Link>
            <Link to='/profile'>
              Profile
            </Link>
          </Nav>
          <button onClick={logoutHandler}>logout</button>
        </Container>

      </Navbar>
    </>
  )
}

export default Nav



