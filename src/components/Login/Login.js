import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



const Login = () => {

  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

    

    const handleGoogleSignIn=() => {
        var provider = new firebase.auth.GoogleAuthProvider();

        
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
         
          const {displayName,email} = result.user;
          const signedInUser  = {name: displayName, email }
          setLoggedInUser(signedInUser);
          storeAuthToken();
          history.replace(from);
          // console.log(signedInUser); 
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

    }


    const storeAuthToken = ()=>{
      firebase.auth().currentUser.getIdToken( true).then(function(idToken) {
        // Send token to your backend via HTTPS
        console.log(idToken);
        sessionStorage.setItem('token', idToken);
        // ...
      }).catch(function(error) {
        // Handle error
      });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;