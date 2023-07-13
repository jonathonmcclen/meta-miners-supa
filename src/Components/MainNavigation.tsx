import { NavLink } from 'react-router-dom';
import { Button, IconButton, Nav, Navbar, Tag } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { useAuth } from '../hooks/Auth';
import OffRoundIcon from '@rsuite/icons/OffRound';
import AdminIcon from '@rsuite/icons/Admin';
import { useEffect } from 'react';

function MainNavigation() {
  const { user } = useAuth()
  const { signOut } = useAuth()

  useEffect(() => {
    console.log(user);
  }, [])

  const handleLogout = () => {
    signOut()
  }

  return (
    <Navbar>
      <Nav>
        <Nav.Item to={'/'} as={NavLink} icon={<HomeIcon />}>Home</Nav.Item>
        <Nav.Item to={'/inventory'} as={NavLink}>Inventory</Nav.Item>
        <Nav.Item to={'/simulator'} as={NavLink}>Simulator</Nav.Item>
        {/* <Nav.Item to={'/black-market'} as={NavLink}>Black Market</Nav.Item> */}
        {user ? (
          <Nav.Item as={NavLink} to="#">
            <IconButton size='sm' onClick={handleLogout} appearance='primary' icon={<OffRoundIcon />}>Logout</IconButton>
          </Nav.Item>
        ) : (
          <Nav.Item as={NavLink} to="/login">
            <Tag color="red">Not Logged In</Tag>
          </Nav.Item>
        )}
      </Nav>
      <Nav pullRight>
        {user ? (<>
          <Nav.Item as={NavLink} to="/profile" icon={<AdminIcon />}><p>{user?.email}</p></Nav.Item>
          <Nav.Item> <p>eC</p></Nav.Item>
        </>
        ) : (
          <>
            <Nav.Item as={NavLink} to="/login">
              <p color="red">Log In</p>
            </Nav.Item>
            <Nav.Item as={NavLink} to="/signup">
              <Button size="lg">Sign Up</Button>
            </Nav.Item>
          </>
        )
        }
      </Nav >
    </Navbar >
  );
}

export default MainNavigation;
