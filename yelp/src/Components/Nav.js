import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Auth } from 'aws-amplify';


function Nav(){

    function handleLogout() {
        Auth.signOut()
          .then(() => {
            // Redirect to a different page or display a message.
          })
          .catch((error) => {
            console.log('Error signing out:', error);
          });
      }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container >
            <Navbar.Brand bg="light" fixed="bottom">MyRestaurant</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button onClick={handleLogout}>Sign Out</Button>
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Nav;