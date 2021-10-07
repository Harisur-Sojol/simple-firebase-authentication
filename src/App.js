import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/Firebase.initialize';


initializeAuthentication();

const gooleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, gooleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        console.log(loggedInUser)
        setUser(loggedInUser);
      })
  }
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="App">

      {!user.name ?
        <div>
          < button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div> :
        <button onClick={handleSignout}>Sign Out</button>
      }
      <br />

      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I Konow Your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div >
  );
}

export default App;
