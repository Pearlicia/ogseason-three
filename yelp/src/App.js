import './App.css';
import { Amplify } from 'aws-amplify'
// import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig)

function App() {
  return (
    <Authenticator>
    {({ signOut, user }) => (
      <div className="App">
        <p>
          Hey {user.username}, welcome to my channel
        </p>
        <button onClick={signOut}>Sign out</button>
      </div>
    )}
  </Authenticator>
  );
}

export default withAuthenticator(App);



