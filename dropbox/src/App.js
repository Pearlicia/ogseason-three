import './App.css';
import Nav  from './Components/Nav';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import awsConfig from './aws-exports';
import AllFiles from './Components/AllFiles';
import UploadFile from './Components/UploadFile';
import {Container} from "react-bootstrap";

Amplify.configure(awsConfig)


function App() {
  return (
    
    <div>
        <Nav /> 
        <Container>
          <UploadFile />
          <AllFiles />
        </Container> 
    </div>
    
     
  );
}

export default withAuthenticator(App);
