// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const displayNameText = document.getElementById('user-display-name');
const userContainer = document.getElementById('user-container');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
const firebaseConfig = {
    apiKey: "AIzaSyDfwz1DoL6zPB3PybMIzjmfwUKU7BrjWw0",
    authDomain: "fir-web-codelab-96319.firebaseapp.com",
    databaseURL: "https://fir-web-codelab-96319.firebaseio.com",
    projectId: "fir-web-codelab-96319",
    storageBucket: "fir-web-codelab-96319.appspot.com",
    messagingSenderId: "145924995028",
    appId: "1:145924995028:web:eeeccd04d7afb3d00c0841"
  };

firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

startRsvpButton.addEventListener("click", ()=> {
  if (firebase.auth().currentUser){
    firebase.auth().signOut()
  } else {
    ui.start("#firebaseui-auth-container", uiConfig)
  }
});

firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
    startRsvpButton.textContent = "Sign Out";
    displayNameText.textContent = user.displayName
    userContainer.style.display = "flex";
  } else {
    startRsvpButton.textContent = "RSVP"
    userContainer.style.display = "none";
  }
});
