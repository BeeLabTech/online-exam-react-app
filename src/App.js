import * as React from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './pages/Home';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState('loading');

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, authenticatedUser => {
      if (authenticatedUser) {
        setUser(authenticatedUser.email);
        setAuthState('home');
      } else {
        setUser(null);
        setAuthState('login');
      }
    });

    return () => unSubscribeAuth();
  }, []);

  if (authState === 'loading') {
    return <div className='font-bold text-center text-5xl'>Loading...</div>;
  }

  switch (authState) {
    case 'login':
      return <Login setAuthState={setAuthState} setUser={setUser} />;
    case 'register':
      return <Register setAuthState={setAuthState} setUser={setUser} />;
    case 'home':
      return <Home user={user} setAuthState={setAuthState} setUser={setUser} />;
    default:
      return <div className='font-bold text-center text-5xl'>Invalid state</div>;
  }
}

export default App;
